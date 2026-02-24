import { useState } from '@lynx-js/react'
import { categories } from '@/entities/category'
import { orders } from '@/entities/order'
import { currentUser } from '@/entities/user'
import { SearchBar, useSearch } from '@/features/search-donuts'
import { useStatusBarHeight } from '@/shared/lib/hooks/use-status-bar-height'
import {
  BottomNavigationBar,
  CategoryChip,
  Icon,
  LocationBar,
} from '@/shared/ui'
import { DonutList } from '@/widgets/donut-list'
import * as css from './home-screen.module.scss'

const order = orders[0]

export const HomeScreen = () => {
  const paddingTop = useStatusBarHeight('px')
  const [activeCategory, setActiveCategory] = useState('')
  const { handleInput, query } = useSearch()

  return (
    <view className={css.screen} style={{ paddingTop }}>
      <view className={css.header}>
        <view className={css.topRow}>
          <Icon glyph='menu' size='md' />
          <view className={css.locationBarWrapper}>
            <LocationBar
              placeholder='Your location'
              value={currentUser.location}
              onSearch={() => {}}
            />
          </view>
          <image className={css.avatar} src={currentUser.avatar} />
        </view>
        <text className={css.greeting}>Hi, {currentUser.name}</text>
        <text className={css.sectionTitle}>Recommended Items</text>
        <view className={css.categories}>
          {categories.map((cat) => (
            <CategoryChip
              icon={cat.iconGlyph}
              isActive={activeCategory === cat.id}
              key={cat.id}
              label={cat.name}
              onTap={() =>
                setActiveCategory(cat.id === activeCategory ? '' : cat.id)
              }
            />
          ))}
        </view>
      </view>
      <scroll-view className={css.scrollable} scroll-y>
        <view className={css.searchBar}>
          <SearchBar onInput={handleInput} />
        </view>
        <view className={css.scrollContent}>
          <DonutList
            categoryId={activeCategory || undefined}
            searchQuery={query || undefined}
          />

          {order && (
            <view className={css.orderCard}>
              <view className={css.orderDetails}>
                <view className={css.orderDetail}>
                  <view className={css.orderValueRow}>
                    <Icon className={css.orderIcon} glyph='clock' />
                    <text className={css.orderValue}>{order.deliveryTime}</text>
                  </view>
                  <text className={css.orderLabel}>Delivery time</text>
                </view>
                <view className={css.orderDetail}>
                  <view className={css.orderValueRow}>
                    <Icon className={css.orderIcon} glyph='flag' />
                    <text className={css.orderValue}>
                      {order.deliveryAddress}
                    </text>
                  </view>
                  <text className={css.orderLabel}>Delivery Place</text>
                </view>
              </view>
              <view className={css.divider} />
              <view className={css.courierRow}>
                <image
                  className={css.courierAvatar}
                  src={order.courier.avatar}
                />
                <view className={css.courierInfo}>
                  <text className={css.courierName}>{order.courier.name}</text>
                  <text className={css.courierLabel}>Courier</text>
                </view>
                <view className={css.phoneButton}>
                  <Icon className={css.phoneIcon} glyph='phone' />
                </view>
              </view>
            </view>
          )}
        </view>
      </scroll-view>

      <BottomNavigationBar activeTab='home' />
    </view>
  )
}
