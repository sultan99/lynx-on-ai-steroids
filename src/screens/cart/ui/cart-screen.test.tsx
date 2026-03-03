import type { CartItem } from '@/entities/cart'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '@/shared/ui/icon/glyph-map'

const mockNavigate = vi.fn()
const mockHistoryBack = vi.fn()
const mockUpdateQuantity = vi.fn()
const mockRemoveItem = vi.fn()

const makeItem = (overrides: Partial<CartItem> = {}): CartItem => ({
  donut: {
    brand: 'Krispy Kreme',
    calories: 350,
    categoryId: '1',
    deliveryType: 'Free',
    description: 'A classic donut.',
    id: '1',
    image: 'classic.png',
    isFavorite: false,
    name: 'Chocolate Glazed',
    prepTime: 15,
    price: 5,
    rating: 4.8,
  },
  donutId: '1',
  quantity: 2,
  ...overrides,
})

let mockItems: CartItem[] = []
let mockSubTotal = 0

vi.mock('@/entities/cart', () => ({
  CartItemCard: (props: {
    'data-testid'?: string
    item: CartItem
    onDecrement: (id: string) => void
    onIncrement: (id: string) => void
    onRemove: (id: string) => void
  }) => (
    <view data-testid={props['data-testid']}>
      <text>{props.item.donut.name}</text>
      <text
        data-testid={`increment-${props.item.donutId}`}
        bindtap={() => props.onIncrement(props.item.donutId)}
      >
        {glyphMap.plus}
      </text>
      <text
        data-testid={`decrement-${props.item.donutId}`}
        bindtap={() => props.onDecrement(props.item.donutId)}
      >
        {glyphMap.minus}
      </text>
      <text
        data-testid={`remove-${props.item.donutId}`}
        bindtap={() => props.onRemove(props.item.donutId)}
      >
        {glyphMap.cross}
      </text>
    </view>
  ),
  CartSummary: (props: { subTotal: number; onOrder?: () => void }) => (
    <view data-testid='cart-summary'>
      <text>{`$${props.subTotal.toFixed(2)}`}</text>
      <text data-testid='order-button' bindtap={props.onOrder}>
        Order
      </text>
    </view>
  ),
  selectSubTotal: () => mockSubTotal,
  useCartStore: (
    selector: (state: {
      items: CartItem[]
      removeItem: typeof mockRemoveItem
      updateQuantity: typeof mockUpdateQuantity
    }) => unknown,
  ) =>
    selector({
      items: mockItems,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
    }),
}))

vi.mock('@/shared/lib/hooks/use-status-bar-height', () => ({
  useStatusBarHeight: () => '0px',
}))

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
  useRouter: () => ({ history: { back: mockHistoryBack } }),
}))

beforeEach(() => {
  vi.clearAllMocks()
  mockItems = []
  mockSubTotal = 0
})

describe('CartScreen — empty state', () => {
  const renderScreen = async () => {
    const { CartScreen } = await import('./cart-screen')
    render(<CartScreen />)
    return queryRoot()
  }

  test('shows empty cart message when cart has no items', async () => {
    const { getByText } = await renderScreen()
    expect(getByText('Your cart is empty')).toBeInTheDocument()
  })

  test('shows empty cart subtitle when cart has no items', async () => {
    const { getByText } = await renderScreen()
    expect(
      getByText('Add some delicious donuts to get started'),
    ).toBeInTheDocument()
  })

  test('shows shopping-bag icon when cart is empty', async () => {
    const { getByText } = await renderScreen()
    expect(getByText(glyphMap['shopping-bag'])).toBeInTheDocument()
  })

  test('shows My Cart title in empty state', async () => {
    const { getByText } = await renderScreen()
    expect(getByText('My Cart')).toBeInTheDocument()
  })

  test('back button calls router.history.back in empty state', async () => {
    const { getByText } = await renderScreen()
    fireEvent.tap(getByText(glyphMap['chevron-left']))
    expect(mockHistoryBack).toHaveBeenCalledTimes(1)
  })
})

describe('CartScreen — with items', () => {
  const renderScreen = async () => {
    const { CartScreen } = await import('./cart-screen')
    render(<CartScreen />)
    return queryRoot()
  }

  test('renders cart item names', async () => {
    mockItems = [
      makeItem({ donutId: '1' }),
      makeItem({
        donut: {
          brand: 'Dunkin',
          calories: 420,
          categoryId: '2',
          deliveryType: 'Free',
          description: 'Cream filled donut.',
          id: '2',
          image: 'filled.png',
          isFavorite: false,
          name: 'Strawberry Cream',
          prepTime: 20,
          price: 7,
          rating: 4.6,
        },
        donutId: '2',
        quantity: 1,
      }),
    ]
    const { getByText } = await renderScreen()
    expect(getByText('Chocolate Glazed')).toBeInTheDocument()
    expect(getByText('Strawberry Cream')).toBeInTheDocument()
  })

  test('renders My Cart title', async () => {
    mockItems = [makeItem()]
    const { getByText } = await renderScreen()
    expect(getByText('My Cart')).toBeInTheDocument()
  })

  test('displays correct subtotal in order summary', async () => {
    mockItems = [makeItem({ quantity: 2 })]
    mockSubTotal = 10
    const { getByText } = await renderScreen()
    expect(getByText('$10.00')).toBeInTheDocument()
  })

  test('Order button navigates to order tracking screen', async () => {
    mockItems = [makeItem()]
    const { getByTestId } = await renderScreen()
    fireEvent.tap(getByTestId('order-button'))
    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/order/$orderId',
      params: { orderId: 'ord_xn7krp' },
    })
  })

  test('back button calls router.history.back', async () => {
    mockItems = [makeItem()]
    const { getByText } = await renderScreen()
    fireEvent.tap(getByText(glyphMap['chevron-left']))
    expect(mockHistoryBack).toHaveBeenCalledTimes(1)
  })

  test('increment button calls updateQuantity with incremented quantity', async () => {
    mockItems = [makeItem({ donutId: '1', quantity: 2 })]
    const { getByTestId } = await renderScreen()
    fireEvent.tap(getByTestId('increment-1'))
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 3)
  })

  test('decrement button calls updateQuantity with decremented quantity', async () => {
    mockItems = [makeItem({ donutId: '1', quantity: 2 })]
    const { getByTestId } = await renderScreen()
    fireEvent.tap(getByTestId('decrement-1'))
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 1)
  })

  test('remove button calls removeItem with donutId', async () => {
    mockItems = [makeItem({ donutId: '1' })]
    const { getByTestId } = await renderScreen()
    fireEvent.tap(getByTestId('remove-1'))
    expect(mockRemoveItem).toHaveBeenCalledWith('1')
  })

  test('does not show empty state when cart has items', async () => {
    mockItems = [makeItem()]
    const { queryByText } = await renderScreen()
    expect(queryByText('Your cart is empty')).not.toBeInTheDocument()
  })
})
