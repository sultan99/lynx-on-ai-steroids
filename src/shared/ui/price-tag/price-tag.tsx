import * as css from './price-tag.module.css'

type PriceTagProps = {
  price: number
}

export const PriceTag = ({ price }: PriceTagProps) => (
  <view className={css.container}>
    <text className={css.price}>${price.toFixed(2)}</text>
  </view>
)
