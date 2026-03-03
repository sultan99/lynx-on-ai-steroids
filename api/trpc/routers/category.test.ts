import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Context } from '../init.js'
import * as collections from '../../db/collections.js'
import { categoryRouter } from './category.js'

vi.mock('../../db/collections.js')

const mockCategory1: collections.Category = {
  iconGlyph: '🍩',
  id: 'cat-1',
  name: 'Classic',
}

const mockCategory2: collections.Category = {
  iconGlyph: '🍫',
  id: 'cat-2',
  name: 'Chocolate',
}

describe('Category Router', () => {
  const createCaller = () =>
    categoryRouter.createCaller({ db: {} as unknown as Context['db'], userId: 'user-1' })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('list', () => {
    it('should return all categories', async () => {
      const mockSnap = {
        docs: [{ data: () => mockCategory1 }, { data: () => mockCategory2 }],
      }

      const mockGet = vi.fn().mockResolvedValue(mockSnap)
      vi.mocked(collections.categories).get = mockGet

      const caller = createCaller()
      const result = await caller.list()

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(mockCategory1)
      expect(result[1]).toEqual(mockCategory2)
      expect(mockGet).toHaveBeenCalled()
    })

    it('should return empty list when no categories exist', async () => {
      const mockSnap = { docs: [] }

      const mockGet = vi.fn().mockResolvedValue(mockSnap)
      vi.mocked(collections.categories).get = mockGet

      const caller = createCaller()
      const result = await caller.list()

      expect(result).toHaveLength(0)
    })

    it('should preserve all category properties', async () => {
      const mockSnap = {
        docs: [{ data: () => mockCategory1 }],
      }

      const mockGet = vi.fn().mockResolvedValue(mockSnap)
      vi.mocked(collections.categories).get = mockGet

      const caller = createCaller()
      const result = await caller.list()

      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('iconGlyph')
    })
  })
})
