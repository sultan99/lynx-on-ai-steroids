# Testing Standards

## Philosophy

Test behavior, not implementation. Tests verify what users see and do — not CSS classnames, element structure, or internal state.

## Testing Priorities

| Priority | What | When |
|----------|------|------|
| 1st | **Feature tests** (integration) | Test screens/routes: mock API → render → verify content + interactions |
| 2nd | **Component tests** (behavior) | Reusable components: callbacks, visibility, user interactions |
| 3rd | **Utility tests** | Pure functions with various inputs/outputs |

### What to Test

- **User-visible outcomes** — text appears, items render from API data, errors show
- **Actions & interactions** — tap navigates, data loads and displays, states change
- **Callbacks** — tap triggers navigation, focus shows popup

### What NOT to Test

- CSS classnames or structural snapshots
- Element hierarchy / DOM structure
- Implementation details (internal state shape, hook calls)
- Inline styles or style strings

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
- Prefer behavioral queries: `getByText`, `getByTestId` — avoid structural selectors when possible
- Mock at system boundaries (framework hooks for rendering, HTTP APIs) — not internal components
- Test loaders and query functions directly with real `QueryClient` — no mocking needed
- Use Arrange-Act-Assert pattern
- Clear mocks: `vi.clearAllMocks()` in `beforeEach`
- Use `.at(0)` instead of `[0]!` for array access (Biome forbids `!` assertions)
- Use `vitest` — never `jest`
- Avoid raw `setTimeout`/`setInterval` in tests — use fake timers instead
- No `toMatchInlineSnapshot()` for structural assertions — assert specific behavior instead

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

## Testing Route Loaders

Loaders are plain async functions — test them directly with a real `QueryClient`, no rendering needed:

```ts
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

test('loader fetches query data', async () => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  const { Route } = await import('./route-file')

  await Route.options.loader({ context: { queryClient } })
  const data = queryClient.getQueryData(['route', 'key'])

  expect(data).toEqual({ message: 'expected' })
  vi.useRealTimers()
})
```

**Why separate from component tests:** Lynx tests render with Preact — TanStack providers use React hooks internally and can't run in the Lynx test environment. Test loaders as functions, test components with mocked hooks.

## Fake Timers

For polling, debounce, delays:

```ts
vi.useFakeTimers({ shouldAdvanceTime: true })

// test code...
await vi.advanceTimersByTimeAsync(5000)

vi.useRealTimers()
```
