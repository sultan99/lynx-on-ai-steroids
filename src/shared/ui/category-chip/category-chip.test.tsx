import '@testing-library/jest-dom'
import { render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '../icon/glyph-map.js'
import { CategoryChip } from './category-chip.js'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('CategoryChip', () => {
  test('renders label text', () => {
    const onTap = vi.fn()
    render(
      <CategoryChip
        icon='search'
        isActive={false}
        label='Donuts'
        onTap={onTap}
      />,
    )
    const { getByText } = queryRoot()
    expect(getByText('Donuts')).toBeInTheDocument()
  })

  test('renders icon when active', () => {
    const onTap = vi.fn()
    render(<CategoryChip icon='search' isActive label='Donuts' onTap={onTap} />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap.search)).toBeInTheDocument()
  })

  test('renders icon when inactive', () => {
    const onTap = vi.fn()
    render(
      <CategoryChip
        icon='search'
        isActive={false}
        label='Donuts'
        onTap={onTap}
      />,
    )
    const { getByText } = queryRoot()
    expect(getByText(glyphMap.search)).toBeInTheDocument()
  })
})
