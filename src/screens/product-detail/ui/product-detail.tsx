import { useState } from '@lynx-js/react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from '@tanstack/react-router'
import { useCartStore } from '@/entities/cart'
import { donutDetailQueryOptions } from '@/entities/donut'
import { ReviewCard, reviewListQueryOptions } from '@/entities/review'
import { toPixel } from '@/shared/lib/css-utils'
import { useStatusBarHeight } from '@/shared/lib/hooks/use-status-bar-height'
import {
  ActionButton,
  Drawer,
  Info,
  QuantitySelector,
  Rating,
  TopBar,
} from '@/shared/ui'
import * as css from './product-detail.module.scss'

export const ProductDetailScreen = () => {
  const paddingTop = useStatusBarHeight('px')
  const router = useRouter()
  const { donutId } = useParams({ from: '/product/$donutId' })
  const { data: donut } = useQuery(donutDetailQueryOptions(donutId))
  const { data: reviews } = useQuery(reviewListQueryOptions(donutId))
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)

  if (!donut) return null

  const handleAddToCart = () => {
    Array.from({ length: quantity }, () => addItem(donut))
    router.history.back()
  }

  return (
    <view className={css.screen} style={{ paddingTop }}>
      <TopBar
        actionIcon='shopping-bag'
        onAction={() => router.navigate({ to: '/cart' })}
        onBack={() => router.history.back()}
      />
      <view className={css.heroContainer}>
        <image auto-size className={css.heroImage} src={donut.image} />
      </view>
      <Drawer height={toPixel('55%')}>
        <view className={css.card}>
          <view className={css.titleRow}>
            <text className={css.productName}>{donut.name}</text>
            <Rating value={donut.rating} />
          </view>
          <text className={css.description}>{donut.description}</text>
          <view className={css.detailsRow}>
            <view className={css.infoColumn}>
              <Info icon='flame'>{`${donut.calories} Calories`}</Info>
              <Info icon='clock'>{`${donut.prepTime} mins`}</Info>
              <Info icon='delivery'>{donut.deliveryType}</Info>
            </view>
            <view className={css.priceColumn}>
              <text className={css.price}>
                $ {(donut.price * quantity).toFixed(2)}
              </text>
              <QuantitySelector
                value={quantity}
                onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                onIncrement={() => setQuantity((q) => q + 1)}
              />
            </view>
          </view>
          <view className={css.divider} />
          <view className={css.reviewsHeader}>
            <text className={css.reviewsTitle}>Reviews </text>
            <text className={css.reviewsCount}>({reviews?.length ?? 0})</text>
          </view>
          {reviews?.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </view>
      </Drawer>
      <ActionButton
        className={css.fab}
        glyph='plus'
        bindtap={handleAddToCart}
      />
    </view>
  )
}
