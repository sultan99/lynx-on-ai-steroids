import type { Donut } from '../model/types'
import { joinCss } from '@/shared/lib/css-utils'
import { Icon } from '@/shared/ui/icon/icon'
import { Rating } from '@/shared/ui/rating/rating'
import * as css from './donut-card.module.scss'

type DonutCardProps = {
  donut: Donut
} & Omit<JSX.IntrinsicElements['view'], 'children'>

export const DonutCard = ({ className, donut, ...rest }: DonutCardProps) => (
  <view {...rest} className={joinCss(css.root, className)}>
    <view className={css.priceTag}>
      <text className={css.price}>${donut.price.toFixed(2)}</text>
    </view>
    <view className={css.imageContainer}>
      <image auto-size src={donut.image} />
    </view>
    <view className={css.info}>
      <text className={css.name}>{donut.name}</text>
      <text className={css.brand}>{donut.brand}</text>
    </view>
    <view className={css.footer}>
      <Icon
        className={css.favoriteIcon}
        glyph={donut.isFavorite ? 'heart-filled' : 'heart'}
      />
      <Rating value={donut.rating} />
    </view>
  </view>
)
