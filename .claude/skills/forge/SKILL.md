---
name: forge
description: Generate assets from source files (icons, etc.)
user-invocable: true
argument-hint: <icons>
---

# /forge $ARGUMENTS

Generate assets from source files.

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `icons` | Yes | Generate icon font from SVGs in `src/shared/ui/icon/svgs/` |

## Usage

```
/forge icons    # Generate TTF font + glyph map from SVGs
```

## Instructions

Read the subcommand-specific instruction file and follow it exactly:

- **icons** → Read `.claude/skills/forge/icons.md` and follow all steps

If no argument is provided, list available commands and ask the user.
