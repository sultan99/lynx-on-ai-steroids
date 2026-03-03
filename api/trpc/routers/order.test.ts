import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Context } from '../init.js'
import * as collections from '../../db/collections.js'
import { orderRouter } from './order.js'

vi.mock('../../db/collections.js')

const mockOrder1: collections.Order = {
  courier: {
    avatar: 'https://example.com/courier1.jpg',
    id: 'courier-1',
    name: 'John Doe',
    phone: '555-1234',
  },
  deliveryAddress: '123 Main St',
  deliveryTime: '10:30 AM',
  estimatedTime: 30,
  id: 'order-1',
  status: 'in-transit',
}

const mockOrder2: collections.Order = {
  courier: {
    avatar: 'https://example.com/courier2.jpg',
    id: 'courier-2',
    name: 'Jane Smith',
    phone: '555-5678',
  },
  deliveryAddress: '456 Oak Ave',
  deliveryTime: '11:00 AM',
  estimatedTime: 45,
  id: 'order-2',
  status: 'preparing',
}

describe('Order Router', () => {
  const createCaller = () =>
    orderRouter.createCaller({ db: {} as unknown as Context['db'], userId: 'user-1' })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('list', () => {
    it('should return all orders', async () => {
      const mockSnap = {
        docs: [{ data: () => mockOrder1 }, { data: () => mockOrder2 }],
      }

      const mockGet = vi.fn().mockResolvedValue(mockSnap)
      vi.mocked(collections.orders).get = mockGet

      const caller = createCaller()
      const result = await caller.list()

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(mockOrder1)
      expect(result[1]).toEqual(mockOrder2)
      expect(mockGet).toHaveBeenCalled()
    })

    it('should return empty list when no orders exist', async () => {
      const mockSnap = { docs: [] }

      const mockGet = vi.fn().mockResolvedValue(mockSnap)
      vi.mocked(collections.orders).get = mockGet

      const caller = createCaller()
      const result = await caller.list()

      expect(result).toHaveLength(0)
    })

    it('should preserve all order properties including courier info', async () => {
      const mockSnap = {
        docs: [{ data: () => mockOrder1 }],
      }

      const mockGet = vi.fn().mockResolvedValue(mockSnap)
      vi.mocked(collections.orders).get = mockGet

      const caller = createCaller()
      const result = await caller.list()

      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('status')
      expect(result[0]).toHaveProperty('deliveryAddress')
      expect(result[0].courier).toHaveProperty('name')
      expect(result[0].courier).toHaveProperty('phone')
    })
  })

  describe('detail', () => {
    it('should return order by id', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => mockOrder1,
        }),
      }

      const mockDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.orders).doc = mockDoc

      const caller = createCaller()
      const result = await caller.detail({ id: 'order-1' })

      expect(result).toEqual(mockOrder1)
      expect(mockDoc).toHaveBeenCalledWith('order-1')
    })

    it('should return null when order does not exist', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => undefined,
        }),
      }

      const mockDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.orders).doc = mockDoc

      const caller = createCaller()
      const result = await caller.detail({ id: 'nonexistent' })

      expect(result).toBeNull()
    })

    it('should return null when order data is empty', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => null,
        }),
      }

      const mockDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.orders).doc = mockDoc

      const caller = createCaller()
      const result = await caller.detail({ id: 'order-1' })

      expect(result).toBeNull()
    })

    it('should retrieve correct document reference by id', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => mockOrder2,
        }),
      }

      const mockDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.orders).doc = mockDoc

      const caller = createCaller()
      await caller.detail({ id: 'order-123' })

      expect(mockDoc).toHaveBeenCalledWith('order-123')
    })
  })
})
