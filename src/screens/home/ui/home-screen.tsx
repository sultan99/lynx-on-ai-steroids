import { BottomNavigationBar } from '@/shared/ui'
import * as css from './home-screen.module.scss'

export const HomeScreen = () => (
  <view className={css.screen}>
    <view className={css.content}>
      <text className={css.stubText}>Home</text>
    </view>
    <BottomNavigationBar activeTab='home' />
  </view>
)
