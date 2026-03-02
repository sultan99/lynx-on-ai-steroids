import { Icon } from '@/shared/ui'
import * as css from './delivery-info-bar.module.scss'

type DeliveryInfoBarProps = {
  address: string
  time: string
}

export const DeliveryInfoBar = ({ address, time }: DeliveryInfoBarProps) => (
  <view className={css.root}>
    <view className={css.item}>
      <Icon className={css.icon} glyph='clock' />
      <view className={css.texts}>
        <text className={css.value}>{time}</text>
        <text className={css.label}>Delivery time</text>
      </view>
    </view>
    <view className={css.item}>
      <Icon className={css.icon} glyph='flag' />
      <view className={css.texts}>
        <text className={css.value}>{address}</text>
        <text className={css.label}>Delivery Place</text>
      </view>
    </view>
  </view>
)
