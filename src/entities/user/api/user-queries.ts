import type { User } from '../model/types'
import { queryOptions } from '@tanstack/react-query'
import { currentUser } from './mock-data'

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const userKeys = {
  all: ['users'] as const,
  current: () => ['users', 'current'] as const,
}

export const userQueryOptions = queryOptions({
  queryFn: async (): Promise<User> => {
    await delay(200)
    return currentUser
  },
  queryKey: userKeys.current(),
})
