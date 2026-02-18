# DeepSource Rules

These rules apply to ALL DeepSource operations.

## Lynx False Positives

These issue codes are false positives in a ReactLynx project. Always tag them `[SKIP]`:

| Issue Code | Why False Positive |
|---|---|
| JS-0455 | `bindtap` is a valid Lynx event handler, not an unknown property |
| JS-C1003 | CSS modules use `import * as css from './file.module.scss'` per coding rules; default imports are disallowed |
| JS-0417 | Inline callbacks are acceptable in test files |
| JS-0255 | ReactLynx test callbacks are not Node.js error-first callbacks |
| JS-R1004 | `toMatchInlineSnapshot` requires template literals by Vitest API design |

## Evaluation Criteria

**Fix** if the issue affects:
- Correctness (bugs, logic errors)
- Security (injection, leaks)
- Performance (unnecessary re-renders, expensive operations)
- TypeScript strictness (missing types, unsafe casts)

**Skip** if:
- File is generated (see `CLAUDE.md > Generated Files`)
- Issue contradicts project coding rules (`.claude/rules/coding.md`)
- Issue matches a known false positive above
- Issue is purely stylistic with no impact

## Restrictions

- Never commit or push without explicit developer permission
- Never suppress an issue in `.deepsource.toml` without permission
