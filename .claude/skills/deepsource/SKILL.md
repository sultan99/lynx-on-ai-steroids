---
name: deepsource
description: DeepSource commands (review issues). Use when developer needs to review and fix static analysis issues.
user-invocable: true
argument-hint: <review> [--analyzer <name>] [--limit <n>] [--run <url-or-id>]
---

# /deepsource $ARGUMENTS

DeepSource code quality commands.

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `<review>` | Yes | Operation to perform |
| `[--analyzer <name>]` | No | Filter by analyzer (e.g., `javascript`, `test-coverage`) |
| `[--limit <n>]` | No | Max issues to fetch (default: 30) |
| `[--run <url-or-id>]` | No | Fetch issues from a specific analysis run (DeepSource URL or run UUID) |

## Usage

```
/deepsource review                          # Review all issues
/deepsource review --analyzer javascript    # Review JS issues only
/deepsource review --limit 10               # Review top 10 issues
/deepsource review --run https://app.deepsource.com/gh/.../run/d471ccad-.../test-coverage
/deepsource review --run d471ccad-9029-4751-a54f-c59cd6842132 --analyzer test-coverage
```

## Rules

See [rules.md](rules.md) — applies to ALL deepsource operations.

## Instructions

Read the command-specific instruction file and follow it exactly:

- **review** → Read `.claude/skills/deepsource/review.md` and follow all steps

If no command is provided, list the available commands and ask the user which one to run.
