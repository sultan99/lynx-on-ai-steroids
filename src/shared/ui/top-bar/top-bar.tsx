import type { IconGlyph } from '../icon/glyph-map'
import { Icon } from '../icon/icon'
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
    <view className={css.button}>
      {onBack && <Icon glyph='chevron-left' bindtap={onBack} />}
    </view>
    {title && <text className={css.title}>{title}</text>}
    {actionIcon && onAction && (
      <view className={css.button}>
        <Icon glyph={actionIcon} bindtap={onAction} />
      </view>
    )}
  </view>
)
