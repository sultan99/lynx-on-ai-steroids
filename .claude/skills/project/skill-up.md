# Suggest Instruction Improvements

After completing a session, reflect, audit, and suggest improvements to CLAUDE.md, rules, or skills.

## Targets

Files in scope:

- `CLAUDE.md` — project overview, structure, scripts
- `.claude/rules/coding.md` — coding conventions
- `.claude/rules/testing.md` — testing standards
- `.claude/skills/build/` — build skill files (apk, aab, ipa)
- `.claude/skills/dev/` — dev workflow skill files
- `.claude/skills/forge/` — asset generation skill files
- `.claude/skills/git/` — git workflow skill files
- `.claude/skills/github/` — GitHub PR skill files
- `.claude/skills/project/` — project skill files
- `.claude/skills/validate/` — validation skill files
- `.claude/skills/deepsource/` — DeepSource skill files
- `.claude/skills/ship/` — ship skill files
- `.claude/agents/` — subagent instructions
- `.claude/rules/state-boundaries.md` — state management rules
- `.github/copilot-instructions.md` — Copilot code review instructions

## Step 1: Audit for Issues

Read all `.md` files in `.claude/`, `.github/`, and `CLAUDE.md`. Check for:

### Duplications

- Same rule stated in multiple files (e.g., rule in both `coding.md` and `copilot-instructions.md`)
- Same rule stated twice within the same file
- `.github/copilot-instructions.md` should reference `.claude/rules/` — not duplicate their content
- Rules belong in `.claude/rules/`. Copilot file only contains: rule file references, requirement verification, and key flags summary

### Wrong or Stale References

- File paths that point to files that don't exist
- References to old file names or removed sections
- Relative paths in skill instruction files (e.g., `../../.github/`) — verify they resolve correctly
- `skill-up.md` Targets list matches actual files on disk
- `CLAUDE.md` Skills section matches actual SKILL.md files

### Skills.md Compliance

Check every `SKILL.md` against `.claude/rules/skills.md` requirements:

- Has `name`, `description`, `user-invocable: true` in frontmatter
- Has `argument-hint` if skill takes arguments
- Has Arguments table, Usage block, and Instructions section
- Instructions section delegates to subcommand `.md` files (router pattern)
- Subcommand files start at Step 1, have clear headings, are self-contained

### CLAUDE.md Consistency

- Project Structure section lists only top-level directories (no deep file trees)
- Generated Files table matches actual generated files
- Skills section lists all skills registered in `.claude/skills/*/SKILL.md`
- No stale entries for removed skills or files

### Cross-file Sync

- New rules added to `.claude/rules/` should be reflected in `.github/copilot-instructions.md` key flags (if Lynx-specific or commonly missed)
- New skills added to `.claude/skills/` should be registered in `CLAUDE.md` Skills section
- New build targets added to `/build` should be in `CLAUDE.md` Skills section

## Step 2: Learn from Accepted CR Feedback

Fetch recent PRs and their resolved review comments to find patterns worth codifying as rules.

```bash
gh pr list --state merged --limit 5 --json number
```

For each recent PR, fetch review comments that were accepted (replied with "Applied — fixed in"):

```bash
gh api repos/{owner}/{repo}/pulls/<pr-number>/comments --jq '.[] | {body, path, user: .user.login}'
```

For each accepted fix:

1. **Identify the pattern** — what did the reviewer catch? (e.g., wrong import, missing test, HTML element usage)
2. **Check existing rules** — is this already covered in `.claude/rules/`?
3. **If not covered** — suggest adding it as a new rule
4. **If covered but still caught** — the rule may need to be more prominent (move to `.github/copilot-instructions.md` key flags)

Skip:
- One-off fixes (typos, variable names specific to one PR)
- Style preferences that don't affect correctness
- Comments from bots that were skipped

Focus on patterns that appear across multiple PRs or that indicate a gap in the rules.

## Step 3: Session Learnings

Reflect on the current session for new learnings:

| Observation | Suggestion |
|-------------|------------|
| Developer corrected your approach | Add preferred pattern to `.claude/rules/coding.md` |
| Searched many files to find something | Document the location in CLAUDE.md |
| Learned project-specific convention | Add to `.claude/rules/coding.md` |
| Repeated same clarifying question | Add default to instructions |
| Discovered useful command/shortcut | Add to CLAUDE.md Scripts section |
| Learned Lynx-specific behavior | Add to `.claude/rules/coding.md` Lynx section |
| New dependency or build step added | Update `CLAUDE.md` or `.claude/skills/build/` |

## Output Format

```
Audit Results:

1. 🔄[DUPLICATION] .github/copilot-instructions.md
   "No inline styles" duplicates .claude/rules/coding.md line 36
   Fix: Remove from copilot-instructions.md

2. ⛓️‍💥[STALE REF] .claude/skills/project/skill-up.md
   References `.claude/skills/build/apk.md` but should include aab.md
   Fix: Change to `.claude/skills/build/`

3. 🛸[MISSING] .claude/skills/dev/SKILL.md
   Missing `user-invocable: true` in frontmatter
   Fix: Add to frontmatter

CR Learnings (from accepted review feedback):

1. 🗨️[.claude/rules/coding.md]
   Add: "Always null-check props before spreading"
   Source: PR #12 — reviewer caught 2 instances, fixed in abc123

2. 🗨️[.github/copilot-instructions.md > Key Things to Flag]
   Add: "Hooks called conditionally"
   Source: PR #15, #18 — same issue caught twice across PRs

Session Improvements:

1. 🎯[.claude/rules/coding.md]
   Add: "Use `bindtap` with `'background only'` for heavy tap handlers"
   Reason: Developer corrected my approach twice
```

After presenting the report, ask the developer which fixes to apply.

## Rules

- **Audit first, suggest second** — always run the full audit before session learnings
- **Auto-fix safe issues** — duplications, stale refs, missing frontmatter can be fixed directly after developer approval
- **Only suggest if genuinely useful** — skip trivial or one-off learnings
- **Be specific** — include exact file path, line, and what to change
- **Explain why** — so developer understands the value
- **Keep session suggestions short** — max 3-5 per session
