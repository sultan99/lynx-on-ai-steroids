import { useNavigate } from '@tanstack/react-router'
import { SearchBar, useSearch } from '@/features/search-donuts'
import { useStatusBarHeight } from '@/shared/lib/hooks/use-status-bar-height'
import { TopBar } from '@/shared/ui'
import { DonutList, useDonutsData } from '@/widgets/donut-list'
import * as css from './catalog.module.scss'

export const CatalogScreen = () => {
  const paddingTop = useStatusBarHeight('px')
  const navigate = useNavigate()
  const { handleInput, query } = useSearch()
  const donuts = useDonutsData({ searchQuery: query })

  return (
    <view className={css.screen} style={{ paddingTop }}>
      <TopBar
        actionIcon='shopping-bag'
        title='Search your Flavour'
        onAction={() => navigate({ to: '/cart' })}
        onBack={() => navigate({ to: '/home' })}
      />
      <scroll-view scroll-y className={css.scrollable}>
        <view className={css.content}>
          <SearchBar placeholder='Search Food' onInput={handleInput} />
          <text className={css.title}>Found {donuts.length} Results</text>
          <DonutList searchQuery={query} />
        </view>
      </scroll-view>
    </view>
  )
}
