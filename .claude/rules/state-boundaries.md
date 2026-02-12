# State & Data Management

## Core Philosophy

Clear separation of responsibilities between server state, UI state, and navigation state. The goal is predictable behavior, scalable architecture, and smooth UX without unnecessary cache manipulation.

**Key Principle:**

> **Update != Cache Surgery**

The query cache represents a snapshot of server truth and must remain structurally stable. It is not a general-purpose state store.

## Responsibility Boundaries

### 1. Server State -> TanStack Query

Single source of truth for all server-derived data: API responses, entities, lists, records, remote metadata.

Responsible for: fetching, caching, deduplication, background refetching, stale management, mutations lifecycle.

**Rules:**

- Query cache must not be used as a UI state container
- Query cache must not be manually normalized unless strictly required
- Avoid structural mutations across paginated/infinite queries
- Centralize query keys via a factory object (e.g., `userKeys.all`, `userKeys.list(filters)`, `userKeys.detail(id)`)

### 2. Navigation State -> Router

Source of truth for location-driven state: URL parameters, search params (filters, pagination, sorting), route lifecycle.

Responsible for: orchestrating data loading, defining screen lifecycle, managing transitions, prefetching.

**Rules:**

- Filters, pagination, and sorting live in URL/search params
- Components must not invent parallel navigation state
- Router loads data via `ensureQueryData` in loaders — components subscribe via `useQuery`

### 3. UI State -> Zustand

Client-owned, interaction-driven state: selection, modals, local interaction flags, temporary overlays, optimistic UI layers, view model state.

**Rules:**

- UI state must not duplicate server data
- Store minimal identifiers, not full entity copies
- Prefer derived projections over stored datasets
- Zustand stores must be explicitly typed: `create<StoreState>()()`

## Optimistic UI Strategy

Optimistic behavior is implemented via **overlay layers**, not cache mutation.

### Store Only Minimal Overlays

```ts
selectedIds: Set<string>
optimisticDeletes: Set<string>
optimisticUpdates: Map<string, Partial<Entity>>
```

**Rationale:**

- Prevent cache fragmentation issues
- Avoid pagination/infinite query inconsistencies
- Ensure safe refetch & invalidation

## Projection Strategy (View Model Layer)

Displayed UI data is always **derived**, never duplicated.

```
Query Data -> Projection -> Optimistic Overlay -> UI
```

Projection may include: client-side filtering, sorting, grouping, visibility rules.

**Rules:**

- Never store derived datasets in Zustand
- Always compute projections from Query data
- Treat projections as pure functions

## Mutation Lifecycle

Mutations interact with overlays, not cache structures.

**Preferred pattern:**

1. Apply optimistic overlay (`onMutate`)
2. Execute mutation
3. Rollback on error (`onError`)
4. Clean up overlay and invalidate queries (`onSettled`)

- Use `mutationKey` to deduplicate concurrent in-flight requests
- Always clean up overlays in `onSettled` — don't rely on invalidation alone, stale IDs accumulate

**Avoid:** deep cache traversal, page-level manual updates, cross-query structural surgery.

## Data Update & Refetch Behavior

Refetching is a normal and expected operation. Overlays remain stable because they are ID-based.

**Rules:**

- Do not attempt manual cache reconciliation
- Allow Query to resolve server truth
- Overlays adapt automatically

## Forbidden Patterns

- Using query cache as UI store (storing selection/UI flags inside query data)
- Duplicating server data in Zustand (full entity arrays, mirrored datasets)
- Cache surgery for routine UI updates (manual page traversal, complex `setQueryData` normalization)
- Mixing responsibility domains (UI logic in Query layer, server data in UI store)

## When `setQueryData` Is Valid

`setQueryData` is acceptable when the update targets a **single, predictable cache key**:

- Single-entity detail pages (one cache key, no traversal)
- Mutations that return the full updated entity (avoids redundant refetch)
- Known, stable cache keys with no pagination or filter variants

If it requires traversing pages, filters, or multiple query keys — use overlays instead.

## Preferred Patterns

- **Derived UI state** — compute UI representation from Query data, apply overlays dynamically
- **Overlay-based optimistic updates** — use ID-based flags, avoid structural cache mutations
- **URL-driven navigation state** — filters & pagination in search params
- **Clear separation of truth sources** — server truth via Query, client truth via Zustand, navigation truth via Router
