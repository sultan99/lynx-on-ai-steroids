import '@testing-library/jest-dom'
import { render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '@/shared/ui/icon/glyph-map'
import { SearchBar } from './search-bar'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('SearchBar', () => {
  test('renders input element', () => {
    render(<SearchBar onInput={vi.fn()} />)
    const { getByTestId } = queryRoot()
    expect(getByTestId('search-input')).toBeInTheDocument()
  })

  test('renders search icon', () => {
    render(<SearchBar onInput={vi.fn()} />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap.search)).toBeInTheDocument()
  })

  test('renders filter button with settings icon', () => {
    render(<SearchBar onInput={vi.fn()} />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap.settings)).toBeInTheDocument()
  })

  test('renders custom placeholder', () => {
    render(<SearchBar placeholder='Find a donut' onInput={vi.fn()} />)
    const { getByTestId } = queryRoot()
    const input = getByTestId('search-input')
    expect(input).toHaveAttribute('placeholder', 'Find a donut')
  })
})
