import { queryOptions } from '@tanstack/react-query'
import { trpc } from '@/shared/api/trpc'

export const userKeys = {
  all: ['users'] as const,
  current: () => ['users', 'current'] as const,
}

export const userQueryOptions = queryOptions({
  queryFn: () => trpc.user.current.query(),
  queryKey: userKeys.current(),
})
