import { queryOptions } from '@tanstack/react-query'
import { trpc } from '@/shared/api/trpc'

export const bakeryKeys = {
  all: ['bakeries'] as const,
  detail: (id: string) => ['bakeries', 'detail', id] as const,
  list: () => ['bakeries', 'list'] as const,
}

export const bakeryListQueryOptions = queryOptions({
  queryFn: () => trpc.bakery.list.query(),
  queryKey: bakeryKeys.list(),
})

export const bakeryDetailQueryOptions = (id: string) =>
  queryOptions({
    queryFn: () => trpc.bakery.detail.query({ id }),
    queryKey: bakeryKeys.detail(id),
  })
