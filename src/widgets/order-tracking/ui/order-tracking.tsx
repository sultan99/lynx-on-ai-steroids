import { Drawer } from '@/shared/ui'
import { useOrderData } from '../lib/use-order-data'
import { CourierCard } from './courier-card'
import { DeliveryInfoBar } from './delivery-info-bar'
import { DeliveryMap } from './delivery-map'
import * as css from './order-tracking.module.scss'

type OrderTrackingProps = {
  orderId: string
  onBack: () => void
}

export const OrderTracking = ({ orderId, onBack }: OrderTrackingProps) => {
  const order = useOrderData(orderId)

  if (!order) return null

  return (
    <view className={css.root}>
      <DeliveryMap estimatedTime={order.estimatedTime} onBack={onBack} />
      <Drawer>
        <view className={css.card}>
          <DeliveryInfoBar
            address={order.deliveryAddress}
            time={order.deliveryTime}
          />
          <view className={css.divider} />
          <CourierCard courier={order.courier} />
        </view>
      </Drawer>
    </view>
  )
}
