import type { CartItem } from '../model/types'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '@/shared/ui/icon/glyph-map'
import { CartItemCard } from './cart-item-card'

const baseItem: CartItem = {
  donut: {
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
  },
  donutId: '1',
  quantity: 2,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('CartItemCard', () => {
  test('renders donut name', () => {
    render(
      <CartItemCard
        item={baseItem}
        onDecrement={vi.fn()}
        onIncrement={vi.fn()}
        onRemove={vi.fn()}
      />,
    )
    const { getByText } = queryRoot()
    expect(getByText('Chocolate')).toBeInTheDocument()
  })

  test('renders price multiplied by quantity', () => {
    render(
      <CartItemCard
        item={baseItem}
        onDecrement={vi.fn()}
        onIncrement={vi.fn()}
        onRemove={vi.fn()}
      />,
    )
    const { getByText } = queryRoot()
    expect(getByText('10.00')).toBeInTheDocument()
  })

  test('renders current quantity in selector', () => {
    render(
      <CartItemCard
        item={baseItem}
        onDecrement={vi.fn()}
        onIncrement={vi.fn()}
        onRemove={vi.fn()}
      />,
    )
    const { getByText } = queryRoot()
    expect(getByText('2')).toBeInTheDocument()
  })

  test('renders cross icon for removal', () => {
    render(
      <CartItemCard
        item={baseItem}
        onDecrement={vi.fn()}
        onIncrement={vi.fn()}
        onRemove={vi.fn()}
      />,
    )
    const { getByText } = queryRoot()
    expect(getByText(glyphMap.cross)).toBeInTheDocument()
  })

  test('renders delivery type', () => {
    render(
      <CartItemCard
        item={baseItem}
        onDecrement={vi.fn()}
        onIncrement={vi.fn()}
        onRemove={vi.fn()}
      />,
    )
    const { getByText } = queryRoot()
    expect(getByText('Free')).toBeInTheDocument()
  })

  test('calls onRemove with donutId when cross icon is tapped', () => {
    const onRemove = vi.fn()
    render(
      <CartItemCard
        item={baseItem}
        onDecrement={vi.fn()}
        onIncrement={vi.fn()}
        onRemove={onRemove}
      />,
    )
    const { getByText } = queryRoot()
    fireEvent.tap(getByText(glyphMap.cross))
    expect(onRemove).toHaveBeenCalledWith('1')
  })

  test('calls onIncrement with donutId when plus button is tapped', () => {
    const onIncrement = vi.fn()
    render(
      <CartItemCard
        item={baseItem}
        onDecrement={vi.fn()}
        onIncrement={onIncrement}
        onRemove={vi.fn()}
      />,
    )
    const { getByText } = queryRoot()
    fireEvent.tap(getByText(glyphMap.plus).parentNode as Element)
    expect(onIncrement).toHaveBeenCalledWith('1')
  })

  test('calls onDecrement with donutId when minus button is tapped', () => {
    const onDecrement = vi.fn()
    render(
      <CartItemCard
        item={baseItem}
        onDecrement={onDecrement}
        onIncrement={vi.fn()}
        onRemove={vi.fn()}
      />,
    )
    const { getByText } = queryRoot()
    fireEvent.tap(getByText(glyphMap.minus).parentNode as Element)
    expect(onDecrement).toHaveBeenCalledWith('1')
  })

  test('passes restProps to root element', () => {
    render(
      <CartItemCard
        data-testid='cart-item'
        item={baseItem}
        onDecrement={vi.fn()}
        onIncrement={vi.fn()}
        onRemove={vi.fn()}
      />,
    )
    const { getByTestId } = queryRoot()
    expect(getByTestId('cart-item')).toBeInTheDocument()
  })
})
