---
name: git
description: Git commands for branching, committing, merging, and rebasing. Use when developer needs to create branches, commit changes, merge or rebase branches.
user-invocable: true
argument-hint: <branch|commit|merge|rebase> [issue-number | branch]
---

# /git $ARGUMENTS

Git workflow commands.

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `<branch\|commit\|merge\|rebase>` | Yes | Git operation to perform |
| `[issue-number]` | No | GitHub issue number for `branch` (e.g., `12`) |
| `[branch]` | No | Target branch for `merge`/`rebase` (default: `main`) |

## Usage

```
/git branch 12           # Create branch from GitHub issue #12
/git branch              # Create branch (will ask for details)
/git commit              # Smart commit with auto-grouping
/git merge               # Merge main into current branch
/git merge develop       # Merge develop into current branch
/git rebase              # Rebase current branch onto main
/git rebase develop      # Rebase current branch onto develop
```

## Rules

See [rules.md](rules.md) — applies to ALL git operations.

## Instructions

Read the command-specific instruction file and follow it exactly:

- **branch** → Read `.claude/skills/git/branch.md` and follow all steps
- **commit** → Read `.claude/skills/git/commit.md` and follow all steps
- **merge** → Read `.claude/skills/git/merge.md` and follow all steps
- **rebase** → Read `.claude/skills/git/rebase.md` and follow all steps

If no command is provided, list the available commands and ask the user which one to run.
