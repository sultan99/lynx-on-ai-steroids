import svgFixer from 'oslllo-svg-fixer'
import svgToFont from 'svgtofont'
import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../../..')
const outputDir = resolve(root, 'src/components/icon')
const inputDir = resolve(outputDir, 'svgs')
const tmpDir = resolve(outputDir, '.tmp')

const svgFiles = readdirSync(inputDir).filter((f) => f.endsWith('.svg'))

if (svgFiles.length === 0) {
  console.error('No SVG files found in src/components/icon/svgs/')
  process.exit(1)
}

const fixedDir = join(tmpDir, 'fixed')
mkdirSync(fixedDir, { recursive: true })
await svgFixer(inputDir, fixedDir).fix()

await svgToFont({
  src: fixedDir,
  dist: tmpDir,
  fontName: 'icons',
  css: false,
  startUnicode: 0xe001,
  svgicons2svgfont: {
    fontHeight: 512,
    normalize: true,
    round: 10e12,
  },
  outSVGPath: false,
  outSVGReact: false,
  outSVGReactNative: false,
  generateInfoData: true,
})

const info = JSON.parse(readFileSync(join(tmpDir, 'info.json'), 'utf8'))

copyFileSync(join(tmpDir, 'icons.ttf'), join(outputDir, 'icons.ttf'))
rmSync(tmpDir, { recursive: true, force: true })

const entries = Object.entries(info)
  .map(([name, data]) => {
    const hex = data.encodedCode.replace('\\', '')
    const codePoint = Number.parseInt(hex, 16)
    return [name, codePoint]
  })
  .sort(([a], [b]) => a.localeCompare(b))

const glyphMapEntries = entries
  .map(
    ([name, code]) =>
      `  '${name}': '\\u${code.toString(16).toUpperCase().padStart(4, '0')}'`,
  )
  .join(',\n')

const glyphUnion = entries.map(([name]) => `'${name}'`).join(' | ')

const glyphMapTs = `export type IconGlyph = ${glyphUnion}

export const glyphMap: Record<IconGlyph, string> = {
${glyphMapEntries},
}
`

writeFileSync(join(outputDir, 'glyph-map.ts'), glyphMapTs)

execSync(
  `npx biome format --write "${join(outputDir, 'glyph-map.ts')}"`,
  { cwd: root, stdio: 'ignore' },
)

console.log(
  `✅ Generated ${entries.length} icons:`,
  entries.map(([n]) => n).join(', '),
)
