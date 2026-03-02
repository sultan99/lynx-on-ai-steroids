import type { IconGlyph } from '../icon/glyph-map'
import { joinCss } from '@/shared/lib/css-utils'
import { Icon } from '../icon/icon'
import * as css from './top-bar.module.scss'

type TopBarProps = {
  actionIcon?: IconGlyph
  className?: string
  title?: string
  onAction?: () => void
  onBack?: () => void
}

export const TopBar = ({
  actionIcon,
  className,
  title,
  onAction,
  onBack,
}: TopBarProps) => (
  <view className={joinCss(css.root, className)}>
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
