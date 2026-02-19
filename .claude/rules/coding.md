# Coding Conventions

## Scope

These rules apply to ALL code in the repository — `android`, `src/`,  and any other code files.

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

Lynx is NOT a browser. It has its own set of built-in elements — do not use HTML tags.

**Lynx built-in elements** (use these):

| Element | Purpose |
|---------|---------|
| `<view>` | Container (replaces `<div>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`) |
| `<text>` | Text content (replaces `<span>`, `<p>`, `<h1>`–`<h6>`, `<label>`) |
| `<image>` | Images (replaces `<img>`) |
| `<input>` | Single-line text input (native Lynx element, NOT HTML) |
| `<textarea>` | Multi-line text input (native Lynx element, NOT HTML) |
| `<scroll-view>` | Scrollable container |
| `<list>` | Virtualized list |
| `<page>` | Page-level container |
| `<frame>` | Frame container |
| `<overlay>` | Overlay positioning |

**Forbidden HTML tags** (never use): `<div>`, `<span>`, `<img>`, `<p>`, `<h1>`–`<h6>`, `<button>`, `<form>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<label>`, `<select>`, `<table>`, `<ul>`, `<ol>`, `<li>`, `<a>`

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
  data-testid='user-avatar'
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
  data-testid='user-avatar'
/>
```

## Rest Props

- Reusable components (`shared/ui`, `entities/ui`) must spread `...restProps` on the root element
- This allows consumers and tests to pass `data-testid` and other attributes without the component listing them explicitly
- Never hardcode `data-testid` inside reusable components

```tsx
type CardProps = {
  title: string
}

export const Card = ({ title, ...restProps }: CardProps) => (
  <view {...restProps}>
    <text>{title}</text>
  </view>
)
```

## Threads

- Code inside `'background only'` string literal runs on background thread
- UI updates from background thread use `setState` callbacks

## Styling

- Use CSS modules: `import * as css from './component.module.scss'`
- Never use `import styles from` or bare `import './component.scss'` — always `import * as css`
- Global CSS imports are allowed only for: the app entry point (e.g. `src/index.tsx`) importing tokens/reset files, and `@font-face` declarations in font components
- Write class names in kebab-case in CSS (`logo-react`), reference as camelCase in TS (`css.logoReact`)
- No inline styles — use CSS modules instead. Exception: dynamic styles computed at runtime (e.g. icon size, color) where CSS modules cannot apply
- Sort CSS properties alphabetically within each rule block
- Lynx layout engine is not identical to browser CSS — test on device

## Imports

- Never use file extensions in imports — write `'./foo'` not `'./foo.js'` or `'./foo.ts'`
- All source code in `src/` is TypeScript — the bundler resolves `.ts`/`.tsx` files without extensions

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
- Always use arrow functions — avoid `function` declarations
- Use implicit return (no `return` keyword) when the body is a single expression
- Arrow functions (`const`) don't hoist — declare before use
- Avoid `for`/`for...of` loops — prefer chaining array methods (`.map`, `.filter`, `.reduce`, `Object.fromEntries`, etc.)
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

### Arrow Functions

```tsx
// Prefer
const RootComponent = () => <Outlet />

const getUser = (id: string) => users.find(u => u.id === id)

// Avoid
function RootComponent() {
  return <Outlet />
}

const getUser = (id: string) => {
  return users.find(u => u.id === id)
}
```

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
