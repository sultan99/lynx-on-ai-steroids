import type { IconGlyph } from './glyph-map'
import { cssUnit, pickCss, useCssVars } from '@/shared/lib/css-utils'
import { glyphMap } from './glyph-map'
import * as css from './icon.module.scss'

type IconProps = {
  'data-testid'?: string
  bindtap?: () => void
  className?: string
  glyph: IconGlyph
  rotate?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const cssIcon = pickCss(css, 'icon')

export const Icon = ({
  className,
  glyph,
  rotate,
  size,
  ...rest
}: IconProps) => {
  const id = useCssVars({ rotate: cssUnit(rotate, 'deg') })

  return (
    <text {...rest} className={cssIcon({ size }, className)} id={id}>
      {glyphMap[glyph]}
    </text>
  )
}
