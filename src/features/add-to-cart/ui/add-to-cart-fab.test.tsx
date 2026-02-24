import type { Donut } from '@/entities/donut'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '@/shared/ui/icon/glyph-map'

const mockAddItem = vi.fn()

vi.mock('@/entities/cart', () => ({
  useCartStore: (
    selector: (state: { addItem: typeof mockAddItem }) => unknown,
  ) => selector({ addItem: mockAddItem }),
}))

const { AddToCartFab } = await import('./add-to-cart-fab')

const donut: Donut = {
  brand: 'Krispy Kreme',
  calories: 350,
  categoryId: 'cat-1',
  deliveryType: 'Free',
  description: 'A classic donut.',
  id: 'donut-1',
  image: 'classic.png',
  isFavorite: false,
  name: 'Chocolate',
  prepTime: 15,
  price: 5,
  rating: 4.8,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('AddToCartFab', () => {
  test('renders plus icon', () => {
    render(<AddToCartFab donut={donut} />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap.plus)).toBeInTheDocument()
  })

  test('calls addItem with donut on tap', () => {
    render(<AddToCartFab donut={donut} />)
    const { getByText } = queryRoot()
    fireEvent.tap(getByText(glyphMap.plus).parentNode as Element)
    expect(mockAddItem).toHaveBeenCalledWith(donut)
  })

  test('calls addItem again on second tap (increments quantity)', () => {
    render(<AddToCartFab donut={donut} />)
    const { getByText } = queryRoot()
    const fab = getByText(glyphMap.plus).parentNode as Element
    fireEvent.tap(fab)
    fireEvent.tap(fab)
    expect(mockAddItem).toHaveBeenCalledTimes(2)
    expect(mockAddItem).toHaveBeenNthCalledWith(1, donut)
    expect(mockAddItem).toHaveBeenNthCalledWith(2, donut)
  })

  test('passes restProps to root element', () => {
    render(<AddToCartFab data-testid='add-fab' donut={donut} />)
    const { getByTestId } = queryRoot()
    expect(getByTestId('add-fab')).toBeInTheDocument()
  })
})
