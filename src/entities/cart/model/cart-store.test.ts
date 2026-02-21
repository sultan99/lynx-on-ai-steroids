import type { Donut } from '@/entities/donut'
import { beforeEach, describe, expect, test } from 'vitest'
import { useCartStore } from './cart-store'

const makeDonut = (overrides: Partial<Donut> = {}): Donut => ({
  brand: 'Krispy Kreme',
  calories: 350,
  deliveryType: 'Free',
  description: 'A classic donut.',
  id: '1',
  image: 'classic.png',
  isFavorite: false,
  name: 'Chocolate',
  prepTime: 15,
  price: 5,
  rating: 4.8,
  ...overrides,
})

beforeEach(() => {
  useCartStore.setState({ items: [] })
})

describe('useCartStore — addItem', () => {
  test('adds a new item with quantity 1', () => {
    const donut = makeDonut()
    useCartStore.getState().addItem(donut)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items.at(0)?.donutId).toBe('1')
    expect(items.at(0)?.quantity).toBe(1)
  })

  test('increments quantity when the same donut is added again', () => {
    const donut = makeDonut()
    useCartStore.getState().addItem(donut)
    useCartStore.getState().addItem(donut)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items.at(0)?.quantity).toBe(2)
  })

  test('adds distinct items as separate entries', () => {
    const donutA = makeDonut({ id: '1', name: 'Chocolate' })
    const donutB = makeDonut({ id: '2', name: 'Strawberry' })
    useCartStore.getState().addItem(donutA)
    useCartStore.getState().addItem(donutB)
    expect(useCartStore.getState().items).toHaveLength(2)
  })
})

describe('useCartStore — removeItem', () => {
  test('removes the matching item', () => {
    const donut = makeDonut()
    useCartStore.getState().addItem(donut)
    useCartStore.getState().removeItem('1')
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  test('leaves other items untouched', () => {
    const donutA = makeDonut({ id: '1' })
    const donutB = makeDonut({ id: '2' })
    useCartStore.getState().addItem(donutA)
    useCartStore.getState().addItem(donutB)
    useCartStore.getState().removeItem('1')
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items.at(0)?.donutId).toBe('2')
  })

  test('does nothing when donut id is not found', () => {
    const donut = makeDonut()
    useCartStore.getState().addItem(donut)
    useCartStore.getState().removeItem('999')
    expect(useCartStore.getState().items).toHaveLength(1)
  })
})

describe('useCartStore — updateQuantity', () => {
  test('updates quantity of an existing item', () => {
    const donut = makeDonut()
    useCartStore.getState().addItem(donut)
    useCartStore.getState().updateQuantity('1', 4)
    expect(useCartStore.getState().items.at(0)?.quantity).toBe(4)
  })

  test('removes item when quantity is set to zero', () => {
    const donut = makeDonut()
    useCartStore.getState().addItem(donut)
    useCartStore.getState().updateQuantity('1', 0)
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  test('removes item when quantity is set to a negative number', () => {
    const donut = makeDonut()
    useCartStore.getState().addItem(donut)
    useCartStore.getState().updateQuantity('1', -1)
    expect(useCartStore.getState().items).toHaveLength(0)
  })
})

describe('useCartStore — clearCart', () => {
  test('empties all items', () => {
    useCartStore.getState().addItem(makeDonut({ id: '1' }))
    useCartStore.getState().addItem(makeDonut({ id: '2' }))
    useCartStore.getState().clearCart()
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  test('is a no-op on an already empty cart', () => {
    useCartStore.getState().clearCart()
    expect(useCartStore.getState().items).toHaveLength(0)
  })
})

describe('useCartStore — totalItems', () => {
  test('returns 0 for an empty cart', () => {
    expect(useCartStore.getState().totalItems()).toBe(0)
  })

  test('returns the sum of all quantities', () => {
    useCartStore.getState().addItem(makeDonut({ id: '1' }))
    useCartStore.getState().addItem(makeDonut({ id: '1' }))
    useCartStore.getState().addItem(makeDonut({ id: '2' }))
    expect(useCartStore.getState().totalItems()).toBe(3)
  })
})

describe('useCartStore — subTotal', () => {
  test('returns 0 for an empty cart', () => {
    expect(useCartStore.getState().subTotal()).toBe(0)
  })

  test('returns price × quantity for a single item', () => {
    useCartStore.getState().addItem(makeDonut({ id: '1', price: 5 }))
    useCartStore.getState().addItem(makeDonut({ id: '1', price: 5 }))
    expect(useCartStore.getState().subTotal()).toBe(10)
  })

  test('sums prices across multiple distinct items', () => {
    useCartStore.getState().addItem(makeDonut({ id: '1', price: 5 }))
    useCartStore.getState().addItem(makeDonut({ id: '2', price: 3 }))
    expect(useCartStore.getState().subTotal()).toBe(8)
  })
})
