---
name: project
description: Project management commands (init, skill-up)
user-invocable: true
argument-hint: <init|skill-up>
---

# /project $ARGUMENTS

Manage the project setup and instructions.

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `<init\|skill-up>` | Yes | `init` — set up project from scratch; `skill-up` — suggest instruction improvements |

## Usage

```
/project init            # Set up the project from scratch
/project skill-up        # Suggest improvements to instructions and rules
```

## Instructions

Read the command-specific instruction file and follow it exactly:

- **init** → Read `.claude/skills/project/init.md` and follow all steps
- **skill-up** → Read `.claude/skills/project/skill-up.md` and follow all steps

If no command is provided, list the available commands and ask the user which one to run.
