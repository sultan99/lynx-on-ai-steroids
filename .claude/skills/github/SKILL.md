---
name: github
description: GitHub commands (issues, PRs). Use when developer needs to create issues, create/update PRs, or address review comments.
user-invocable: true
argument-hint: <create issue|create pr|update pr|resolve cr> [pull-request-id]
---

# /github $ARGUMENTS

GitHub commands using `gh` CLI.

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `<create issue\|create pr\|update pr\|resolve cr>` | Yes | Operation to perform |
| `[pull-request-id]` | No | PR number (auto-detected from branch, PR commands only) |

## Usage

```
/github create issue       # Conversational issue creation
/github create pr          # Create PR from current branch
/github update pr          # Update current branch's PR
/github update pr 230      # Update PR #230
/github resolve cr         # Resolve code review feedback on current PR
/github resolve cr 230     # Resolve code review feedback on PR #230
```

## Rules

See [rules.md](rules.md) — applies to ALL github operations.

## Instructions

Read the command-specific instruction file and follow it exactly:

- **create issue** → Read `.claude/skills/github/create-issue.md` and follow all steps
- **create pr** → Read `.claude/skills/github/create-pr.md` and follow all steps
- **update pr** → Read `.claude/skills/github/update-pr.md` and follow all steps
- **resolve cr** → Read `.claude/skills/github/resolve-cr.md` and follow all steps

If no command is provided, list the available commands and ask the user which one to run.
