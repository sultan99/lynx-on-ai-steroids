import { Icon } from '../icon/icon.js'
import * as css from './rating.module.css'

type RatingProps = {
  value: number
}

export const Rating = ({ value }: RatingProps) => (
  <view className={css.container}>
    <Icon color='--color-accent-star' glyph='star-filled' size='--icon-sm' />
    <text className={css.value}>{value.toFixed(1)}</text>
  </view>
)
