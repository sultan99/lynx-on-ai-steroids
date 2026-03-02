import { useParams, useRouter } from '@tanstack/react-router'
import { useStatusBarHeight } from '@/shared/lib/hooks/use-status-bar-height'
import { OrderTracking } from '@/widgets/order-tracking'
import * as css from './order-tracking.module.scss'

export const OrderTrackingScreen = () => {
  const paddingTop = useStatusBarHeight('px')
  const router = useRouter()
  const { orderId } = useParams({ from: '/order/$orderId' })

  return (
    <view className={css.screen} style={{ paddingTop }}>
      <OrderTracking orderId={orderId} onBack={() => router.history.back()} />
    </view>
  )
}
