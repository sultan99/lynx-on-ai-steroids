import { DonutCard } from '@/entities/donut'
import { useToggleDonutFavorite } from '@/features/favorite-donut'
import { joinCss } from '@/shared/lib/css-utils'
import { useDonuts } from '../lib/use-donuts'
import * as css from './donut-list.module.scss'

type DonutListProps = Omit<JSX.IntrinsicElements['view'], 'children'>

export const DonutList = ({ className, ...restProps }: DonutListProps) => {
  const donuts = useDonuts()
  const { mutate: toggleFavorite } = useToggleDonutFavorite()

  return (
    <view {...restProps} className={joinCss(css.grid, className)}>
      {donuts.map((donut) => (
        <DonutCard donut={donut} key={donut.id} onLike={toggleFavorite} />
      ))}
    </view>
  )
}
