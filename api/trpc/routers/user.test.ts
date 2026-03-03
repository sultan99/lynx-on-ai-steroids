import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Context } from '../init.js'
import * as collections from '../../db/collections.js'
import { userRouter } from './user.js'

vi.mock('../../db/collections.js')

const mockUser: collections.User = {
  avatar: 'user',
  avatarUrl: 'https://example.com/user-avatar.jpg',
  id: 'user-1',
  location: 'San Francisco, CA',
  name: 'John Doe',
}

const mockUser2: collections.User = {
  avatar: 'admin',
  avatarUrl: 'https://example.com/admin-avatar.jpg',
  id: 'user-2',
  location: 'New York, NY',
  name: 'Jane Admin',
}

describe('User Router', () => {
  const createCaller = () =>
    userRouter.createCaller({ db: {} as unknown as Context['db'], userId: 'user-1' })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('current', () => {
    it('should return current user from context', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => mockUser,
        }),
      }

      const mockDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.users).doc = mockDoc

      const caller = createCaller()
      const result = await caller.current()

      expect(result).toEqual(mockUser)
      expect(mockDoc).toHaveBeenCalledWith('user-1')
    })

    it('should use userId from context', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => mockUser2,
        }),
      }

      const mockDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.users).doc = mockDoc

      const caller = userRouter.createCaller({
        db: {} as unknown as Context['db'],
        userId: 'user-2',
      })
      await caller.current()

      expect(mockDoc).toHaveBeenCalledWith('user-2')
    })

    it('should return null when user does not exist', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => undefined,
        }),
      }

      const mockDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.users).doc = mockDoc

      const caller = createCaller()
      const result = await caller.current()

      expect(result).toBeNull()
    })

    it('should return null when user data is empty', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => null,
        }),
      }

      const mockDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.users).doc = mockDoc

      const caller = createCaller()
      const result = await caller.current()

      expect(result).toBeNull()
    })

    it('should preserve all user properties', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          data: () => mockUser,
        }),
      }

      const mockDoc = vi.fn().mockReturnValue(mockDocRef)
      vi.mocked(collections.users).doc = mockDoc

      const caller = createCaller()
      const result = await caller.current()

      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('avatar')
      expect(result).toHaveProperty('avatarUrl')
      expect(result).toHaveProperty('location')
    })
  })
})
