import '@testing-library/jest-dom'
import { fireEvent, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { CartSummary } from './cart-summary'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('CartSummary', () => {
  test('renders sub total label and formatted value', () => {
    render(<CartSummary deliveryCharges={2} promoDiscount={1} subTotal={20} />)
    const { getByText } = queryRoot()
    expect(getByText('Sub Total')).toBeInTheDocument()
    expect(getByText('$20.00')).toBeInTheDocument()
  })

  test('renders promo discount label and formatted value', () => {
    render(
      <CartSummary deliveryCharges={2} promoDiscount={1.5} subTotal={20} />,
    )
    const { getByText } = queryRoot()
    expect(getByText('Promocode')).toBeInTheDocument()
    expect(getByText('$1.50')).toBeInTheDocument()
  })

  test('renders delivery charges label and formatted value when non-zero', () => {
    render(
      <CartSummary deliveryCharges={2.5} promoDiscount={0} subTotal={20} />,
    )
    const { getByText } = queryRoot()
    expect(getByText('Delivery Charges')).toBeInTheDocument()
    expect(getByText('$2.50')).toBeInTheDocument()
  })

  test('renders Free when delivery charges are zero', () => {
    render(<CartSummary deliveryCharges={0} promoDiscount={0} subTotal={20} />)
    const { getByText } = queryRoot()
    expect(getByText('Free')).toBeInTheDocument()
  })

  test('renders computed total label and value', () => {
    render(<CartSummary deliveryCharges={2} promoDiscount={3} subTotal={20} />)
    const { getByText } = queryRoot()
    expect(getByText('Total')).toBeInTheDocument()
    expect(getByText('19.00')).toBeInTheDocument()
  })

  test('renders order button', () => {
    render(<CartSummary deliveryCharges={0} promoDiscount={0} subTotal={10} />)
    const { getByText } = queryRoot()
    expect(getByText('Order')).toBeInTheDocument()
  })

  test('calls onOrder when order button is tapped', () => {
    const onOrder = vi.fn()
    render(
      <CartSummary
        deliveryCharges={0}
        onOrder={onOrder}
        promoDiscount={0}
        subTotal={10}
      />,
    )
    const { getByText } = queryRoot()
    fireEvent.tap(getByText('Order').parentNode as Element)
    expect(onOrder).toHaveBeenCalledTimes(1)
  })

  test('does not throw when order button is tapped without onOrder', () => {
    render(<CartSummary deliveryCharges={0} promoDiscount={0} subTotal={10} />)
    const { getByText } = queryRoot()
    expect(() =>
      fireEvent.tap(getByText('Order').parentNode as Element),
    ).not.toThrow()
  })

  test('passes restProps to root element', () => {
    render(
      <CartSummary
        data-testid='cart-summary'
        deliveryCharges={0}
        promoDiscount={0}
        subTotal={10}
      />,
    )
    const { getByTestId } = queryRoot()
    expect(getByTestId('cart-summary')).toBeInTheDocument()
  })
})
