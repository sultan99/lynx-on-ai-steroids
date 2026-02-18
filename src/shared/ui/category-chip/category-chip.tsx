import type { IconGlyph } from '../icon/glyph-map.js'
import { pickCss } from '../../lib/css-utils.js'
import { Icon } from '../icon/icon.js'
import * as css from './category-chip.module.scss'

type CategoryChipProps = {
  icon: IconGlyph
  isActive: boolean
  label: string
  onTap: () => void
}

const cssRoot = pickCss(css, 'root')
const cssIcon = pickCss(css, 'icon')
const cssLabel = pickCss(css, 'label')

export const CategoryChip = ({
  icon,
  isActive,
  label,
  onTap,
}: CategoryChipProps) => (
  <view className={cssRoot({ isActive })} bindtap={onTap}>
    <Icon className={cssIcon({ isActive })} glyph={icon} />
    <text className={cssLabel({ isActive })}>{label}</text>
    {isActive && <view className={css.indicator} />}
  </view>
)
