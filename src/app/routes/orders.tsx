import { createFileRoute } from '@tanstack/react-router'
import { OrdersScreen } from '@/screens/orders'

export const Route = createFileRoute('/orders')({
  component: OrdersScreen,
})
