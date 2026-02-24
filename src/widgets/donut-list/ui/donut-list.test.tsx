import '@testing-library/jest-dom'
import type { Donut } from '@/entities/donut'
import { fireEvent, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '@/shared/ui/icon/glyph-map'
import { DonutList } from './donut-list'

const mockToggle = vi.fn()

const mockDonuts: Donut[] = [
  {
    brand: 'Krispy Kreme',
    calories: 350,
    categoryId: '1',
    deliveryType: 'Free',
    description: 'A classic donut.',
    id: '1',
    image: 'classic.png',
    isFavorite: true,
    name: 'Chocolate',
    prepTime: 15,
    price: 5,
    rating: 4.8,
  },
  {
    brand: 'Dunkin',
    calories: 420,
    categoryId: '2',
    deliveryType: 'Free',
    description: 'Cream filled donut.',
    id: '2',
    image: 'filled.png',
    isFavorite: false,
    name: 'Cream Filled',
    prepTime: 20,
    price: 7,
    rating: 4.6,
  },
]

vi.mock('../lib/use-donuts-data', () => ({
  useDonutsData: () => mockDonuts,
}))

vi.mock('@/features/like-donut', () => ({
  useUpdateDonutLike: () => ({ mutate: mockToggle }),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('DonutList widget', () => {
  test('passes donuts from hook to entity DonutList', () => {
    render(<DonutList />)
    const { getByText } = queryRoot()
    expect(getByText('Chocolate')).toBeInTheDocument()
    expect(getByText('Cream Filled')).toBeInTheDocument()
  })

  test('wires toggleFavorite to onLike', () => {
    render(<DonutList />)
    const { getAllByText } = queryRoot()
    fireEvent.tap(getAllByText(glyphMap.heart)[0])
    expect(mockToggle).toHaveBeenCalledWith('2')
  })

  test('passes restProps through', () => {
    render(<DonutList data-testid='widget-donut-list' />)
    const { getByTestId } = queryRoot()
    expect(getByTestId('widget-donut-list')).toBeInTheDocument()
  })
})
