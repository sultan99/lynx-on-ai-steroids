# Forge Icons

Generate icon font assets from SVG files in `src/components/icon/svgs/`.

## What it generates

| File | Purpose |
|------|---------|
| `src/components/icon/icons.ttf` | TTF font file |
| `src/components/icon/glyph-map.ts` | Glyph map (`{ 'user': '\uE001' }`) + `IconGlyph` union type |

## What it does NOT modify

- `src/components/icon/icon.tsx` — the Icon component is hand-written
- `src/styles/tokens.css` — design tokens are managed separately

## Steps

### Step 1: Verify SVG files exist

```bash
ls src/components/icon/svgs/*.svg
```

If no SVGs found, inform the developer and stop.

### Step 2: Run the generation script

```bash
node .claude/skills/forge/generate-icons.mjs
```

This scans `src/components/icon/svgs/`, generates the TTF font and glyph map with TypeScript types.

### Step 3: Verify output

```bash
ls src/components/icon/icons.ttf src/components/icon/glyph-map.ts
```

Confirm both files were generated.

### Step 4: Show results

Read `src/components/icon/glyph-map.ts` and show the developer:
- Number of icons generated
- List of glyph names
- The `IconGlyph` type

### Adding new icons

To add a new icon:
1. Drop an SVG file into `src/components/icon/svgs/` (use kebab-case filename)
2. Run `/forge icons` again
