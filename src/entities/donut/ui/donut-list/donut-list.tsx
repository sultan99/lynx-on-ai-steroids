import type { Donut } from '../../model/types'
import { joinCss } from '@/shared/lib/css-utils'
import { DonutCard } from '../donut-card/donut-card'
import * as css from './donut-list.module.scss'

type DonutListProps = Omit<JSX.IntrinsicElements['view'], 'children'> & {
  donuts: Donut[]
  onLike?: (id: string) => void
}

export const DonutList = ({
  className,
  donuts,
  onLike,
  ...restProps
}: DonutListProps) => (
  <view {...restProps} className={joinCss(css.grid, className)}>
    {donuts.map((donut) => (
      <DonutCard donut={donut} key={donut.id} onLike={onLike} />
    ))}
  </view>
)
