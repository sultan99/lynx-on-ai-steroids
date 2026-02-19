import type { IconGlyph } from '../icon/glyph-map'
import { joinCss } from '@/shared/lib/css-utils'
import { Icon } from '../icon/icon'
import * as css from './info.module.scss'

type InfoProps = {
  children: string
  icon: IconGlyph
} & Omit<JSX.IntrinsicElements['view'], 'children'>

export const Info = ({ children, className, icon, ...rest }: InfoProps) => (
  <view {...rest} className={joinCss(css.root, className)}>
    <Icon className={css.icon} glyph={icon} />
    <text className={css.text}>{children}</text>
  </view>
)
