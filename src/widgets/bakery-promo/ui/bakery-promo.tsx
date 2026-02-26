import { useState } from '@lynx-js/react'
import { BakeryPromo as BakeryPromoView } from '@/entities/bakery'
import { useBakeriesData } from '../lib/use-bakeries-data'
import * as css from './bakery-promo.module.scss'

type BakeryPromoSectionProps = Omit<JSX.IntrinsicElements['view'], 'children'>

export const BakeryPromoSection = (restProps: BakeryPromoSectionProps) => {
  const bakeries = useBakeriesData()
  const [index] = useState(() => Math.floor(Math.random() * bakeries.length))
  const bakery = bakeries[index]

  if (!bakery) return null

  return (
    <view {...restProps} className={css.root}>
      <text className={css.title}>Popular Bakeries</text>
      <BakeryPromoView bakery={bakery} />
    </view>
  )
}
