import type { Donut } from '@/entities/donut'
import { useCartStore } from '@/entities/cart'
import { ActionButton } from '@/shared/ui/action-button/action-button'

type CartAddButtonProps = {
  donut: Donut
}

export const CartAddButton = ({ donut }: CartAddButtonProps) => {
  const addItem = useCartStore((state) => state.addItem)

  return <ActionButton glyph='plus' bindtap={() => addItem(donut)} />
}
