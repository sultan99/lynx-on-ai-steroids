import type { NodesRef } from '@lynx-js/types'
import { useEffect, useRef } from '@lynx-js/react'
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
  const inputRef = useRef<NodesRef>(null)

  useEffect(() => {
    inputRef.current?.invoke?.({ method: 'setValue', params: { value } })
  }, [value])

  return (
    <view className={css.root}>
      <Icon glyph='map-pin' />
      <input
        className={css.input}
        confirm-type='search'
        placeholder={placeholder}
        ref={inputRef}
        bindconfirm={onSearch}
        bindinput={onInput && ((e) => onInput(e.detail.value))}
      />
      {onSearch && <Icon glyph='search' bindtap={onSearch} />}
    </view>
  )
}
