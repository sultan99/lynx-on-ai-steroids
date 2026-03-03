import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Context } from '../init.js'
import * as collections from '../../db/collections.js'
import { donutRouter } from './donut.js'

vi.mock('../../db/collections.js')

const mockDonut: collections.Donut = {
  brand: 'Krispy Kreme',
  calories: 250,
  categoryId: 'cat-1',
  deliveryType: 'Free',
  description: 'Classic glazed donut',
  id: 'donut-1',
  image: 'https://example.com/donut.jpg',
  name: 'Glazed Donut',
  prepTime: 5,
  price: 2.5,
  rating: 4.5,
}

const mockDonut2: collections.Donut = {
  brand: 'Dunkin',
  calories: 300,
  categoryId: 'cat-2',
  deliveryType: 'Paid',
  description: 'Chocolate frosted',
  id: 'donut-2',
  image: 'https://example.com/donut2.jpg',
  name: 'Chocolate Frosted',
  prepTime: 5,
  price: 2.99,
  rating: 4.2,
}

const mockFavorite: collections.Favorite = {
  donutIds: ['donut-1'],
  userId: 'user-1',
}

describe('Donut Router', () => {
  const createCaller = () =>
    donutRouter.createCaller({ db: {} as unknown as Context['db'], userId: 'user-1' })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('list', () => {
    it('should return donuts with isFavorite merged from favorites', async () => {
      const mockDonutSnap = {
        docs: [
          { id: 'donut-1', data: () => mockDonut },
          { id: 'donut-2', data: () => mockDonut2 },
        ],
      }

      const mockFavDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => mockFavorite,
        }),
      }

      const mockGet = vi.fn().mockResolvedValue(mockDonutSnap)
      const mockDoc = vi.fn().mockReturnValue(mockFavDocRef)

      vi.mocked(collections.donuts).get = mockGet
      vi.mocked(collections.favorites).doc = mockDoc

      const caller = createCaller()
      const result = await caller.list()

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({ ...mockDonut, isFavorite: true })
      expect(result[1]).toEqual({ ...mockDonut2, isFavorite: false })
      expect(mockGet).toHaveBeenCalled()
      expect(mockDoc).toHaveBeenCalledWith('user-1')
    })

    it('should return empty list when no donuts exist', async () => {
      const mockDonutSnap = { docs: [] }

      const mockFavDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => undefined,
        }),
      }

      const mockGet = vi.fn().mockResolvedValue(mockDonutSnap)
      const mockDoc = vi.fn().mockReturnValue(mockFavDocRef)

      vi.mocked(collections.donuts).get = mockGet
      vi.mocked(collections.favorites).doc = mockDoc

      const caller = createCaller()
      const result = await caller.list()

      expect(result).toHaveLength(0)
    })

    it('should mark all donuts as not favorite when user has no favorites', async () => {
      const mockDonutSnap = {
        docs: [
          { id: 'donut-1', data: () => mockDonut },
          { id: 'donut-2', data: () => mockDonut2 },
        ],
      }

      const mockFavDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => undefined,
        }),
      }

      const mockGet = vi.fn().mockResolvedValue(mockDonutSnap)
      const mockDoc = vi.fn().mockReturnValue(mockFavDocRef)

      vi.mocked(collections.donuts).get = mockGet
      vi.mocked(collections.favorites).doc = mockDoc

      const caller = createCaller()
      const result = await caller.list()

      expect(result[0].isFavorite).toBe(false)
      expect(result[1].isFavorite).toBe(false)
    })
  })

  describe('detail', () => {
    it('should return donut with isFavorite status for existing donut', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          exists: true,
          data: () => mockDonut,
        }),
      }

      const mockFavDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => mockFavorite,
        }),
      }

      const mockDonutDoc = vi.fn().mockReturnValue(mockDocRef)
      const mockFavDoc = vi.fn().mockReturnValue(mockFavDocRef)

      vi.mocked(collections.donuts).doc = mockDonutDoc
      vi.mocked(collections.favorites).doc = mockFavDoc

      const caller = createCaller()
      const result = await caller.detail({ id: 'donut-1' })

      expect(result).toEqual({ ...mockDonut, isFavorite: true })
      expect(mockDonutDoc).toHaveBeenCalledWith('donut-1')
      expect(mockFavDoc).toHaveBeenCalledWith('user-1')
    })

    it('should return donut with isFavorite false when not favorited', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          exists: true,
          data: () => mockDonut2,
        }),
      }

      const mockFavDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => mockFavorite,
        }),
      }

      const mockDonutDoc = vi.fn().mockReturnValue(mockDocRef)
      const mockFavDoc = vi.fn().mockReturnValue(mockFavDocRef)

      vi.mocked(collections.donuts).doc = mockDonutDoc
      vi.mocked(collections.favorites).doc = mockFavDoc

      const caller = createCaller()
      const result = await caller.detail({ id: 'donut-2' })

      expect(result).toEqual({ ...mockDonut2, isFavorite: false })
    })

    it('should return null when donut does not exist', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({ exists: false }),
      }

      const mockDonutDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.donuts).doc = mockDonutDoc

      const caller = createCaller()
      const result = await caller.detail({ id: 'nonexistent' })

      expect(result).toBeNull()
    })

    it('should return null when donut data is empty', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          exists: true,
          data: () => undefined,
        }),
      }

      const mockDonutDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.donuts).doc = mockDonutDoc

      const caller = createCaller()
      const result = await caller.detail({ id: 'donut-1' })

      expect(result).toBeNull()
    })
  })

  describe('toggleFavorite', () => {
    it('should add favorite when donut is not favorited', async () => {
      const mockFavRef = {
        get: vi.fn().mockResolvedValue({
          data: () => ({ donutIds: [], userId: 'user-1' }),
        }),
        set: vi.fn().mockResolvedValue(undefined),
      }

      const mockFavDoc = vi.fn().mockReturnValue(mockFavRef)
      vi.mocked(collections.favorites).doc = mockFavDoc

      const caller = createCaller()
      const result = await caller.toggleFavorite({ donutId: 'donut-1' })

      expect(result).toEqual({ isFavorite: true })
      expect(mockFavDoc).toHaveBeenCalledWith('user-1')
      expect(mockFavRef.set).toHaveBeenCalledWith({
        donutIds: ['donut-1'],
        userId: 'user-1',
      })
    })

    it('should remove favorite when donut is already favorited', async () => {
      const mockFavRef = {
        get: vi.fn().mockResolvedValue({
          data: () => ({ donutIds: ['donut-1', 'donut-2'], userId: 'user-1' }),
        }),
        set: vi.fn().mockResolvedValue(undefined),
      }

      const mockFavDoc = vi.fn().mockReturnValue(mockFavRef)
      vi.mocked(collections.favorites).doc = mockFavDoc

      const caller = createCaller()
      const result = await caller.toggleFavorite({ donutId: 'donut-1' })

      expect(result).toEqual({ isFavorite: false })
      expect(mockFavRef.set).toHaveBeenCalledWith({
        donutIds: ['donut-2'],
        userId: 'user-1',
      })
    })

    it('should create favorites doc when user has no favorites yet', async () => {
      const mockFavRef = {
        get: vi.fn().mockResolvedValue({
          data: () => undefined,
        }),
        set: vi.fn().mockResolvedValue(undefined),
      }

      const mockFavDoc = vi.fn().mockReturnValue(mockFavRef)
      vi.mocked(collections.favorites).doc = mockFavDoc

      const caller = createCaller()
      const result = await caller.toggleFavorite({ donutId: 'donut-1' })

      expect(result).toEqual({ isFavorite: true })
      expect(mockFavRef.set).toHaveBeenCalledWith({
        donutIds: ['donut-1'],
        userId: 'user-1',
      })
    })
  })
})
