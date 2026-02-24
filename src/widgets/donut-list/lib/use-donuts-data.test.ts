import type { Donut } from '@/entities/donut'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const mockDonutList: Donut[] = [
  {
    brand: 'Krispy Kreme',
    calories: 350,
    categoryId: '1',
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
  {
    brand: 'Dunkin',
    calories: 420,
    categoryId: '2',
    deliveryType: 'Free',
    description: 'Cream filled donut.',
    id: '2',
    image: 'filled.png',
    isFavorite: true,
    name: 'Cream Filled',
    prepTime: 20,
    price: 7,
    rating: 4.6,
  },
  {
    brand: 'Krispy Kreme',
    calories: 340,
    categoryId: '1',
    deliveryType: 'Free',
    description: 'Classic glazed donut.',
    id: '3',
    image: 'classic.png',
    isFavorite: false,
    name: 'Classic Glazed',
    prepTime: 10,
    price: 4,
    rating: 4.6,
  },
]

let mockFavorites = new Map<string, boolean>()

vi.mock('@/entities/donut', () => ({
  donutListQueryOptions: { queryKey: ['donuts', 'list'] },
}))

vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ data: mockDonutList }),
}))

vi.mock('@lynx-js/react', () => ({
  useMemo: (fn: () => Donut[]) => fn(),
}))

vi.mock('@/features/like-donut', () => ({
  useDonutFavoritesStore: (
    selector: (s: { favorites: Map<string, boolean> }) => Map<string, boolean>,
  ) => selector({ favorites: mockFavorites }),
}))

beforeEach(() => {
  mockFavorites = new Map()
})

describe('useDonutsData', () => {
  test('returns all donuts when no filters applied', async () => {
    const { useDonutsData } = await import('./use-donuts-data')
    const result = useDonutsData()

    expect(result).toHaveLength(3)
  })

  test('returns donuts with original favorite state when no overlay', async () => {
    const { useDonutsData } = await import('./use-donuts-data')
    const result = useDonutsData()

    expect(result[0].isFavorite).toBe(false)
    expect(result[1].isFavorite).toBe(true)
  })

  test('overlay overrides donut favorite state', async () => {
    mockFavorites.set('1', true)
    const { useDonutsData } = await import('./use-donuts-data')
    const result = useDonutsData()

    expect(result[0].isFavorite).toBe(true)
  })

  test('overlay can unfavorite a donut', async () => {
    mockFavorites.set('2', false)
    const { useDonutsData } = await import('./use-donuts-data')
    const result = useDonutsData()

    expect(result[1].isFavorite).toBe(false)
  })

  test('preserves non-favorite donut properties', async () => {
    const { useDonutsData } = await import('./use-donuts-data')
    const result = useDonutsData()

    expect(result[0].name).toBe('Chocolate')
    expect(result[0].brand).toBe('Krispy Kreme')
    expect(result[0].price).toBe(5)
    expect(result[1].name).toBe('Cream Filled')
  })

  test('filters by categoryId', async () => {
    const { useDonutsData } = await import('./use-donuts-data')
    const result = useDonutsData({ categoryId: '1' })

    expect(result).toHaveLength(2)
    expect(result[0].name).toBe('Chocolate')
    expect(result[1].name).toBe('Classic Glazed')
  })

  test('filters by search query on name', async () => {
    const { useDonutsData } = await import('./use-donuts-data')
    const result = useDonutsData({ searchQuery: 'choco' })

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Chocolate')
  })

  test('filters by search query on brand', async () => {
    const { useDonutsData } = await import('./use-donuts-data')
    const result = useDonutsData({ searchQuery: 'dunkin' })

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Cream Filled')
  })

  test('search is case-insensitive', async () => {
    const { useDonutsData } = await import('./use-donuts-data')
    const result = useDonutsData({ searchQuery: 'KRISPY' })

    expect(result).toHaveLength(2)
  })

  test('combines search and category filters', async () => {
    const { useDonutsData } = await import('./use-donuts-data')
    const result = useDonutsData({ categoryId: '1', searchQuery: 'glazed' })

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Classic Glazed')
  })

  test('returns empty array when no donuts match filters', async () => {
    const { useDonutsData } = await import('./use-donuts-data')
    const result = useDonutsData({ searchQuery: 'nonexistent' })

    expect(result).toHaveLength(0)
  })
})
