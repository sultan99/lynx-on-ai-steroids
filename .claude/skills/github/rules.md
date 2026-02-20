# GitHub Rules

These rules apply to ALL GitHub operations.

## Confirmations

Critical GitHub actions (`issue create`, `pr create`, `pr edit`, `push`) require developer confirmation unless `-y` was passed or `/autopilot` is active. See `.claude/rules/skills.md` > Confirmations.

## Restrictions

- Never merge PRs without permission
- Never dismiss reviews without permission
- Never add promotional text like "Generated with Claude Code" to PR descriptions
- When posting PR comment replies, include the commit SHA and description of what was fixed

## Resolving Issue Number

When the issue number is not provided, resolve it in this order:

1. Check conversation context for recently mentioned issue
2. Extract from current git branch name (pattern: `<type>/<issue>/<description>`)
3. If not found → prompt user and **wait for response**

Extract issue from branch:

```bash
git branch --show-current
# feature/12/add-user-login → 12
# fix/34/validation-error → 34
```

## PR Title Format

Format: `<emoji> <description>` (max 8 words, emoji excluded)

Determine emoji from the **GitHub issue** title and labels:

| Label / Intent | Emoji |
|----------------|-------|
| New feature | 📦 |
| Bug fix | 🐞 |
| Performance | 🚀 |
| Security | 🗝️ |
| Dependencies / chore | 🪁 |
| Refactor | 🧹 |

If no issue is available, fall back to branch prefix (`feature/` → 📦, `fix/` → 🐞, `chore/` → 🧹, `hotfix/` → 🐞).

Examples:

- `📦 Icon component with font generation`
- `🐞 Fix validation error on submit`
- `🚀 Optimize bundle size`
