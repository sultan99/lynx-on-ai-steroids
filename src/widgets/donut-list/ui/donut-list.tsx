import { DonutList as DonutListView } from '@/entities/donut'
import { useUpdateDonutLike } from '@/features/like-donut'
import { useDonutsData } from '../lib/use-donuts-data'

type DonutListProps = Omit<JSX.IntrinsicElements['view'], 'children'> & {
  categoryId?: string
  searchQuery?: string
  onTap?: (id: string) => void
}

export const DonutList = ({
  categoryId,
  searchQuery,
  onTap,
  ...restProps
}: DonutListProps) => {
  const donuts = useDonutsData({ categoryId, searchQuery })
  const { mutate: likeDonut } = useUpdateDonutLike()

  return (
    <DonutListView
      {...restProps}
      donuts={donuts}
      onLike={likeDonut}
      onTap={onTap}
    />
  )
}
