import '@testing-library/jest-dom'
import type { Donut } from '@/entities/donut'
import { render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'

const mockNavigate = vi.fn()

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
  {
    brand: 'Duck Donuts',
    calories: 380,
    categoryId: '1',
    deliveryType: 'Paid',
    description: 'Vanilla glazed donut.',
    id: '3',
    image: 'vanilla.png',
    isFavorite: false,
    name: 'Vanilla Dream',
    prepTime: 10,
    price: 6,
    rating: 4.5,
  },
]

let searchCallback: ((value: string) => void) | null = null
let lastSearchQuery: string | undefined

vi.mock('@/shared/lib/hooks/use-status-bar-height', () => ({
  useStatusBarHeight: () => '44px',
}))

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('@/features/search-donuts', () => ({
  SearchBar: (props: {
    placeholder?: string
    onInput: (v: string) => void
  }) => {
    searchCallback = props.onInput
    return (
      <view data-testid='search-bar'>
        <text>{props.placeholder}</text>
      </view>
    )
  },
  useSearch: () => ({
    handleInput: (value: string) => {
      lastSearchQuery = value
      searchCallback?.(value)
    },
    query: lastSearchQuery ?? '',
  }),
}))

vi.mock('@/widgets/donut-list', () => ({
  DonutList: (props: { searchQuery?: string }) => {
    const search = props.searchQuery?.trim().toLowerCase()
    const filtered = search
      ? mockDonuts.filter(
          (d) =>
            d.name.toLowerCase().includes(search) ||
            d.brand.toLowerCase().includes(search),
        )
      : mockDonuts
    return (
      <view data-testid='donut-list'>
        {filtered.map((d) => (
          <text key={d.id}>{d.name}</text>
        ))}
      </view>
    )
  },
  useDonutsData: (opts?: { searchQuery?: string }) => {
    const search = opts?.searchQuery?.trim().toLowerCase()
    return search
      ? mockDonuts.filter(
          (d) =>
            d.name.toLowerCase().includes(search) ||
            d.brand.toLowerCase().includes(search),
        )
      : mockDonuts
  },
}))

beforeEach(() => {
  vi.clearAllMocks()
  searchCallback = null
  lastSearchQuery = undefined
})

describe('CatalogScreen', () => {
  const renderScreen = async () => {
    const { CatalogScreen } = await import('./catalog')
    render(<CatalogScreen />)
    return queryRoot()
  }

  test('renders search bar with placeholder', async () => {
    const { getByText } = await renderScreen()
    expect(getByText('Search Food')).toBeInTheDocument()
  })

  test('renders results count', async () => {
    const { getByText } = await renderScreen()
    expect(
      getByText((_content, node) => node?.textContent === 'Found 3 Results'),
    ).toBeInTheDocument()
  })

  test('renders all donut cards', async () => {
    const { getByText } = await renderScreen()
    expect(getByText('Chocolate Glazed')).toBeInTheDocument()
    expect(getByText('Strawberry Cream')).toBeInTheDocument()
    expect(getByText('Vanilla Dream')).toBeInTheDocument()
  })

  test('renders top bar with title', async () => {
    const { getByText } = await renderScreen()
    expect(getByText('Search your Flavour')).toBeInTheDocument()
  })
})
