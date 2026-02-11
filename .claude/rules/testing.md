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

- Use `render` from `@lynx-js/react/testing-library` — never `@testing-library/react`
- Never use `elementTree.root!` — Biome forbids `!` assertions. Use a `queryRoot()` helper instead (see Querying Rendered Output below)
- Use `expect(elementTree.root).toMatchInlineSnapshot()` for snapshot testing
- Use Arrange-Act-Assert pattern
- Clear mocks: `vi.clearAllMocks()` in `beforeEach`
- Use `.at(0)` instead of `[0]!` for array access (Biome forbids `!` assertions)
- Use `vitest` — never `jest`
- Avoid raw `setTimeout`/`setInterval` in tests — use fake timers instead

## Imports

```ts
import '@testing-library/jest-dom'
import { getQueriesForElement, render } from '@lynx-js/react/testing-library'
import { expect, test, vi } from 'vitest'
```

## Querying Rendered Output

Use a helper to avoid `!` assertions on `elementTree.root`:

```ts
const queryRoot = () => {
  const root = elementTree.root
  if (!root) throw new Error('root not rendered')
  return getQueriesForElement(root)
}

// Usage
const { getByText } = queryRoot()
```

## Fake Timers

For polling, debounce, delays:

```ts
vi.useFakeTimers({ shouldAdvanceTime: true })

// test code...
await vi.advanceTimersByTimeAsync(5000)

vi.useRealTimers()
```
