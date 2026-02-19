import type { Bakery } from '../model/types'
import { joinCss } from '@/shared/lib/css-utils'
import { Info } from '@/shared/ui/info/info'
import { Rating } from '@/shared/ui/rating/rating'
import * as css from './bakery-promo.module.scss'

type BakeryPromoProps = {
  bakery: Bakery
  onOrder?: (orderLink: string) => void
} & Omit<JSX.IntrinsicElements['view'], 'children'>

export const BakeryPromo = ({
  bakery,
  className,
  onOrder,
  ...rest
}: BakeryPromoProps) => (
  <view {...rest} className={joinCss(css.root, className)}>
    <view className={css.banner}>
      <view className={css.logoPlaceholder} />
      <view className={css.logo}>
        <image auto-size src={bakery.logo} />
      </view>
      <view className={css.promo}>
        <text className={css.promoText}>{bakery.promoText}</text>
        <view
          className={css.orderButton}
          bindtap={() => onOrder?.(bakery.orderLink)}
        >
          <text className={css.orderButtonText}>Order Now</text>
        </view>
      </view>
      <image auto-size className={css.promoImage} src={bakery.promoImage} />
    </view>
    <view className={css.details}>
      <text className={css.brandName}>{bakery.name}</text>
      <Rating value={bakery.rating} />
      <Info icon='clock'>{`${bakery.deliveryTime} min`}</Info>
    </view>
  </view>
)
