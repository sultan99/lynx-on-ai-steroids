import { Icon } from '../icon/icon.js'
import * as css from './quantity-selector.module.css'

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
  <view className={css.container}>
    <view className={css.button} bindtap={onDecrement}>
      <Icon color='--color-primary' glyph='minus' size='--icon-sm' />
    </view>
    <text className={css.count}>{value}</text>
    <view className={css.button} bindtap={onIncrement}>
      <Icon color='--color-primary' glyph='plus' size='--icon-sm' />
    </view>
  </view>
)
