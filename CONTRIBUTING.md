# Contributing to Drift Docs

Thanks for helping improve the Drift documentation! This guide explains how to make changes and submit them.

---

## What you can contribute

- **Fix typos or unclear explanations** — small PRs welcome
- **Improve existing guides** — add context, examples, or clarifications
- **Add new guides** — walkthroughs for specific Drift use cases
- **Report issues** — broken links, outdated info, missing content

---

## Local setup

You'll need [Node.js](https://nodejs.org/) installed.

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/docs.git
cd docs

# 2. Install the Mintlify CLI
npm i -g mintlify

# 3. Start the local preview
mintlify dev
```

The preview runs at `http://localhost:3000` and hot-reloads as you edit files.

---

## Making changes

All documentation pages are `.mdx` files using [Mintlify's MDX components](https://mintlify.com/docs/content/components).

### File structure

```
getting-started/   → Introduction, Quickstart, FAQ
guides/            → Step-by-step walkthroughs
reference/         → Commands, system requirements, changelog
```

### Adding a new page

1. Create a new `.mdx` file in the appropriate folder
2. Add a frontmatter block at the top:
   ```mdx
   ---
   title: "Your Page Title"
   description: "A short description shown in search results and link previews"
   ---
   ```
3. Register the page in `docs.json` under the correct navigation group

---

## Submitting a PR

1. Create a branch: `git checkout -b fix/typo-in-quickstart`
2. Make your changes and preview locally
3. Push and open a PR against `main` on `godrift-ai/docs`
4. Fill out the PR template — describe what changed and why

PRs are reviewed by the Drift team and merged if they meet the quality bar.

---

## Style guide

- Write in second person ("you", not "the user")
- Use short sentences and active voice
- Code examples should be copy-paste ready and tested
- Don't add fluff — every sentence should add value
- Match the tone of existing pages (direct and technical, not marketing-y)

---

## Questions?

Open an issue or start a discussion on GitHub. We're happy to help.
