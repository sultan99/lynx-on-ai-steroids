# Copilot Review Instructions

This is a ReactLynx cross-platform app. Lynx is NOT HTML — it has its own elements and layout engine.

## Rules

All coding conventions and testing standards are defined in:

- `.claude/rules/coding.md` — coding conventions, Lynx elements, TypeScript, styling, naming
- `.claude/rules/testing.md` — testing standards, imports, patterns
- `.claude/rules/state-boundaries.md` — state & data management boundaries (TanStack Query, Zustand, Router)

Read and apply these rules when reviewing pull requests.

## Requirement Verification

- Verify the implementation matches the linked GitHub issue requirements
- Check that acceptance criteria from the issue are covered
- Flag scope creep — changes unrelated to the issue

## Key Things to Flag

These are the most common mistakes reviewers should catch in this project:

- HTML elements (`<div>`, `<span>`, `<img>`, `<p>`, `<button>`, `<input>`) — must use `<view>`, `<text>`, `<image>`
- `onClick` — must use `bindtap`
- Hooks imported from `react` — must come from `@lynx-js/react`
- Type assertions (`as`, `!`), `any`, `enum`, `interface`
- Wrong CSS module imports (`import styles from` or bare `import './x.css'`) — exception: global CSS is allowed for app entry point (tokens/reset) and `@font-face` declarations
- Test imports from `@testing-library/react` — must use `@lynx-js/react/testing-library`
- Missing tests for new features or bug fixes
- Inline styles — must use CSS modules. Exception: dynamic styles computed at runtime (e.g. icon size, color)
