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

vi.mock('../lib/use-donuts', () => ({
  useDonuts: () => mockDonuts,
}))

vi.mock('@/features/favorite-donut', () => ({
  useToggleDonutFavorite: () => ({ mutate: mockToggle }),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('DonutList', () => {
  test('renders all donut names', () => {
    render(<DonutList />)
    const { getByText } = queryRoot()
    expect(getByText('Chocolate')).toBeInTheDocument()
    expect(getByText('Cream Filled')).toBeInTheDocument()
  })

  test('renders all donut brands', () => {
    render(<DonutList />)
    const { getByText } = queryRoot()
    expect(getByText('Krispy Kreme')).toBeInTheDocument()
    expect(getByText('Dunkin')).toBeInTheDocument()
  })

  test('renders heart-filled icon for favorited donut', () => {
    render(<DonutList />)
    const { getAllByText } = queryRoot()
    const filledHearts = getAllByText(glyphMap['heart-filled'])
    expect(filledHearts).toHaveLength(1)
  })

  test('renders heart icon for non-favorited donut', () => {
    render(<DonutList />)
    const { getAllByText } = queryRoot()
    const hearts = getAllByText(glyphMap.heart)
    expect(hearts).toHaveLength(1)
  })

  test('calls toggleFavorite when heart is tapped', () => {
    render(<DonutList />)
    const { getAllByText } = queryRoot()
    fireEvent.tap(getAllByText(glyphMap.heart)[0])
    expect(mockToggle).toHaveBeenCalledWith('2')
  })

  test('passes restProps to root element', () => {
    render(<DonutList data-testid='donut-list' />)
    const { getByTestId } = queryRoot()
    expect(getByTestId('donut-list')).toBeInTheDocument()
  })

  test('renders donut ratings', () => {
    render(<DonutList />)
    const { getByText } = queryRoot()
    expect(getByText('4.8')).toBeInTheDocument()
    expect(getByText('4.6')).toBeInTheDocument()
  })
})
