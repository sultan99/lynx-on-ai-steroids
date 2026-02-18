import * as css from './price-tag.module.scss'

type PriceTagProps = {
  price: number
}

export const PriceTag = ({ price }: PriceTagProps) => (
  <text className={css.root}>${price.toFixed(2)}</text>
)
