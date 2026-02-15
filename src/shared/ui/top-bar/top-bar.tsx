import type { IconGlyph } from '../icon/glyph-map.js'
import { Icon } from '../icon/icon.js'
import * as css from './top-bar.module.css'

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
  <view className={css.container}>
    <view className={css.zone}>
      {onBack && (
        <Icon
          data-testid='top-bar-back'
          glyph='arrow-left'
          size='--icon-md'
          bindtap={onBack}
        />
      )}
    </view>
    {title && <text className={css.title}>{title}</text>}
    <view className={css.zone}>
      {actionIcon && onAction && (
        <Icon
          data-testid='top-bar-action'
          glyph={actionIcon}
          size='--icon-md'
          bindtap={onAction}
        />
      )}
    </view>
  </view>
)
