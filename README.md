# Drift Documentation

This is the official documentation for [Drift](https://godrift.ai) — the AI copilot for robotics development.

📖 **Live docs:** [docs.godrift.ai](https://docs.godrift.ai)

---

## About Drift

Drift lets you build, test, and debug ROS2 simulations in Gazebo through plain English prompts. No manual URDF editing, no hand-written launch files — just describe what you want.

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

---

## Repo Structure

```
docs/
├── getting-started/     # Introduction, Quickstart, FAQ
├── guides/              # Built your first robot simulation
├── reference/           # Commands, System requirements, Changelog
├── assets/              # Images and logos
└── docs.json            # Mintlify config (navigation, theme, metadata)
```

---

## Reporting Issues

- **Docs issue** (wrong info, broken link, unclear explanation): [Open an issue](https://github.com/godrift-ai/docs/issues)
- **Drift CLI bug**: [Open an issue on the releases repo](https://github.com/drift-tech/drift-releases/issues)

---

## License

The Drift documentation is open source under the [MIT License](./LICENSE).
