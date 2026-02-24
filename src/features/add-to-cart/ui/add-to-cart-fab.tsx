import type { Donut } from '@/entities/donut'
import { useCartStore } from '@/entities/cart'
import { Icon } from '@/shared/ui/icon/icon'
import * as css from './add-to-cart-fab.module.scss'

type AddToCartFabProps = {
  donut: Donut
} & Omit<JSX.IntrinsicElements['view'], 'children'>

export const AddToCartFab = ({
  className,
  donut,
  ...restProps
}: AddToCartFabProps) => {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <view
      {...restProps}
      className={[css.fab, className].filter(Boolean).join(' ')}
      bindtap={() => addItem(donut)}
    >
      <Icon className={css.icon} glyph='plus' />
    </view>
  )
}
