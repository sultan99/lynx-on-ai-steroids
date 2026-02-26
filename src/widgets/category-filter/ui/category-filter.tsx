import { CategoryChip } from '@/shared/ui'
import { useCategoriesData } from '../lib/use-categories-data'
import * as css from './category-filter.module.scss'

type CategoryFilterProps = Omit<JSX.IntrinsicElements['view'], 'children'> & {
  activeId: string
  onSelect: (id: string) => void
}

export const CategoryFilter = ({
  activeId,
  onSelect,
  ...restProps
}: CategoryFilterProps) => {
  const categories = useCategoriesData()

  return (
    <scroll-view {...restProps} className={css.root} scroll-x>
      {categories.map((cat) => (
        <CategoryChip
          icon={cat.iconGlyph}
          isActive={activeId === cat.id}
          key={cat.id}
          label={cat.name}
          onTap={() => onSelect(cat.id === activeId ? '' : cat.id)}
        />
      ))}
    </scroll-view>
  )
}
