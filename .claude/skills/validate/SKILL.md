---
name: validate
description: Run code validation (lint, type-check, test, build) in parallel. Use when developer wants to validate code before committing or after making changes.
user-invocable: true
---

# /validate

Run all validation commands in parallel and report results.

## When to Run

**Run `/validate` at the end, right before committing:**

- After ALL implementation is complete
- After ALL tests pass individually
- As final verification before creating a commit/PR

**During development, use targeted commands instead:**

```bash
npx vitest run src/path/to/file.test.tsx   # Run specific test
npx biome check --write ./src              # Lint + auto-fix
npx tsc --noEmit                           # Type check
npx rspeedy build                          # Build JS bundle
```

## Usage

```
/validate
```

## Instructions

### Step 1: Run all checks in parallel

Spawn 4 `runner` agents in parallel using the Task tool with `subagent_type: "runner"`. All 4 MUST be spawned as parallel Task tool calls in a single message.

| Check | Command |
| ----- | ------- |
| Lint  | `npx biome check --write ./src && npx biome check ./src` |
| Types | `npx tsc --noEmit` |
| Tests | `npx vitest run` |
| Build | `npx rspeedy build` |

Example Task call:

```
Task tool:
  subagent_type: "runner"
  description: "Run lint check"
  prompt: "Run command: npx biome check --write ./src && npx biome check ./src"
```

### Step 2: Report results

After all agents complete, present a summary table:

```
Validation Results:
| Check       | Status |
|-------------|--------|
| Lint        | PASS / FAIL |
| Types       | PASS / FAIL |
| Tests       | PASS / FAIL |
| Build       | PASS / FAIL |
```

- If ALL pass: report success
- If ANY fail: show the error summary from the failed agent(s) and suggest fixes
