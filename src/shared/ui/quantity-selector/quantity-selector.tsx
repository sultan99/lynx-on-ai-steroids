import { Icon } from '../icon/icon'
import * as css from './quantity-selector.module.scss'

type QuantitySelectorProps = {
  value: number
  onDecrement: () => void
  onIncrement: () => void
}

export const QuantitySelector = ({
  value,
  onDecrement,
  onIncrement,
}: QuantitySelectorProps) => (
  <view className={css.root}>
    <view className={css.button} bindtap={onDecrement}>
      <Icon className={css.icon} glyph='minus' />
    </view>
    <text className={css.count}>{value}</text>
    <view className={css.button} bindtap={onIncrement}>
      <Icon className={css.icon} glyph='plus' />
    </view>
  </view>
)
