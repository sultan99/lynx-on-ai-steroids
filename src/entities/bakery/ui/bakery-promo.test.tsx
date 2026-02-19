import type { Bakery } from '../model/types'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '@/shared/ui/icon/glyph-map'
import { BakeryPromo } from './bakery-promo'

const baseBakery: Bakery = {
  deliveryTime: 45,
  id: '1',
  logo: 'dunkin-logo.svg',
  name: "Dunkin' Donuts",
  orderLink: 'https://www.dunkindonuts.com',
  promoImage: 'classic.png',
  promoText: "Something Fresh is Always Brewin' Here",
  rating: 4.9,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('BakeryPromo', () => {
  test('renders bakery name', () => {
    render(<BakeryPromo bakery={baseBakery} />)
    const { getByText } = queryRoot()
    expect(getByText("Dunkin' Donuts")).toBeInTheDocument()
  })

  test('renders promo text', () => {
    render(<BakeryPromo bakery={baseBakery} />)
    const { getByText } = queryRoot()
    expect(
      getByText("Something Fresh is Always Brewin' Here"),
    ).toBeInTheDocument()
  })

  test('renders Order Now button text', () => {
    render(<BakeryPromo bakery={baseBakery} />)
    const { getByText } = queryRoot()
    expect(getByText('Order Now')).toBeInTheDocument()
  })

  test('renders rating value', () => {
    render(<BakeryPromo bakery={baseBakery} />)
    const { getByText } = queryRoot()
    expect(getByText('4.9')).toBeInTheDocument()
  })

  test('renders delivery time', () => {
    render(<BakeryPromo bakery={baseBakery} />)
    const { getByText } = queryRoot()
    expect(getByText(/45/)).toBeInTheDocument()
    expect(getByText(/min/)).toBeInTheDocument()
  })

  test('renders clock icon', () => {
    render(<BakeryPromo bakery={baseBakery} />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap.clock)).toBeInTheDocument()
  })

  test('renders star icon for rating', () => {
    render(<BakeryPromo bakery={baseBakery} />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap['star-filled'])).toBeInTheDocument()
  })

  test('calls onOrder with orderLink on Order Now tap', () => {
    const onOrder = vi.fn()
    render(<BakeryPromo bakery={baseBakery} onOrder={onOrder} />)
    const { getByText } = queryRoot()
    const orderText = getByText('Order Now')
    fireEvent.tap(orderText.parentNode as Element)
    expect(onOrder).toHaveBeenCalledWith('https://www.dunkindonuts.com')
  })

  test('does not throw when Order Now is tapped without onOrder', () => {
    render(<BakeryPromo bakery={baseBakery} />)
    const { getByText } = queryRoot()
    const orderText = getByText('Order Now')
    expect(() => fireEvent.tap(orderText.parentNode as Element)).not.toThrow()
  })

  test('passes restProps to root element', () => {
    render(<BakeryPromo bakery={baseBakery} data-testid='bakery-promo' />)
    const { getByTestId } = queryRoot()
    expect(getByTestId('bakery-promo')).toBeInTheDocument()
  })
})
