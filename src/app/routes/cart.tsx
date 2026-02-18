import { createFileRoute } from '@tanstack/react-router'
import { CartScreen } from '@/screens/cart'

export const Route = createFileRoute('/cart')({
  component: CartScreen,
})
