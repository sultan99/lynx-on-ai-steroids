import type { IconGlyph } from '@/shared/ui/icon/glyph-map'
import { useState } from '@lynx-js/react'
import { useNavigate } from '@tanstack/react-router'
import { DonutCard, donuts } from '@/entities/donut'
import { useStatusBarHeight } from '@/shared/lib/hooks/use-status-bar-height'
import {
  BottomNavigationBar,
  CategoryChip,
  Icon,
  LocationBar,
  PriceTag,
  QuantitySelector,
  Rating,
  TopBar,
} from '@/shared/ui'
import * as css from './profile-screen.module.scss'

const allIcons: IconGlyph[] = [
  'chart-gantt',
  'chevron-left',
  'clock',
  'cross',
  'delivery',
  'flag',
  'flame',
  'heart',
  'heart-filled',
  'map-pin',
  'menu',
  'minus',
  'newspaper',
  'phone',
  'plus',
  'search',
  'settings',
  'shopping-bag',
  'star',
  'star-filled',
  'tool-case',
  'truck-electric',
  'user',
]

export const ProfileScreen = () => {
  const paddingTop = useStatusBarHeight('px')
  const navigate = useNavigate()
  const [activeChip, setActiveChip] = useState('classic')
  const [quantity, setQuantity] = useState(2)

  return (
    <view className={css.screen} style={{ paddingTop }}>
      <TopBar
        actionIcon='settings'
        title='Profile'
        onAction={() => {}}
        onBack={() => navigate({ to: '/home' })}
      />

      <scroll-view className={css.scrollable} scroll-y>
        <view className={css.scrollContent}>
          <view className={css.section}>
            <text className={css.sectionTitle}>Icon</text>
            <view className={css.card}>
              <view className={css.avatarSection}>
                <view className={css.avatarCircle}>
                  <Icon glyph='user' size='lg' />
                </view>
                <text className={css.userName}>Jane Doe</text>
                <text className={css.userEmail}>jane.doe@email.com</text>
              </view>
              <view className={css.iconsGrid}>
                {allIcons.map((glyph) => (
                  <view className={css.iconCell} key={glyph}>
                    <Icon glyph={glyph} size='md' />
                    <text className={css.iconName}>{glyph}</text>
                  </view>
                ))}
              </view>
            </view>
          </view>

          <view className={css.section}>
            <text className={css.sectionTitle}>LocationBar</text>
            <view className={css.card}>
              <LocationBar
                placeholder='Enter your address'
                value=''
                onSearch={() => {}}
              />
            </view>
          </view>

          <view className={css.section}>
            <text className={css.sectionTitle}>Rating & PriceTag</text>
            <view className={css.card}>
              <view className={css.statsRow}>
                <view className={css.statItem}>
                  <Rating value={4.8} />
                  <text className={css.statLabel}>Rating</text>
                </view>
                <view className={css.statItem}>
                  <PriceTag price={142.5} />
                  <text className={css.statLabel}>PriceTag</text>
                </view>
              </view>
            </view>
          </view>

          <view className={css.section}>
            <text className={css.sectionTitle}>CategoryChip</text>
            <view className={css.card}>
              <view className={css.chipsRow}>
                <CategoryChip
                  icon='donut-classic'
                  isActive={activeChip === 'classic'}
                  label='Classic'
                  onTap={() => setActiveChip('classic')}
                />
                <CategoryChip
                  icon='donut-filled'
                  isActive={activeChip === 'filled'}
                  label='Filled'
                  onTap={() => setActiveChip('filled')}
                />
                <CategoryChip
                  icon='donut-fruity'
                  isActive={activeChip === 'fruity'}
                  label='Fruity'
                  onTap={() => setActiveChip('fruity')}
                />
                <CategoryChip
                  icon='donut-decadent'
                  isActive={activeChip === 'decadent'}
                  label='Decadent'
                  onTap={() => setActiveChip('decadent')}
                />
                <CategoryChip
                  icon='donut-nutty'
                  isActive={activeChip === 'nutty'}
                  label='Nutty'
                  onTap={() => setActiveChip('nutty')}
                />
              </view>
            </view>
          </view>

          <view className={css.section}>
            <text className={css.sectionTitle}>DonutCard</text>
            <view className={css.donutGrid}>
              {donuts.map((donut) => (
                <DonutCard donut={donut} key={donut.id} />
              ))}
            </view>
          </view>

          <view className={css.section}>
            <text className={css.sectionTitle}>QuantitySelector</text>
            <view className={css.card}>
              <view className={css.quantityRow}>
                <text className={css.quantityLabel}>Items per order</text>
                <QuantitySelector
                  value={quantity}
                  onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                  onIncrement={() => setQuantity((q) => q + 1)}
                />
              </view>
            </view>
          </view>
        </view>
      </scroll-view>

      <BottomNavigationBar activeTab='profile' />
    </view>
  )
}
