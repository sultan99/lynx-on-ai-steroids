import { useEffect } from '@lynx-js/react'
import { useId } from '../../lib/common-utils'
import { Icon } from '../icon/icon'
import * as css from './location-bar.module.scss'

type LocationBarProps = {
  placeholder?: string
  value: string
  onInput?: (value: string) => void
  onSearch?: () => void
}

export const LocationBar = ({
  placeholder,
  value,
  onInput,
  onSearch,
}: LocationBarProps) => {
  const id = useId()

  useEffect(() => {
    lynx
      .createSelectorQuery()
      .select(`#${id}`)
      .invoke({ method: 'setValue', params: { value } })
      .exec()
  }, [id, value])

  return (
    <view className={css.root}>
      <Icon glyph='map-pin' />
      <input
        className={css.input}
        confirm-type='search'
        id={id}
        placeholder={placeholder}
        bindconfirm={onSearch}
        bindinput={onInput && ((e) => onInput(e.detail.value))}
      />
      {onSearch && <Icon glyph='search' bindtap={onSearch} />}
    </view>
  )
}
