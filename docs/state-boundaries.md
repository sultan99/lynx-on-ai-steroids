# How State & Data Work in This Project

> For the enforceable rules version of this strategy, see [`.claude/rules/state-boundaries.md`](../.claude/rules/state-boundaries.md).

We treat different types of state according to their true nature instead of forcing everything into a single model. Not all state is the same. We operate with three fundamentally different domains:

- **Server State** — Data from the backend → **TanStack Query**
- **UI State** — Interaction and presentation logic → **Zustand**
- **Navigation State** — URL-driven application state → **Router**

Each domain behaves differently and deserves a different management strategy.

## Server State — "What the Backend Knows"

Managed by **TanStack Query**:

- API responses
- Entities and lists
- Remote metadata

Server state is:

- Asynchronous
- Cacheable and stale-aware
- Refetchable
- Shared across screens

TanStack Query is optimized exactly for this.

The query cache is a **snapshot of server truth**, not a general-purpose state store.

## UI State — "What the User Is Doing"

Managed by **Zustand**:

- Selection state
- Modals and interaction flags
- Temporary overlays
- Optimistic effects

UI state is synchronous, interaction-driven, and often ephemeral.

👉 Store identifiers and overlays — never copies of entities.

## Navigation State — "What the URL Represents"

Lives in the **Router**:

- Filters and pagination
- Sorting
- Route parameters

The URL is a stable, shareable, debuggable representation of screen state.

## Why This Separation Matters

Without clear boundaries, frontend state becomes chaotic:

- Server data mixed with UI flags
- Cache mutated for UI needs
- Competing sources of truth
- Hard-to-debug inconsistencies

With clear boundaries:

- Each system solves the problem it was designed for
- State flows stay predictable
- Refetching is safe
- The architecture scales naturally with FSD

## The Critical Principle

> 🔥 **Update ≠ Cache Surgery**

### Problem: Cache Surgery

Optimistically deleting a row in a paginated table:

```ts
// ❌ Cache surgery — painful, fragile
queryClient.setQueryData(['users', { page }], (old) => ({
  ...old,
  items: old.items.filter((user) => user.id !== deletedId),
}))
```

Looks simple? Now consider:
- Which page is the item on? Traverse all pages.
- Infinite queries? Structure is `{ pages: [...], pageParams: [...] }`.
- Other query keys with different filters? Update every cache entry.
- Background refetch? Your manual changes get overwritten.

```ts
// ❌ Cache surgery for infinite queries — real pain
queryClient.setQueryData(['users', filters], (old) => ({
  ...old,
  pages: old.pages.map((page) => ({
    ...page,
    items: page.items.filter((user) => user.id !== deletedId),
  })),
}))
```

Multiply by every mutation type and query key variation.

### Solution: Overlay Pattern

```ts
// ✅ One line. No cache traversal. No fragmentation bugs.
optimisticDeletes.add(deletedId)
```

## How the Pieces Work Together

```
Query Data → Projection → UI Overlays → Screen
```

Nothing is duplicated. Everything is derived.

### Example: Data Table with Selection and Bulk Actions

A table with server records, checkboxes, and bulk delete — where state boundaries get blurry.

**Query keys — centralized factory to avoid raw string arrays:**

```ts
const userKeys = {
  all: ['users'] as const,
  list: (filters: Filters) => ['users', filters] as const,
  detail: (id: string) => ['users', id] as const,
}
```

**Store — only IDs and patches, never full entities:**

```ts
type UsersState = {
  selectedIds: Set<string>
  deletedIds: Set<string>
  updatedRecords: Map<string, Partial<User>>
  select: (id: string) => void
  markUpdated: (user: Partial<User>) => void
  markDeleted: (id: string) => void
  clearDeleted: (id: string) => void
}

const useUsersStore = create<UsersState>()((set) => ({
  selectedIds: new Set<string>(),
  deletedIds: new Set<string>(),
  updatedRecords: new Map<string, Partial<User>>(),

  select: (id) => set(({ selectedIds }) => {
    const next = new Set(selectedIds)
    next.has(id) ? next.delete(id) : next.add(id)
    return { selectedIds: next }
  }),

  markUpdated: (user: Partial<User>) => set(({ updatedRecords }) => {
    const next = new Map(updatedRecords)
    next.set(user.id, user)
    return { updatedRecords: next }
  }),

  markDeleted: (id) => set(({ deletedIds }) => {
    const next = new Set(deletedIds)
    next.add(id)
    return { deletedIds: next }
  }),

  clearDeleted: (id) => set(({ deletedIds }) => {
    const next = new Set(deletedIds)
    next.delete(id)
    return { deletedIds: next }
  }),
}))
```

**Projection — derived at render time, never stored:**

```ts
const useUserTable = () => {
  const { data } = useQuery(usersQueryOptions)
  const { deletedIds, updatedRecords, selectedIds } = useUsersStore()

  return useMemo(() => {
    if (!data?.items) return []

    return data.items
      .filter((item) => !deletedIds.has(item.id))
      .map((item) => ({
        ...item,
        ...updatedRecords.get(item.id),
        selected: selectedIds.has(item.id),
      }))
  }, [data, deletedIds, updatedRecords, selectedIds])
}
```

`selected` is derived by joining `selectedIds` with query data. Selection never touches the cache.

> **Note:** `useMemo` works here because Zustand returns new `Set`/`Map` references on each store update. The memoization re-triggers correctly — but only because the store actions create new instances (e.g., `new Set(s.selectedIds)`, `new Map(s.updatedRecords)`) rather than mutating in place.

## Optimistic UI via Overlays

Overlays modify the *view*, not the cache.

### Mutation Lifecycle

```ts
const useDeleteUser = () => {
  const { markDeleted, clearDeleted } = useUsersStore()

  return useMutation({
    mutationKey: ['deleteUser'], // groups related mutations for identification
    mutationFn: (id: string) => api.deleteUser(id),

    onMutate: (id) => {
      markDeleted(id) // 👈 instantly hide the row
    },

    onError: (_err, id) => {
      clearDeleted(id) // 👈 rollback: show it again
    },

    onSettled: (_data, _err, id) => {
      clearDeleted(id) // 👈 clean up overlay — server truth takes over
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}
```

1. User clicks delete → row disappears instantly (overlay)
2. Mutation fires in the background
3. If it fails → row reappears (rollback)
4. On settle → overlay is cleaned up, Query refetches, server truth wins

No `setQueryData`. No page traversal. No cache corruption.

> **Concurrent mutations:** `mutationKey` is used to group and identify related mutations (for defaults, devtools, and `useIsMutating`); it does **not** deduplicate in-flight requests. For bulk actions (e.g., deleting multiple rows), each delete gets its own overlay entry — if one fails, only that row rolls back. If the component unmounts mid-mutation, `onSettled` still fires and cleans up the overlay.

## When `setQueryData` Is Appropriate

The overlay pattern is the default for list/table mutations. However, `setQueryData` is a valid choice in specific scenarios:

- **Single-entity detail pages** — After updating a user profile, you can update the detail cache directly since there's exactly one cache key to target: `queryClient.setQueryData(userKeys.detail(id), updatedUser)`.
- **Mutations that return the updated entity** — When the API response contains the full updated object, writing it to cache avoids a redundant refetch.
- **Known, stable cache keys** — When you can identify exactly which cache entry to update without traversal (no pagination, no filter variants).

The rule is: if the update targets a **single, predictable cache key**, `setQueryData` is clean. If it requires traversing pages, filters, or multiple query keys — use overlays.

## Instant Filtering with Progressive Refinement

When the user applies a filter, show results immediately from cached data, then let the server refine:

```ts
import { keepPreviousData } from '@tanstack/react-query'

const useFilteredUsers = (filters: Filters) => {
  const { data, isPlaceholderData } = useQuery({
    queryKey: userKeys.list(filters),
    queryFn: () => api.getUsers(filters),
    placeholderData: keepPreviousData,
  })

  const rows = useMemo(() => {
    if (!data?.items) return []
    return data.items.filter((row) => matchesFilters(row, filters))
  }, [data, filters])

  return { rows, isRefining: isPlaceholderData }
}
```

`matchesFilters` is a pure function that applies filter predicates to a row client-side (e.g., string includes, range checks). Keep it co-located with the query hook or in a shared projection utility.

1. User picks a filter → table updates instantly from cached data
2. Server responds with the full filtered dataset
3. Table updates seamlessly — no flicker

Filters live in the URL (router state), Query reacts to the new key, projection recomputes. No manual sync.

## Router + Query: Who Does What?

- **Router** decides *when* to fetch — orchestrates navigation lifecycle
- **Query** decides *how* to store — owns cache, deduplication, background sync

```ts
// Route — ensures data is ready before render
export const usersRoute = createRoute({
  path: '/users',
  loader: ({ context }) => context.queryClient.ensureQueryData(usersQueryOptions),
  component: UsersPage,
})

// Component — subscribes to reactive cache updates
const UsersPage = () => {
  const { data } = useQuery(usersQueryOptions) // no re-fetch, just subscribes
  return <Table rows={data.items} />
}
```

Loader guarantees data before render (no loading spinners on navigation). `useQuery` subscribes to cache for background refetches and invalidations.

## The Guiding Question

When something feels confusing, ask:

> 💡 **"Who owns this truth?"**

| Truth | Owner |
|-------|-------|
| Server data | Query |
| User interactions | Zustand |
| Screen context | Router |

That answer determines where the state belongs.
