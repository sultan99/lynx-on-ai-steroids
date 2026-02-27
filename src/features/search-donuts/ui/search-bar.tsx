import { Icon } from '@/shared/ui'
import * as css from './search-bar.module.scss'

type SearchBarProps = Omit<JSX.IntrinsicElements['view'], 'children'> & {
  placeholder?: string
  onInput: (value: string) => void
}

export const SearchBar = ({
  placeholder = 'Search your favorite donut...',
  onInput,
  ...restProps
}: SearchBarProps) => (
  <view {...restProps} className={css.root}>
    <view className={css.inputWrapper}>
      <input
        className={css.input}
        confirm-type='search'
        data-testid='search-input'
        placeholder={placeholder}
        bindinput={(e) => onInput(e.detail.value)}
      />
      <Icon className={css.searchIcon} glyph='search' />
    </view>
    <view className={css.filterButton}>
      <Icon className={css.filterIcon} glyph='settings' />
    </view>
  </view>
)
