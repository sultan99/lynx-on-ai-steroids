import type { IconGlyph } from '../icon/glyph-map.js'
import { Icon } from '../icon/icon.js'
import * as css from './category-chip.module.css'

type CategoryChipProps = {
  icon: IconGlyph
  isActive: boolean
  label: string
  onTap: () => void
}

export const CategoryChip = ({
  icon,
  isActive,
  label,
  onTap,
}: CategoryChipProps) => (
  <view
    className={isActive ? css.containerActive : css.container}
    bindtap={onTap}
  >
    <Icon
      color={isActive ? '--color-primary' : '--color-text-tertiary'}
      glyph={icon}
      size='--icon-md'
    />
    <text className={isActive ? css.labelActive : css.label}>{label}</text>
    {isActive && <view className={css.indicator} />}
  </view>
)
