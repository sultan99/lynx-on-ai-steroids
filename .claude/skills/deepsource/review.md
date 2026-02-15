# DeepSource Review

Interactively review and fix DeepSource static analysis issues.

## Steps

### Step 1: Fetch issues

If `--run` is provided → read `.claude/skills/deepsource/fetch-run.md` and follow it, then continue to Step 2.

Otherwise, use the CLI:

```bash
~/bin/deepsource.exe issues list --json --output-file /tmp/deepsource-issues.json
```

Apply optional flags from arguments:
- `--analyzer <name>` → add `-a <name>`
- `--limit <n>` → add `-l <n>`

Read the JSON output to parse issues. Each issue has: issue code, title, file path, line number, category, and analyzer.

### Step 2: Read affected files

For each unique file path in the issues:

- Skip generated files (`src/shared/ui/icon/icons.ttf`, `src/shared/ui/icon/glyph-map.ts`, `android/app/src/main/assets/main.lynx.bundle`)
- Read the file to understand context around reported lines

### Step 3: Evaluate each issue

For each issue, check:

1. Is it a known false positive? → check `rules.md` Lynx False Positives table
2. Does it contradict `.claude/rules/coding.md`? → skip
3. Is the file generated? → skip
4. Does it affect correctness, security, or performance? → fix
5. Is it purely stylistic with no impact? → skip

Tag each issue `[FIX]` or `[SKIP]` with a reason.

### Step 4: Present list to developer

Group issues by file, with MAJOR/CRITICAL severity first. Display:

```
📁 src/components/button/button.tsx

#1 👌[FIX] JS-0356: Unused variable 'count'
   Line 15 — Variable declared but never read
   Reason: Dead code, safe to remove

#2 👎[SKIP] JS-0455: Unknown property 'bindtap'
   Line 23 — Property not recognized
   Reason: False positive — bindtap is valid Lynx event handler

📁 src/utils/format.ts

#3 👌[FIX] JS-0128: Missing return type
   Line 8 — Function lacks explicit return type
   Reason: TypeScript strictness improvement
```

**Wait for developer response.** Accept commands like:
- `fix 1,3` — fix specific issues
- `fix all` — fix all `[FIX]` tagged issues
- `skip 1` — override a `[FIX]` to skip
- `fix 2` — override a `[SKIP]` to fix

### Step 5: Implement fixes

For each issue the developer chose to fix:

- Show the planned change before applying
- Apply the fix
- Move to the next issue

### Step 6: Validate

Run `/validate` to check lint, types, and tests pass after all fixes.

### Step 7: Commit

Ask the developer if they want to commit the fixes. If yes, use `/git commit`.

### Step 8: Output summary

```
✅ Fixed: 3 issues
⏭️ Skipped: 2 issues (1 false positive, 1 style-only)
📋 Remaining: 5 issues not reviewed
```
