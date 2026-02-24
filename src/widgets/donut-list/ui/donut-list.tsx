import { DonutList as DonutListView } from '@/entities/donut'
import { useLikeDonut } from '@/features/favorite-donut'
import { useDonuts } from '../lib/use-donuts'

type DonutListProps = Omit<JSX.IntrinsicElements['view'], 'children'> & {
  categoryId?: string
  searchQuery?: string
}

export const DonutList = ({
  categoryId,
  searchQuery,
  ...restProps
}: DonutListProps) => {
  const donuts = useDonuts({ categoryId, searchQuery })
  const { mutate: likeDonut } = useLikeDonut()

  return <DonutListView {...restProps} donuts={donuts} onLike={likeDonut} />
}
