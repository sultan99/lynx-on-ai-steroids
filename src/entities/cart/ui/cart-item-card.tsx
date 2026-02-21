import type { CartItem as CartItemType } from '../model/types'
import { joinCss } from '@/shared/lib/css-utils'
import { Icon } from '@/shared/ui/icon/icon'
import { Info } from '@/shared/ui/info/info'
import { QuantitySelector } from '@/shared/ui/quantity-selector/quantity-selector'
import { Rating } from '@/shared/ui/rating/rating'
import * as css from './cart-item-card.module.scss'

type CartItemProps = {
  item: CartItemType
  onDecrement: (donutId: string) => void
  onIncrement: (donutId: string) => void
  onRemove: (donutId: string) => void
} & Omit<JSX.IntrinsicElements['view'], 'children'>

export const CartItemCard = ({
  className,
  item,
  onDecrement,
  onIncrement,
  onRemove,
  ...restProps
}: CartItemProps) => (
  <view {...restProps} className={joinCss(css.root, className)}>
    <image className={css.image} src={item.donut.image} />
    <view className={css.content}>
      <view className={css.header}>
        <text className={css.name}>{item.donut.name}</text>
        <Icon
          className={css.closeIcon}
          glyph='cross'
          bindtap={() => onRemove(item.donutId)}
        />
      </view>
      <view className={css.meta}>
        <Rating value={item.donut.rating} />
        <Info icon='truck-electric'>{item.donut.deliveryType}</Info>
      </view>
      <view className={css.footer}>
        <QuantitySelector
          value={item.quantity}
          onDecrement={() => onDecrement(item.donutId)}
          onIncrement={() => onIncrement(item.donutId)}
        />
        <text className={css.price}>
          $ {(item.donut.price * item.quantity).toFixed(2)}
        </text>
      </view>
    </view>
  </view>
)
