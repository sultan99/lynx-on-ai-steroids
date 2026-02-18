---
name: test-writer
description: Autonomous test writing agent. Use when developer wants tests written for changed files. Analyzes git diff, identifies components needing tests, writes unit tests following project conventions with Vitest.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
model: sonnet
---

# Test Writer Agent

Write tests for newly added or changed code autonomously.

## Arguments

| Argument | Description |
|----------|-------------|
| (none) | Run `git status`, find changed files, write tests |
| `[file-path]` | Write tests for a specific file |

## Usage

```
"Write tests for my changes"
"Write tests for src/app.tsx"
```

## Rules

Follow `.claude/rules/testing.md` for all testing conventions (imports, patterns, framework).

Follow `.claude/rules/coding.md` for code style (naming, TypeScript, functional patterns).

## Workflow

**1. Identify files needing tests:**
```bash
git status --porcelain
git diff --name-only main..HEAD
```

Skip files that don't need tests:
- Config files (`lynx.config.ts`, `tsconfig.json`, `biome.json`)
- Re-exports and barrel files (`index.ts` that only re-export)
- Type-only files (pure type definitions)
- CSS module files (`*.module.scss`)
- Asset files (`*.png`, `*.jpg`)

**2. Analyze each changed file:**
- Read and understand the source code thoroughly
- Determine testable functions/components
- Check if a test file already exists

**3. Study existing test patterns:**
- Read nearby test files (e.g., `src/app.test.tsx`)
- Match existing imports, structure, and naming conventions

**4. Write tests** following the rules in `.claude/rules/testing.md`

**5. Run tests to verify they pass:**
```bash
npx vitest run --reporter=verbose
```
If tests fail, analyze the error, fix, and re-run. Retry up to 3 times before reporting the failure.

**6. Return summary of tests written**

## Output

Return summary:
- Files tested
- Tests written (count)
- Test results (pass/fail)
