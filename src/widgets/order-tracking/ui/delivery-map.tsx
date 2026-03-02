import { TopBar } from '@/shared/ui'
import * as css from './delivery-map.module.scss'

const MAPS_API_KEY = process.env.MAPS_API_KEY ?? ''
const ORIGIN = '40.7282,-74.0046'
const DESTINATION = '40.7195,-73.9973'

const mapUrl = [
  'https://maps.googleapis.com/maps/api/staticmap?',
  'center=40.7235,-74.0010',
  '&zoom=15',
  '&size=350x800',
  '&scale=2',
  '&style=feature:all|element:geometry|color:0xf0f0f0',
  '&style=feature:all|element:labels|visibility:off',
  '&style=feature:road|element:geometry.fill|color:0xffffff',
  '&style=feature:road|element:geometry.stroke|color:0xe8e8e8',
  '&style=feature:water|element:geometry|color:0xe0e0e0',
  `&path=color:0xFF4A4Cff|weight:5|${ORIGIN}|40.7265,-74.0025|40.7245,-73.9995|40.7225,-74.0015|40.7205,-73.9985|${DESTINATION}`,
  `&markers=color:red|${ORIGIN}`,
  `&markers=color:red|size:small|${DESTINATION}`,
  `&key=${MAPS_API_KEY}`,
].join('')

type DeliveryMapProps = {
  estimatedTime: number
  onBack: () => void
}

export const DeliveryMap = ({ estimatedTime, onBack }: DeliveryMapProps) => (
  <view className={css.root}>
    <TopBar className={css.topBar} onBack={onBack} />
    <image auto-size className={css.mapImage} src={mapUrl} />

    <view className={css.etaBadge}>
      <view className={css.etaPill}>
        <text className={css.etaNumber}>{estimatedTime}</text>
        <text className={css.etaUnit}>MIN</text>
      </view>
      <text className={css.etaLabel}>Estimated Time</text>
    </view>
  </view>
)
