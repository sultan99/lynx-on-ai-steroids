# Testing Standards

## Test Types

| Type | Use For | Location |
| ---- | ------------------------------ | --------------------------------------- |
| Unit | Simple components, utilities | `component.test.tsx` next to file |
| Integration | State, interactions, threading | `component.test.tsx` or `tests/` folder |

Target 80%+ coverage. Cover happy paths, edge cases, errors.

## Running Tests

```bash
# Run a specific test file during development
npx vitest run src/path/to/specific.test.tsx

# Full test suite - only at the end before committing
npx vitest run
```

**IMPORTANT:** During development, run only the specific test file you're working on. Only run the full test suite at the end.

### When to Run Tests

**DO run tests after:**

- Making functional changes that could affect behavior
- Refactoring test code itself
- Adding new features or fixing bugs
- Final validation before committing

**DON'T run tests after:**

- Renaming internal variables (doesn't affect behavior)
- Changing comments or formatting
- Updating documentation
- Any change that clearly doesn't affect functionality

## Writing Rules

- Use `render` from `@lynx-js/react/testing-library`
- Use `getQueriesForElement(elementTree.root!)` for querying rendered output
- Use `expect(elementTree.root).toMatchInlineSnapshot()` for snapshot testing
- Use Arrange-Act-Assert pattern
- Clear mocks: `vi.clearAllMocks()` in `beforeEach`
- Use `.at(0)` instead of `[0]!` for array access (Biome forbids `!` assertions)

## Imports

```ts
import '@testing-library/jest-dom'
import { getQueriesForElement, render } from '@lynx-js/react/testing-library'
import { expect, test, vi } from 'vitest'
```

## Fake Timers

For polling, debounce, delays:

```ts
vi.useFakeTimers({ shouldAdvanceTime: true })

// test code...
await vi.advanceTimersByTimeAsync(5000)

vi.useRealTimers()
```
