# Drift Documentation

This is the official documentation for [Drift](https://godrift.ai) — the AI copilot for robotics development.

📖 **Live docs:** [docs.godrift.ai](https://docs.godrift.ai)

---

## About Drift

Drift lets you build, test, and debug robotics simulations in **Gazebo** and **MuJoCo** through plain English prompts. It scaffolds the ROS2 workspace, generates the robot and world description files (URDF, SDF, MJCF), builds with colcon, and launches the stack. No manual URDF editing, no hand-written launch files — just describe what you want.

```bash
curl -fsSL https://godrift.ai/install | bash
drift
```

---

## Contributing to the Docs

We welcome contributions from the community! Whether it's fixing a typo, improving an explanation, or adding a new guide — all help is appreciated.

**See [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.**

### Quick start

```bash
# Install the Mintlify CLI
npm i -g mintlify

# Clone the repo
git clone https://github.com/godrift-ai/docs.git
cd docs

# Start local preview
mintlify dev
```

Your local preview will be live at `http://localhost:3000`.

### If you add or rename a page

`llms.txt` and `llms-full.txt` are **generated** from `docs.json` — don't edit them by hand. After changing the navigation or any page's frontmatter, run:

```bash
node scripts/build-llms.mjs
```

and commit the result. CI runs `node scripts/build-llms.mjs --check` and fails if they're stale, so a page can't end up live on the site but invisible to the AI agents these files exist for.

The hand-written robotics context at the top of `llms-full.txt` lives in `llms-preamble.md` — edit that instead.

---

## Repo Structure

```
docs/
├── getting-started/     # Introduction, Installation, Quickstart, FAQ, Support
├── guides/              # First simulation, Manipulator + RViz, MuJoCo scene,
│                        #   Project context, Custom skills
├── showcase/            # Robot walkthroughs: Go2 quadruped, Aloha dual-arm, H1 humanoid
├── reference/           # Commands, System requirements, Troubleshooting, Changelog
├── assets/              # Images and videos
├── docs.json            # Mintlify config (navigation, theme, metadata)
├── llms.txt             # Short index for AI agents
├── llms-full.txt        # Full-text corpus for AI agents
└── style.css            # Theme overrides
```

---

## Reporting Issues

- **Docs issue** (wrong info, broken link, unclear explanation): [Open an issue](https://github.com/godrift-ai/docs/issues)
- **Drift CLI bug**: [Open an issue on the releases repo](https://github.com/godrift-ai/drift-releases/issues)

---

## License

The Drift documentation is open source under the [MIT License](./LICENSE).
