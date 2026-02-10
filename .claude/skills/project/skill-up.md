# Suggest Instruction Improvements

After completing a session, reflect and suggest improvements to CLAUDE.md, rules, or skills.

## Targets

Files in scope for improvements:

- `CLAUDE.md` — project overview, structure, scripts
- `.claude/rules/coding.md` — coding conventions
- `.claude/rules/testing.md` — testing standards
- `.claude/skills/build/` — build skill files
- `.claude/skills/dev/` — dev workflow skill files
- `.claude/skills/git/` — git workflow skill files
- `.claude/skills/project/` — project skill files
- `.claude/agents/` — subagent instructions

## What to Look For

| Observation | Suggestion |
|-------------|------------|
| Developer corrected your approach | Add preferred pattern to `.claude/rules/coding.md` |
| Searched many files to find something | Document the location in CLAUDE.md |
| Learned project-specific convention | Add to `.claude/rules/coding.md` |
| Repeated same clarifying question | Add default to instructions |
| Discovered useful command/shortcut | Add to CLAUDE.md Scripts section |
| Learned Lynx-specific behavior | Add to `.claude/rules/coding.md` Lynx section |
| New dependency or build step added | Update `CLAUDE.md` or `.claude/skills/build/apk.md` |

## Output Format

```
Suggested Instruction Improvements:

1. [.claude/rules/coding.md]
   Add: "Use `bindtap` with `'background only'` for heavy tap handlers"
   Reason: Developer corrected my approach twice

2. [CLAUDE.md > Project Structure]
   Add: "Android signing config is in `android/app/build.gradle.kts`"
   Reason: Took 5 searches to find it
```

## Rules

- **Only suggest if genuinely useful** — skip trivial or one-off learnings
- **Be specific** — include exact file path and what to add
- **Explain why** — so developer understands the value
- **Keep it short** — max 3-5 suggestions per session
