import { useState } from '@lynx-js/react'
import { useStatusBarHeight } from '@/shared/lib/hooks/use-status-bar-height'
import { BottomNavigationBar } from '@/shared/ui'
import { BakeryPromoSection } from '@/widgets/bakery-promo'
import { DonutList } from '@/widgets/donut-list'
import { TopBar } from '@/widgets/top-bar'
import { DonutFilters } from './donut-filters'
import * as css from './home-screen.module.scss'

export const HomeScreen = () => {
  const paddingTop = useStatusBarHeight('px')
  const [activeCategory, setActiveCategory] = useState('')

  return (
    <view className={css.screen} style={{ paddingTop }}>
      <TopBar />
      <scroll-view className={css.scrollable} scroll-y>
        <DonutFilters
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <view className={css.content}>
          <BakeryPromoSection />
          <DonutList categoryId={activeCategory || undefined} />
        </view>
      </scroll-view>
      <BottomNavigationBar activeTab='home' />
    </view>
  )
}
