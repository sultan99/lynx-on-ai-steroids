---
name: validate
description: Run code validation (lint, type-check, test) in parallel. Use when developer wants to validate code before committing or after making changes.
---

# Validate Code

Run all validation commands in parallel using background agents and report results.

## When to Run

**Run `/validate` at the end, right before committing:**

- After ALL implementation is complete
- After ALL tests pass individually
- As final verification before creating a commit/PR

**During development, use targeted commands instead:**

```bash
npx vitest run src/path/to/file.test.tsx   # Run specific test
npx @biomejs/biome check ./src             # Lint check
npx tsc --noEmit                           # Type check
```

## Usage

```
/validate
```

## Execution

**Spawn 3 `runner` agents in parallel** using the Task tool with `subagent_type: "runner"`.

| Check | Command |
| ----- | ------- |
| Lint  | `npx @biomejs/biome check ./src` |
| Types | `npx tsc --noEmit` |
| Tests | `npx vitest run` |

**IMPORTANT:** All 3 agents MUST be spawned as parallel Task tool calls in a single message.

Example Task call:

```
Task tool:
  subagent_type: "runner"
  description: "Run lint check"
  prompt: "Run command: npx @biomejs/biome check ./src"
```

## Output

After all agents complete, present a summary table:

```
Validation Results:
| Check       | Status |
|-------------|--------|
| Lint        | PASS / FAIL |
| Types       | PASS / FAIL |
| Tests       | PASS / FAIL |
```

- If ALL pass: report success
- If ANY fail: show the error summary from the failed agent(s) and suggest fixes
