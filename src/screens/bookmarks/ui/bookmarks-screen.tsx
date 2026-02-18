import { BottomNavigationBar } from '@/shared/ui'
import * as css from './bookmarks-screen.module.scss'

export const BookmarksScreen = () => (
  <view className={css.screen}>
    <view className={css.content}>
      <text className={css.stubText}>Bookmarks</text>
    </view>
    <BottomNavigationBar activeTab='bookmarks' />
  </view>
)
