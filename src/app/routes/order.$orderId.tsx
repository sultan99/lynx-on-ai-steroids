import { createFileRoute } from '@tanstack/react-router'
import { orderDetailQueryOptions } from '@/entities/order'
import { OrderTrackingScreen } from '@/screens/order-tracking'

export const Route = createFileRoute('/order/$orderId')({
  component: OrderTrackingScreen,
  loader: ({ context: { queryClient }, params: { orderId } }) =>
    queryClient.ensureQueryData(orderDetailQueryOptions(orderId)),
})
