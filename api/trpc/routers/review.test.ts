import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Context } from '../init.js'
import * as collections from '../../db/collections.js'
import { reviewRouter } from './review.js'

vi.mock('../../db/collections.js')

const mockReview1: collections.Review = {
  authorAvatar: 'https://example.com/avatar1.jpg',
  authorName: 'Alice Johnson',
  date: '2024-01-15',
  donutId: 'donut-1',
  id: 'review-1',
  rating: 5,
  text: 'Best donut ever!',
}

const mockReview2: collections.Review = {
  authorAvatar: 'https://example.com/avatar2.jpg',
  authorName: 'Bob Smith',
  date: '2024-01-16',
  donutId: 'donut-1',
  id: 'review-2',
  rating: 4,
  text: 'Really good, very fresh',
}

const mockReview3: collections.Review = {
  authorAvatar: 'https://example.com/avatar3.jpg',
  authorName: 'Charlie Brown',
  date: '2024-01-17',
  donutId: 'donut-2',
  id: 'review-3',
  rating: 3,
  text: 'It was okay',
}

describe('Review Router', () => {
  const createCaller = () =>
    reviewRouter.createCaller({ db: {} as unknown as Context['db'], userId: 'user-1' })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('list', () => {
    it('should return reviews for a specific donut', async () => {
      const mockSnap = {
        docs: [{ data: () => mockReview1 }, { data: () => mockReview2 }],
      }

      const mockWhere = vi.fn().mockReturnValue({
        get: vi.fn().mockResolvedValue(mockSnap),
      })

      vi.mocked(collections.reviews).where = mockWhere

      const caller = createCaller()
      const result = await caller.list({ donutId: 'donut-1' })

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(mockReview1)
      expect(result[1]).toEqual(mockReview2)
      expect(mockWhere).toHaveBeenCalledWith('donutId', '==', 'donut-1')
    })

    it('should return empty list when donut has no reviews', async () => {
      const mockSnap = { docs: [] }

      const mockWhere = vi.fn().mockReturnValue({
        get: vi.fn().mockResolvedValue(mockSnap),
      })

      vi.mocked(collections.reviews).where = mockWhere

      const caller = createCaller()
      const result = await caller.list({ donutId: 'donut-no-reviews' })

      expect(result).toHaveLength(0)
    })

    it('should filter reviews by donut id', async () => {
      const mockSnap = {
        docs: [{ data: () => mockReview3 }],
      }

      const mockWhere = vi.fn().mockReturnValue({
        get: vi.fn().mockResolvedValue(mockSnap),
      })

      vi.mocked(collections.reviews).where = mockWhere

      const caller = createCaller()
      const result = await caller.list({ donutId: 'donut-2' })

      expect(mockWhere).toHaveBeenCalledWith('donutId', '==', 'donut-2')
      expect(result[0].donutId).toBe('donut-2')
    })

    it('should preserve all review properties', async () => {
      const mockSnap = {
        docs: [{ data: () => mockReview1 }],
      }

      const mockWhere = vi.fn().mockReturnValue({
        get: vi.fn().mockResolvedValue(mockSnap),
      })

      vi.mocked(collections.reviews).where = mockWhere

      const caller = createCaller()
      const result = await caller.list({ donutId: 'donut-1' })

      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('authorName')
      expect(result[0]).toHaveProperty('rating')
      expect(result[0]).toHaveProperty('text')
      expect(result[0]).toHaveProperty('date')
    })

    it('should handle different rating values', async () => {
      const mockSnap = {
        docs: [
          { data: () => mockReview1 }, // rating: 5
          { data: () => mockReview2 }, // rating: 4
          { data: () => mockReview3 }, // rating: 3
        ],
      }

      const mockWhere = vi.fn().mockReturnValue({
        get: vi.fn().mockResolvedValue(mockSnap),
      })

      vi.mocked(collections.reviews).where = mockWhere

      const caller = createCaller()
      const result = await caller.list({ donutId: 'donut-1' })

      expect(result[0].rating).toBe(5)
      expect(result[1].rating).toBe(4)
      expect(result[2].rating).toBe(3)
    })
  })
})
