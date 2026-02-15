import type { IconGlyph } from './glyph-map.js'
import { glyphMap } from './glyph-map.js'
import './icon.css'

type IconProps = {
  'data-testid'?: string
  className?: string
  color?: string
  glyph: IconGlyph
  isVisible?: boolean
  rotate?: number
  size?: string | number
}

export const resolveValue = (value: string | number): string => {
  if (typeof value === 'number') return `${value}px`
  if (value.startsWith('--')) return `var(${value})`
  return value
}

export const Icon = ({
  className,
  color,
  glyph,
  isVisible = true,
  rotate,
  size = '16px',
  ...rest
}: IconProps) => {
  if (!isVisible) return null

  const style: Record<string, string> = { fontFamily: 'icons' }

  if (size) {
    const resolved = resolveValue(size)
    style.fontSize = resolved
    style.width = resolved
    style.height = resolved
  }
  if (color) style.color = resolveValue(color)
  if (rotate !== undefined) style.transform = `rotate(${rotate}deg)`

  return (
    <text {...rest} className={className} style={style}>
      {glyphMap[glyph]}
    </text>
  )
}
