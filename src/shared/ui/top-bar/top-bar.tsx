import type { IconGlyph } from '../icon/glyph-map.js'
import { Icon } from '../icon/icon.js'
import * as css from './top-bar.module.scss'

type TopBarProps = {
  actionIcon?: IconGlyph
  title?: string
  onAction?: () => void
  onBack?: () => void
}

export const TopBar = ({
  actionIcon,
  title,
  onAction,
  onBack,
}: TopBarProps) => (
  <view className={css.root}>
    <view className={css.zone}>
      {onBack && <Icon glyph='chevron-left' bindtap={onBack} />}
    </view>
    {title && <text className={css.title}>{title}</text>}
    <view className={css.zone}>
      {actionIcon && onAction && <Icon glyph={actionIcon} bindtap={onAction} />}
    </view>
  </view>
)
