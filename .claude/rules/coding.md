# Coding Conventions

## Scope

These rules apply to ALL code in the repository — `src/`, `scripts/`, `.claude/skills/`, and any other code files.

## General Principles

- Prioritize readability, maintainability, and simplicity
- Prefer concise solutions: less code, fewer elements, minimal CSS
- Favor functional and declarative patterns; avoid classes
- Keep functions under 200 lines; split into smaller units
- Avoid deep nesting in code or markup (3+ levels)
- Don't create utility functions for simple one-liners — use library functions directly
- Avoid over-engineering: unnecessary abstractions, premature generalization, feature flags for simple changes
- Scripts generating files should use temp dirs for intermediate output — copy only final artifacts to the target dir, then delete temp
- Windows compatibility: use forward slashes in glob patterns — `path.join` produces backslashes on Windows which breaks glob libraries. Use `path.join` only for non-glob filesystem paths

## Lynx Elements

- Use `<view>`, `<text>`, `<image>` — never HTML tags (`<div>`, `<span>`, `<img>`, `<p>`, `<button>`, `<input>`)
- Use `bindtap` for tap handlers, not `onClick`
- Use `className` for styling
- Avoid unnecessary wrapper `<view>` elements; use the fewest elements possible
- Use `flex` + `gap` for spacing between elements; avoid margins for gaps

## JSX Props

- Properties first, then callbacks — sorted alphabetically within each group
- Callbacks are props starting with `bind`, `catch`, `on`, or whose value is a function

```tsx
// Prefer
<image
  className={css.avatar}
  data-testid="user-avatar"
  src={avatarUrl}
  bindtap={handleTap}
  onLoad={handleLoad}
/>

// Avoid
<image
  bindtap={handleTap}
  src={avatarUrl}
  className={css.avatar}
  onLoad={handleLoad}
  data-testid="user-avatar"
/>
```

## Threads

- Code inside `'background only'` string literal runs on background thread
- UI updates from background thread use `setState` callbacks

## Styling

- Use CSS modules: `import * as css from './component.module.css'`
- Never use `import styles from` or bare `import './component.css'` — always `import * as css`
- Global CSS imports are allowed only for: the app entry point (e.g. `src/index.tsx`) importing tokens/reset files, and `@font-face` declarations in font components
- Write class names in kebab-case in CSS (`logo-react`), reference as camelCase in TS (`css.logoReact`)
- No inline styles — use CSS modules instead. Exception: dynamic styles computed at runtime (e.g. icon size, color) where CSS modules cannot apply
- Lynx layout engine is not identical to browser CSS — test on device

## TypeScript

- Strict mode enabled
- Use `@lynx-js/react` hooks (`useState`, `useCallback`, `useEffect`) — not React's
- Use `type` over `interface`
- Avoid `any`, type assertions (`as`, `!`), and enums (use objects or maps)
- `unknown` is acceptable only at system boundaries (user input, external APIs)

### Type Safety

**NEVER use type assertions (`as`, `!`)** — they bypass type checking.

When TypeScript complains about types:

1. Don't force it with `as` — the error is telling you something
2. Fix the root cause: use correct types from the source
3. Create typed helpers if needed, but use proper types in the signature

## Code Style

- Use `const` and immutability; avoid `let`
- Use arrow functions for direct value returns
- Minimize `if-else` and `switch`; prefer early returns
- No comments unless explaining workarounds or non-obvious logic
- Use descriptive naming instead of comments

## Naming Conventions

- **Files/folders**: kebab-case (`user-profile.tsx`)
- **Components**: PascalCase (`UserProfile`)
- **Variables**: descriptive with auxiliary verbs (`isLoaded`, `hasError`)
- **Exports**: favor named exports
- Avoid redundant naming: `user.id` not `user.userId`

## Testing

For testing conventions, see `.claude/rules/testing.md`.

## Examples

### Conditional Syntax

```ts
// Prefer
if (['.', ','].includes(e.key))

// Avoid
if (e.key === '.' || e.key === ',')
```

### Object Properties

```ts
// Prefer
const user = { id: 12, name: "Homer" }

// Avoid
const user = { userId: 12, userName: "Homer" }
```
