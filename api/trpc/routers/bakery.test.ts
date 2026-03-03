import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Context } from '../init.js'
import * as collections from '../../db/collections.js'
import { bakeryRouter } from './bakery.js'

vi.mock('../../db/collections.js')

const mockBakery1: collections.Bakery = {
  deliveryTime: 30,
  id: 'bakery-1',
  logo: 'https://example.com/logo1.png',
  name: 'Krispy Kreme',
  orderLink: 'https://example.com/order/1',
  promoImage: 'https://example.com/promo1.jpg',
  promoText: 'Fresh donuts daily',
  rating: 4.8,
}

const mockBakery2: collections.Bakery = {
  deliveryTime: 45,
  id: 'bakery-2',
  logo: 'https://example.com/logo2.png',
  name: 'Dunkin Donuts',
  orderLink: 'https://example.com/order/2',
  promoImage: 'https://example.com/promo2.jpg',
  promoText: 'America Runs on Dunkin',
  rating: 4.5,
}

describe('Bakery Router', () => {
  const createCaller = () =>
    bakeryRouter.createCaller({ db: {} as unknown as Context['db'], userId: 'user-1' })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('list', () => {
    it('should return all bakeries', async () => {
      const mockSnap = {
        docs: [{ data: () => mockBakery1 }, { data: () => mockBakery2 }],
      }

      const mockGet = vi.fn().mockResolvedValue(mockSnap)
      vi.mocked(collections.bakeries).get = mockGet

      const caller = createCaller()
      const result = await caller.list()

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(mockBakery1)
      expect(result[1]).toEqual(mockBakery2)
      expect(mockGet).toHaveBeenCalled()
    })

    it('should return empty list when no bakeries exist', async () => {
      const mockSnap = { docs: [] }

      const mockGet = vi.fn().mockResolvedValue(mockSnap)
      vi.mocked(collections.bakeries).get = mockGet

      const caller = createCaller()
      const result = await caller.list()

      expect(result).toHaveLength(0)
    })

    it('should preserve all bakery properties', async () => {
      const mockSnap = {
        docs: [{ data: () => mockBakery1 }],
      }

      const mockGet = vi.fn().mockResolvedValue(mockSnap)
      vi.mocked(collections.bakeries).get = mockGet

      const caller = createCaller()
      const result = await caller.list()

      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('logo')
      expect(result[0]).toHaveProperty('rating')
      expect(result[0]).toHaveProperty('deliveryTime')
      expect(result[0]).toHaveProperty('orderLink')
      expect(result[0]).toHaveProperty('promoImage')
      expect(result[0]).toHaveProperty('promoText')
    })
  })

  describe('detail', () => {
    it('should return bakery by id', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => mockBakery1,
        }),
      }

      const mockDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.bakeries).doc = mockDoc

      const caller = createCaller()
      const result = await caller.detail({ id: 'bakery-1' })

      expect(result).toEqual(mockBakery1)
      expect(mockDoc).toHaveBeenCalledWith('bakery-1')
    })

    it('should return null when bakery does not exist', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => undefined,
        }),
      }

      const mockDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.bakeries).doc = mockDoc

      const caller = createCaller()
      const result = await caller.detail({ id: 'nonexistent' })

      expect(result).toBeNull()
    })

    it('should return null when bakery data is empty', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => null,
        }),
      }

      const mockDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.bakeries).doc = mockDoc

      const caller = createCaller()
      const result = await caller.detail({ id: 'bakery-1' })

      expect(result).toBeNull()
    })

    it('should retrieve correct document reference by id', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => mockBakery2,
        }),
      }

      const mockDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.bakeries).doc = mockDoc

      const caller = createCaller()
      await caller.detail({ id: 'bakery-123' })

      expect(mockDoc).toHaveBeenCalledWith('bakery-123')
    })

    it('should preserve all properties in detail response', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => mockBakery1,
        }),
      }

      const mockDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.bakeries).doc = mockDoc

      const caller = createCaller()
      const result = await caller.detail({ id: 'bakery-1' })

      expect(result).toHaveProperty('id', 'bakery-1')
      expect(result).toHaveProperty('name', 'Krispy Kreme')
      expect(result).toHaveProperty('rating', 4.8)
      expect(result).toHaveProperty('deliveryTime', 30)
    })
  })
})
