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
    <Icon className={css.searchIcon} glyph='search' size='sm' />
    <input
      className={css.input}
      confirm-type='search'
      data-testid='search-input'
      placeholder={placeholder}
      bindinput={(e) => onInput(e.detail.value)}
    />
    <view className={css.filterButton}>
      <Icon className={css.filterIcon} glyph='settings' size='xs' />
    </view>
  </view>
)
