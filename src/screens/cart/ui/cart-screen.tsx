import { useCallback } from '@lynx-js/react'
import { useNavigate, useRouter } from '@tanstack/react-router'
import {
  CartItemCard,
  CartSummary,
  selectSubTotal,
  useCartStore,
} from '@/entities/cart'
import { useStatusBarHeight } from '@/shared/lib/hooks/use-status-bar-height'
import { Icon } from '@/shared/ui/icon/icon'
import { TopBar } from '@/shared/ui/top-bar/top-bar'
import * as css from './cart-screen.module.scss'

const PROMO_DISCOUNT = 4
const DELIVERY_CHARGES = 0

const EmptyCart = () => (
  <view className={css.emptyState}>
    <Icon className={css.emptyIcon} glyph='shopping-bag' size='xl' />
    <text className={css.emptyTitle}>Your cart is empty</text>
    <text className={css.emptySubtitle}>
      Add some delicious donuts to get started
    </text>
  </view>
)

export const CartScreen = () => {
  const paddingTop = useStatusBarHeight('px')
  const navigate = useNavigate()
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const subTotal = useCartStore(selectSubTotal)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  const handleIncrement = useCallback(
    (donutId: string) => {
      const item = items.find((i) => i.donutId === donutId)
      if (item) updateQuantity(donutId, item.quantity + 1)
    },
    [items, updateQuantity],
  )

  const handleDecrement = useCallback(
    (donutId: string) => {
      const item = items.find((i) => i.donutId === donutId)
      if (item) updateQuantity(donutId, item.quantity - 1)
    },
    [items, updateQuantity],
  )

  const handleRemove = useCallback(
    (donutId: string) => {
      removeItem(donutId)
    },
    [removeItem],
  )

  const handleOrder = useCallback(() => {
    navigate({ to: '/orders' })
  }, [navigate])

  if (items.length === 0) {
    return (
      <view className={css.screen} style={{ paddingTop }}>
        <TopBar title='My Cart' onBack={() => router.history.back()} />
        <EmptyCart />
      </view>
    )
  }

  return (
    <view className={css.screen} style={{ paddingTop }}>
      <TopBar title='My Cart' onBack={() => router.history.back()} />
      <scroll-view className={css.scrollable} scroll-y>
        <view className={css.content}>
          {items.map((item) => (
            <CartItemCard
              data-testid={`cart-item-${item.donutId}`}
              item={item}
              key={item.donutId}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              onRemove={handleRemove}
            />
          ))}
          <view className={css.spacer}></view>
          <CartSummary
            className={css.summary}
            deliveryCharges={DELIVERY_CHARGES}
            promoDiscount={PROMO_DISCOUNT}
            subTotal={subTotal}
            onOrder={handleOrder}
          />
        </view>
      </scroll-view>
    </view>
  )
}
