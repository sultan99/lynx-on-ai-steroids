import type { Order } from '@/entities/order'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '@/shared/ui/icon/glyph-map'

const mockOnBack = vi.fn()

const mockOrder: Order = {
  courier: {
    avatar: 'https://example.com/avatar.jpg',
    id: '1',
    name: 'Anna Bright',
    phone: '+1 234 567 890',
  },
  deliveryAddress: '00 Street, Area',
  deliveryTime: '4:30pm',
  estimatedTime: 3,
  id: '1',
  status: 'in-transit',
}

vi.mock('../lib/use-order-data', () => ({
  useOrderData: () => mockOrder,
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('OrderTracking', () => {
  const renderWidget = async () => {
    const { OrderTracking } = await import('./order-tracking')
    render(<OrderTracking orderId='1' onBack={mockOnBack} />)
    return queryRoot()
  }

  test('renders estimated time number', async () => {
    const { getByText } = await renderWidget()
    expect(getByText('3')).toBeInTheDocument()
  })

  test('renders MIN label for estimated time', async () => {
    const { getByText } = await renderWidget()
    expect(getByText('MIN')).toBeInTheDocument()
  })

  test('renders Estimated Time label', async () => {
    const { getByText } = await renderWidget()
    expect(getByText('Estimated Time')).toBeInTheDocument()
  })

  test('renders delivery time', async () => {
    const { getByText } = await renderWidget()
    expect(getByText('4:30pm')).toBeInTheDocument()
  })

  test('renders delivery time label', async () => {
    const { getByText } = await renderWidget()
    expect(getByText('Delivery time')).toBeInTheDocument()
  })

  test('renders delivery address', async () => {
    const { getByText } = await renderWidget()
    expect(getByText('00 Street, Area')).toBeInTheDocument()
  })

  test('renders delivery place label', async () => {
    const { getByText } = await renderWidget()
    expect(getByText('Delivery Place')).toBeInTheDocument()
  })

  test('renders courier name', async () => {
    const { getByText } = await renderWidget()
    expect(getByText('Anna Bright')).toBeInTheDocument()
  })

  test('renders courier role', async () => {
    const { getByText } = await renderWidget()
    expect(getByText('Courier')).toBeInTheDocument()
  })

  test('renders phone button', async () => {
    const { getByTestId } = await renderWidget()
    expect(getByTestId('phone-button')).toBeInTheDocument()
  })

  test('renders phone icon inside phone button', async () => {
    const { getByText } = await renderWidget()
    expect(getByText(glyphMap.phone)).toBeInTheDocument()
  })

  test('renders clock icon for delivery time', async () => {
    const { getByText } = await renderWidget()
    expect(getByText(glyphMap.clock)).toBeInTheDocument()
  })

  test('renders flag icon for delivery place', async () => {
    const { getByText } = await renderWidget()
    expect(getByText(glyphMap.flag)).toBeInTheDocument()
  })

  test('back button calls onBack prop', async () => {
    const { getByText } = await renderWidget()
    fireEvent.tap(getByText(glyphMap['chevron-left']))
    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })
})
