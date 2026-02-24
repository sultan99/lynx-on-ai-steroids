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

const { CartAddButton } = await import('./cart-add-button')

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

describe('CartAddButton', () => {
  test('renders plus icon', () => {
    render(<CartAddButton donut={donut} />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap.plus)).toBeInTheDocument()
  })

  test('calls addItem with donut on tap', () => {
    render(<CartAddButton donut={donut} />)
    const { getByText } = queryRoot()
    fireEvent.tap(getByText(glyphMap.plus))
    expect(mockAddItem).toHaveBeenCalledWith(donut)
  })

  test('calls addItem on each tap for quantity increment', () => {
    render(<CartAddButton donut={donut} />)
    const { getByText } = queryRoot()
    fireEvent.tap(getByText(glyphMap.plus))
    fireEvent.tap(getByText(glyphMap.plus))
    expect(mockAddItem).toHaveBeenCalledTimes(2)
  })
})
