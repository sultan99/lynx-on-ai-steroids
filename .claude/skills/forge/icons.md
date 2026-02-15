# Forge Icons

Generate icon font assets from SVG files in `src/shared/ui/icon/svgs/`.

## What it generates

| File | Purpose |
|------|---------|
| `src/shared/ui/icon/icons.ttf` | TTF font file |
| `src/shared/ui/icon/glyph-map.ts` | Glyph map (`{ 'user': '\uE001' }`) + `IconGlyph` union type |

## What it does NOT modify

- `src/shared/ui/icon/icon.tsx` — the Icon component is hand-written
- `src/styles/tokens.css` — design tokens are managed separately

## Steps

### Step 1: Verify SVG files exist

```bash
ls src/shared/ui/icon/svgs/*.svg
```

If no SVGs found, inform the developer and stop.

### Step 2: Run the generation script

```bash
node .claude/skills/forge/generate-icons.mjs
```

This scans `src/shared/ui/icon/svgs/`, generates the TTF font and glyph map with TypeScript types.

### Step 3: Verify output

```bash
ls src/shared/ui/icon/icons.ttf src/shared/ui/icon/glyph-map.ts
```

Confirm both files were generated.

### Step 4: Show results

Read `src/shared/ui/icon/glyph-map.ts` and show the developer:
- Number of icons generated
- List of glyph names
- The `IconGlyph` type

### Adding new icons

To add a new icon:
1. Drop an SVG file into `src/shared/ui/icon/svgs/` (use kebab-case filename)
2. Run `/forge icons` again
