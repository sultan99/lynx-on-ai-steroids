import { Icon } from '../icon/icon.js'
import * as css from './location-bar.module.css'

type LocationBarProps = {
  address: string
  onSearch?: () => void
}

export const LocationBar = ({ address, onSearch }: LocationBarProps) => (
  <view className={css.container}>
    <Icon color='--color-primary' glyph='location-pin' size='--icon-sm' />
    <text className={css.address}>{address}</text>
    {onSearch && (
      <Icon
        data-testid='location-bar-search'
        glyph='search'
        size='--icon-sm'
        bindtap={onSearch}
      />
    )}
  </view>
)
