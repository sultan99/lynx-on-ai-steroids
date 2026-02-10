# Coding Conventions

## General Principles

- Prioritize readability, maintainability, and simplicity
- Prefer concise solutions: less code, fewer elements, minimal CSS
- Favor functional and declarative patterns; avoid classes
- Avoid deep nesting in code or markup
- Keep functions under 200 lines; split into smaller units
- Don't create utility functions for simple one-liners — use library functions directly

## Lynx Elements

- Use `<view>`, `<text>`, `<image>` — never HTML tags (`<div>`, `<span>`, `<img>`)
- Use `bindtap` for tap handlers, not `onClick`
- Use `className` for styling
- Avoid unnecessary wrapper `<view>` elements; use the fewest elements possible
- Use `flex` + `gap` for spacing between elements; avoid margins for gaps

## Threads

- Code inside `'background only'` string literal runs on background thread
- UI updates from background thread use `setState` callbacks

## Styling

- Use CSS modules: `import * as css from './component.module.css'`
- Write class names in kebab-case in CSS (`logo-react`), reference as camelCase in TS (`css.logoReact`)
- Lynx layout engine is not identical to browser CSS — test on device

## TypeScript

- Strict mode enabled
- Use `@lynx-js/react` hooks (`useState`, `useCallback`, `useEffect`) — not React's
- Use `type` over `interface`
- Avoid `any`, `unknown`, type assertions (`as`, `!`)
- Avoid enums; use objects or maps instead

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
