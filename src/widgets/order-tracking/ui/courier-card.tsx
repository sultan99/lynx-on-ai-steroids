import type { Courier } from '@/entities/order'
import { Icon } from '@/shared/ui'
import * as css from './courier-card.module.scss'

type CourierCardProps = {
  courier: Courier
}

export const CourierCard = ({ courier }: CourierCardProps) => (
  <view className={css.root}>
    <image className={css.avatar} src={courier.avatar} />
    <view className={css.info}>
      <text className={css.name}>{courier.name}</text>
      <text className={css.role}>Courier</text>
    </view>
    <view className={css.phoneButton} data-testid='phone-button'>
      <Icon className={css.phoneIcon} glyph='phone' />
    </view>
  </view>
)
