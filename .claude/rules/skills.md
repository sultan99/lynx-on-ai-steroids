# Skill Creation Rules

## Structure

Each skill lives in `.claude/skills/<skill-name>/` with this layout:

```
.claude/skills/<skill-name>/
  SKILL.md              # Entry point (required) — frontmatter + routing
  <subcommand>.md       # Instruction file per subcommand
  <shared-rules>.md     # Shared rules across subcommands (optional)
```

## SKILL.md Format

```markdown
---
name: <skill-name>
description: <short description for skill registry>
user-invocable: true
argument-hint: <arg1|arg2> [optional-arg]
---

# /<skill-name> $ARGUMENTS

<One-line description.>

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `<arg1\|arg2>` | Yes | ... |
| `[--flag]` | No | ... |

## Usage

\```
/<skill-name> arg1         # Description
/<skill-name> arg2         # Description
\```

## Instructions

Read the subcommand-specific instruction file and follow it exactly:

- **arg1** → Read `<path>` and follow all steps
- **arg2** → Read `<path>` and follow all steps

If no argument is provided, list available commands and ask the user.
```

## Instruction File Format

- Steps start at **Step 1** (no Step 0)
- Each step has a clear heading: `### Step N: <action>`
- Include bash commands in fenced code blocks
- Keep steps atomic — one action per step
- Don't duplicate setup covered by `/project init`
- End with a user-facing result or prompt (e.g., report output, ask to deploy)

## Registration

After creating a skill, register it in:

1. **CLAUDE.md > Skills** — add `/<skill-name> <args>` with description
2. **CLAUDE.md > Project Structure** — add the skill folder under `.claude/skills/`

## Principles

- Skills are token-efficient — no redundant context, no prerequisites covered elsewhere
- SKILL.md is a router — it delegates to instruction files, not execute logic itself
- Instruction files are self-contained — readable and executable without SKILL.md context
- Shared rules go in separate files (e.g., `rules.md`) referenced from SKILL.md
