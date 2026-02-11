---
name: deepsource
description: DeepSource commands (review issues). Use when developer needs to review and fix static analysis issues.
user-invocable: true
argument-hint: <review> [--analyzer <name>] [--limit <n>]
---

# /deepsource $ARGUMENTS

DeepSource code quality commands.

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `<review>` | Yes | Operation to perform |
| `[--analyzer <name>]` | No | Filter by analyzer (e.g., `javascript`, `test-coverage`) |
| `[--limit <n>]` | No | Max issues to fetch (default: 30) |

## Usage

```
/deepsource review                          # Review all issues
/deepsource review --analyzer javascript    # Review JS issues only
/deepsource review --limit 10               # Review top 10 issues
```

## Rules

See [rules.md](rules.md) — applies to ALL deepsource operations.

## Instructions

Read the command-specific instruction file and follow it exactly:

- **review** → Read `.claude/skills/deepsource/review.md` and follow all steps

If no command is provided, list the available commands and ask the user which one to run.
