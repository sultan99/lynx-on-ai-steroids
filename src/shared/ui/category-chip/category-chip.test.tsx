import '@testing-library/jest-dom'
import { render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test'
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
    render(
      <CategoryChip
        icon='search'
        isActive={true}
        label='Donuts'
        onTap={onTap}
      />,
    )
    const { getByText } = queryRoot()
    expect(getByText('\uE010')).toBeInTheDocument()
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
    expect(getByText('\uE010')).toBeInTheDocument()
  })
})
