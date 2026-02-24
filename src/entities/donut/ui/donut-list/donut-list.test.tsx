import '@testing-library/jest-dom'
import type { Donut } from '../../model/types'
import { fireEvent, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '@/shared/ui/icon/glyph-map'
import { DonutList } from './donut-list'

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

beforeEach(() => {
  vi.clearAllMocks()
})

describe('DonutList', () => {
  test('renders all donut names', () => {
    render(<DonutList donuts={mockDonuts} />)
    const { getByText } = queryRoot()
    expect(getByText('Chocolate')).toBeInTheDocument()
    expect(getByText('Cream Filled')).toBeInTheDocument()
  })

  test('renders all donut brands', () => {
    render(<DonutList donuts={mockDonuts} />)
    const { getByText } = queryRoot()
    expect(getByText('Krispy Kreme')).toBeInTheDocument()
    expect(getByText('Dunkin')).toBeInTheDocument()
  })

  test('renders heart-filled icon for favorited donut', () => {
    render(<DonutList donuts={mockDonuts} />)
    const { getAllByText } = queryRoot()
    expect(getAllByText(glyphMap['heart-filled'])).toHaveLength(1)
  })

  test('calls onLike when heart is tapped', () => {
    const onLike = vi.fn()
    render(<DonutList donuts={mockDonuts} onLike={onLike} />)
    const { getAllByText } = queryRoot()
    fireEvent.tap(getAllByText(glyphMap.heart)[0])
    expect(onLike).toHaveBeenCalledWith('2')
  })

  test('passes restProps to root element', () => {
    render(<DonutList data-testid='donut-list' donuts={mockDonuts} />)
    const { getByTestId } = queryRoot()
    expect(getByTestId('donut-list')).toBeInTheDocument()
  })
})
