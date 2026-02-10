# Git Rules

These rules apply to ALL git operations — main thread and all agents.

## Restrictions

- Never use `git commit` without explicit permission
- Never use `git reset` without explicit permission
- Never use `git push` without explicit permission
- Never use `git push --force` to main/master — warn user if requested
- Never skip hooks (`--no-verify`, `--no-gpg-sign`) unless explicitly requested
- Never commit sensitive files (`.env`, credentials, secrets)
- Never add `Co-Authored-By` or AI/Claude references to commit messages
- Never amend commits after hook failure — create new commit instead

## Safe Defaults

- Prefer staging specific files over `git add -A` or `git add .`
- Always verify branch name follows naming convention before committing
