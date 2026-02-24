import type { IconProps } from '../icon/icon'
import { joinCss } from '../../lib/css-utils'
import { Icon } from '../icon/icon'
import * as css from './action-button.module.scss'

type ActionButtonProps = IconProps

export const ActionButton = ({
  className,
  ...restProps
}: ActionButtonProps) => (
  <Icon {...restProps} className={joinCss(css.root, className)} />
)
