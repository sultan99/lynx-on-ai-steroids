import { Icon } from '../icon/icon.js'
import * as css from './rating.module.scss'

type RatingProps = {
  value: number
}

export const Rating = ({ value }: RatingProps) => (
  <view className={css.root}>
    <Icon className={css.star} glyph='star-filled' />
    <text className={css.value}>{value.toFixed(1)}</text>
  </view>
)
