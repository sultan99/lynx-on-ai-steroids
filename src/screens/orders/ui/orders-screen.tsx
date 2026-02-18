import { BottomNavigationBar } from '@/shared/ui'
import * as css from './orders-screen.module.scss'

export const OrdersScreen = () => (
  <view className={css.screen}>
    <view className={css.content}>
      <text className={css.stubText}>Orders</text>
    </view>
    <BottomNavigationBar activeTab='orders' />
  </view>
)
