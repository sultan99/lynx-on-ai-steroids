import { useNavigate } from '@tanstack/react-router'
import { pickCss } from '../../lib/css-utils'
import { Icon } from '../icon/icon'
import * as css from './bottom-navigation-bar.module.scss'

export type NavTab = 'home' | 'orders' | 'cart' | 'bookmarks' | 'profile'

type NavBarProps = {
  activeTab: NavTab
}

const cssTabIcon = pickCss(css, 'tab-icon')

export const BottomNavigationBar = ({ activeTab }: NavBarProps) => {
  const cssIcon = (tab: NavTab) => cssTabIcon({ isActive: activeTab === tab })
  const navigate = useNavigate()
  const go = (tab: NavTab) => () => navigate({ to: `/${tab}` })

  return (
    <view className={css.root}>
      <Icon
        className={cssIcon('home')}
        glyph='newspaper'
        bindtap={go('home')}
      />
      <Icon
        className={cssIcon('orders')}
        glyph='tool-case'
        bindtap={go('orders')}
      />
      <Icon
        className={css.actionButton}
        glyph='shopping-bag'
        bindtap={go('cart')}
      />
      <Icon
        className={cssIcon('bookmarks')}
        glyph='truck-electric'
        bindtap={go('bookmarks')}
      />
      <Icon
        className={cssIcon('profile')}
        glyph='user'
        bindtap={go('profile')}
      />
    </view>
  )
}
