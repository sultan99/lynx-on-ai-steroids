import '@testing-library/jest-dom'
import type { Bakery } from '@/entities/bakery'
import type { Category } from '@/entities/category'
import type { Donut } from '@/entities/donut'
import type { User } from '@/entities/user'
import { fireEvent, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'

const mockUser: User = {
  avatar: 'avatar.png',
  avatarUrl: 'https://example.com/avatar.png',
  id: '1',
  location: 'York Ave. Brooklyn',
  name: 'John',
}

const mockCategories: Category[] = [
  { iconGlyph: 'donut-classic', id: '1', name: 'Classic' },
  { iconGlyph: 'donut-filled', id: '2', name: 'Filled' },
]

const mockBakeries: Bakery[] = [
  {
    deliveryTime: 45,
    id: '1',
    logo: 'logo.png',
    name: "Dunkin' Donuts",
    orderLink: 'https://dunkin.com',
    promoImage: 'promo.png',
    promoText: 'Fresh and tasty',
    rating: 4.9,
  },
]

const mockDonuts: Donut[] = [
  {
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
  {
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
]

vi.mock('@/shared/lib/hooks/use-status-bar-height', () => ({
  useStatusBarHeight: () => '44px',
}))

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}))

vi.mock('@/widgets/top-bar', () => ({
  TopBar: () => <view data-testid='top-bar' />,
  useUserData: () => mockUser,
}))

vi.mock('@/widgets/category-filter', () => ({
  CategoryFilter: (props: {
    activeId: string
    onSelect: (id: string) => void
  }) => (
    <view data-testid='category-filter'>
      {mockCategories.map((cat) => (
        <view
          data-testid={`chip-${cat.id}`}
          key={cat.id}
          bindtap={() =>
            props.onSelect(cat.id === props.activeId ? '' : cat.id)
          }
        >
          <text>{cat.name}</text>
        </view>
      ))}
    </view>
  ),
}))

vi.mock('@/widgets/bakery-promo', () => ({
  BakeryPromoSection: () => (
    <view data-testid='bakery-promo'>
      <text>Popular Bakeries</text>
      <text>{mockBakeries[0].name}</text>
    </view>
  ),
}))

vi.mock('@/widgets/donut-list', () => ({
  DonutList: (props: { categoryId?: string }) => {
    const filtered = props.categoryId
      ? mockDonuts.filter((d) => d.categoryId === props.categoryId)
      : mockDonuts
    return (
      <view data-testid='donut-list'>
        {filtered.map((d) => (
          <text key={d.id}>{d.name}</text>
        ))}
      </view>
    )
  },
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('HomeScreen', () => {
  const renderScreen = async () => {
    const { HomeScreen } = await import('./home-screen')
    render(<HomeScreen />)
    return queryRoot()
  }

  test('displays greeting with user name', async () => {
    const { getByText } = await renderScreen()
    expect(
      getByText((_content, node) => node?.textContent === 'Hi, John'),
    ).toBeInTheDocument()
  })

  test('displays section heading', async () => {
    const { getByText } = await renderScreen()
    expect(getByText('Filter Donuts')).toBeInTheDocument()
  })

  test('renders all category chips', async () => {
    const { getByText } = await renderScreen()
    expect(getByText('Classic')).toBeInTheDocument()
    expect(getByText('Filled')).toBeInTheDocument()
  })

  test('renders bakery promo section', async () => {
    const { getByText } = await renderScreen()
    expect(getByText('Popular Bakeries')).toBeInTheDocument()
    expect(getByText("Dunkin' Donuts")).toBeInTheDocument()
  })

  test('renders all donuts when no category selected', async () => {
    const { getByText } = await renderScreen()
    expect(getByText('Chocolate Glazed')).toBeInTheDocument()
    expect(getByText('Strawberry Cream')).toBeInTheDocument()
  })

  test('filters donuts when category chip is tapped', async () => {
    const { getByText, getByTestId, queryByText } = await renderScreen()

    expect(getByText('Chocolate Glazed')).toBeInTheDocument()
    expect(getByText('Strawberry Cream')).toBeInTheDocument()

    fireEvent.tap(getByTestId('chip-1'))

    expect(getByText('Chocolate Glazed')).toBeInTheDocument()
    expect(queryByText('Strawberry Cream')).not.toBeInTheDocument()
  })

  test('deselects category when same chip is tapped again', async () => {
    const { getByText, getByTestId } = await renderScreen()

    fireEvent.tap(getByTestId('chip-1'))
    expect(getByText('Chocolate Glazed')).toBeInTheDocument()

    fireEvent.tap(getByTestId('chip-1'))
    expect(getByText('Chocolate Glazed')).toBeInTheDocument()
    expect(getByText('Strawberry Cream')).toBeInTheDocument()
  })

  test('switches category filter', async () => {
    const { getByText, getByTestId, queryByText } = await renderScreen()

    fireEvent.tap(getByTestId('chip-1'))
    expect(getByText('Chocolate Glazed')).toBeInTheDocument()
    expect(queryByText('Strawberry Cream')).not.toBeInTheDocument()

    fireEvent.tap(getByTestId('chip-2'))
    expect(queryByText('Chocolate Glazed')).not.toBeInTheDocument()
    expect(getByText('Strawberry Cream')).toBeInTheDocument()
  })
})
