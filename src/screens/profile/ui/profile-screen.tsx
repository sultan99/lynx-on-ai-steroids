import { BottomNavigationBar } from '@/shared/ui'
import * as css from './profile-screen.module.scss'

export const ProfileScreen = () => (
  <view className={css.screen}>
    <view className={css.content}>
      <text className={css.stubText}>Profile</text>
    </view>
    <BottomNavigationBar activeTab='/profile' />
  </view>
)
