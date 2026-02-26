import { CategoryFilter } from '@/widgets/category-filter'
import { useUserData } from '@/widgets/top-bar'
import * as css from './donut-filters.module.scss'

type DonutFiltersProps = {
  activeCategory: string
  onSelect: (id: string) => void
}

export const DonutFilters = ({
  activeCategory,
  onSelect,
}: DonutFiltersProps) => {
  const user = useUserData()

  return (
    <view className={css.root}>
      <text className={css.greeting}>Hi, {user?.name}</text>
    <text className={css.heading}>Filter Donuts</text>
    <CategoryFilter activeId={activeCategory} onSelect={onSelect} />
    </view>
  )
}
