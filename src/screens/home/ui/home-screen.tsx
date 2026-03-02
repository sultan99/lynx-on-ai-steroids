import { useState } from '@lynx-js/react'
import { useNavigate } from '@tanstack/react-router'
import { useStatusBarHeight } from '@/shared/lib/hooks/use-status-bar-height'
import { BottomNavigationBar } from '@/shared/ui'
import { BakeryPromoSection } from '@/widgets/bakery-promo'
import { CategoryFilter } from '@/widgets/category-filter'
import { DonutList } from '@/widgets/donut-list'
import { TopBar, useUserData } from '@/widgets/top-bar'
import * as css from './home-screen.module.scss'

export const HomeScreen = () => {
  const paddingTop = useStatusBarHeight('px')
  const navigate = useNavigate()
  const user = useUserData()
  const [activeCategory, setActiveCategory] = useState('')

  const handleDonutTap = (donutId: string) => {
    navigate({ to: '/product/$donutId', params: { donutId } })
  }

  return (
    <view className={css.screen} style={{ paddingTop }}>
      <TopBar />
      <scroll-view className={css.scrollable} scroll-y>
        <view className={css.filters}>
          <text className={css.greeting}>Hi, {user?.name}</text>
          <text className={css.heading}>Filter Donuts</text>
          <CategoryFilter
            activeId={activeCategory}
            onSelect={setActiveCategory}
          />
        </view>
        <view className={css.content}>
          <BakeryPromoSection />
          <DonutList
            categoryId={activeCategory || undefined}
            onTap={handleDonutTap}
          />
        </view>
      </scroll-view>
      <BottomNavigationBar activeTab='/home' />
    </view>
  )
}
