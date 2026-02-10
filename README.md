# Lynx on AI Steroids 🧠⚡

A boilerplate for building cross-platform mobile apps with [Lynx](https://lynxjs.org/) and AI-powered development workflows. Uses ReactLynx to render React-like components natively on mobile devices, with built-in Android APK support and Claude Code integration for AI-assisted development.

## Installation

The only tool you need to install manually is Claude Code. It will guide you through the rest — installing dependencies, setting up environment variables, and configuring everything needed to run the project.

### 1. Install Claude Code

macOS, Linux, WSL:

```sh
curl -fsSL https://claude.ai/install.sh | bash
```

Windows CMD:

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

For alternative installation methods, see the [Claude Code docs](https://code.claude.com/docs/en/overview).

### 2. Bootstrap the project

Run Claude Code:

```sh
claude
```

Use the init command:

```
/project init
```

This will check prerequisites, install tools and dependencies, set up environment files, and verify the project compiles.

## Getting Started

Run the development server:

```bash
npm start
```

Scan the QRCode in the terminal with your LynxExplorer App to see the result.

You can start editing the page by modifying `src/app.tsx`. The page auto-updates as you edit the file.

## Improving AI Instructions

After completing a feature session, run:

```
/project skill-up
```

This command reviews what happened during the session and suggests improvements to the project's AI instructions (rules, skills, conventions). Run it periodically. It is especially useful after sessions where Claude needed corrections or struggled to find things. Over time, this keeps the AI aligned with how the team actually works.

## Getting Help

**For any questions about the project, skills, agents, or how to do something — just ask Claude directly.**

Claude has full access to project documentation and can answer questions, explain available skills, guide you through workflows, help implement features, and run validation.

For more info about the project, available skills, and conventions, see [CLAUDE.md](CLAUDE.md).
