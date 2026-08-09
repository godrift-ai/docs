#!/usr/bin/env node
/**
 * Generates llms.txt and llms-full.txt from docs.json + the .mdx pages.
 *
 * Both files used to be maintained by hand, and both drifted: llms-full.txt
 * indexed 10 of 17 pages and listed 6 of 13 slash commands, so an agent reading
 * it simply could not see the Showcase, the MuJoCo guide, or half the commands.
 * Deriving them from the navigation means a page can never again exist in the
 * docs but be invisible to the agents these files are for.
 *
 *   node scripts/build-llms.mjs           # write the files
 *   node scripts/build-llms.mjs --check   # exit 1 if they are stale (CI)
 *
 * The hand-written robotics context at the top of llms-full.txt lives in
 * llms-preamble.md — edit that, not the generated output.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://docs.godrift.ai";
const CHECK = process.argv.includes("--check");

const read = (p) => readFileSync(join(ROOT, p), "utf8");

/** Pull `title` and `description` out of a page's YAML frontmatter. */
function frontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
  }
  return { data, body: raw.slice(m[0].length).trim() };
}

/**
 * MDX -> plain text. These files are a corpus for language models, not a
 * rendered page, so the component wrappers are noise but their *contents* are
 * not: a <Warning> holding "20.04 has no supported ROS2" is exactly the kind of
 * thing an agent must still see. Unwrap the tags, keep the text.
 */
function mdxToText(body) {
  return body
    .replace(/<(Tabs|Tab|Accordion|AccordionGroup|Note|Tip|Warning|Info|Card|CardGroup|Steps|Step|Frame|Check)\b[^>]*>/g, "")
    .replace(/<\/(Tabs|Tab|Accordion|AccordionGroup|Note|Tip|Warning|Info|Card|CardGroup|Steps|Step|Frame|Check)>/g, "")
    .replace(/<(img|video|iframe)\b[^>]*\/?>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""))
    .join("\n")
    .trim();
}

// Navigation is the single source of truth for what exists. A page missing from
// docs.json is invisible on the site, so it stays out of the agent files too.
const docs = JSON.parse(read("docs.json"));
const groups = docs.navigation.groups.map((g) => ({
  group: g.group,
  pages: g.pages.map((slug) => {
    const { data, body } = frontmatter(read(`${slug}.mdx`));
    if (!data.title) throw new Error(`${slug}.mdx has no title in its frontmatter`);
    return {
      slug,
      url: `${SITE}/${slug}`,
      title: data.title,
      description: data.description ?? "",
      text: mdxToText(body),
      // changelog.mdx is a frontmatter-only redirect to GitHub Releases; it has
      // no body, and that is deliberate — see item 6 in the docs audit.
      external: data.url ?? null,
    };
  }),
}));

const pageCount = groups.reduce((n, g) => n + g.pages.length, 0);

// ── llms.txt — the short index ──────────────────────────────────────────────
const shortIntro = read("llms-preamble.md")
  .split("\n## What Drift Does")[0]
  .trim();

const llms = [
  shortIntro,
  "",
  ...groups.flatMap((g) => [
    `## ${g.group}`,
    "",
    ...g.pages.map((p) => `- [${p.title}](${p.url})${p.description ? `: ${p.description}` : ""}`),
    "",
  ]),
  "## Optional",
  "",
  "- [Website](https://godrift.ai): Main Drift website and early access signup",
  "- [GitHub](https://github.com/godrift-ai/drift-releases): Releases and issue tracker",
  "- [Discord](https://discord.gg/GnZtVZHAW6): Community support",
  "",
].join("\n");

// ── llms-full.txt — preamble + every page, in navigation order ──────────────
const full = [
  read("llms-preamble.md").trim(),
  "",
  "## Documentation Pages",
  "",
  ...groups.flatMap((g) =>
    g.pages.map((p) => `- [${p.title}](${p.url})${p.description ? `: ${p.description}` : ""}`),
  ),
  "",
  "---",
  "",
  ...groups.flatMap((g) =>
    g.pages.flatMap((p) => [
      `# ${p.title}`,
      `Source: ${p.url}`,
      "",
      p.external
        ? `${p.description}\n\nRelease history lives on GitHub: ${p.external}`
        : p.text,
      "",
      "---",
      "",
    ]),
  ),
].join("\n");

const outputs = [
  ["llms.txt", llms],
  ["llms-full.txt", full],
];

if (CHECK) {
  const stale = outputs.filter(([name, content]) => read(name) !== content);
  if (stale.length) {
    console.error(
      `✗ ${stale.map(([n]) => n).join(" and ")} out of sync with docs.json.\n` +
        `  Run: node scripts/build-llms.mjs`,
    );
    process.exit(1);
  }
  console.log(`✓ llms.txt and llms-full.txt are in sync (${pageCount} pages)`);
} else {
  for (const [name, content] of outputs) writeFileSync(join(ROOT, name), content);
  console.log(`✓ wrote llms.txt and llms-full.txt from ${pageCount} pages in docs.json`);
}
