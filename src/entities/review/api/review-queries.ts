import { queryOptions } from '@tanstack/react-query'
import { trpc } from '@/shared/api/trpc'

export const reviewKeys = {
  all: ['reviews'] as const,
  list: (donutId: string) => [...reviewKeys.all, 'list', donutId] as const,
}

export const reviewListQueryOptions = (donutId: string) =>
  queryOptions({
    queryFn: () => trpc.review.list.query({ donutId }),
    queryKey: reviewKeys.list(donutId),
  })
