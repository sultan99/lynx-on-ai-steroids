import { Icon, LocationBar } from '@/shared/ui'
import { useUserData } from '../lib/use-user-data'
import * as css from './top-bar.module.scss'

type TopBarProps = Omit<JSX.IntrinsicElements['view'], 'children'>

export const TopBar = (restProps: TopBarProps) => {
  const user = useUserData()

  return (
    <view {...restProps} className={css.root}>
      <Icon glyph='menu' size='md' />
      <view className={css.locationBar}>
        <LocationBar
          placeholder='Your location'
          value={user?.location ?? ''}
          onSearch={() => {}}
        />
      </view>
      {user?.avatar && <image className={css.avatar} src={user.avatar} />}
    </view>
  )
}
