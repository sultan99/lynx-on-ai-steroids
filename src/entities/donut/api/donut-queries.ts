import { queryOptions } from '@tanstack/react-query'
import { trpc } from '@/shared/api/trpc'

export const donutKeys = {
  all: ['donuts'] as const,
  detail: (id: string) => ['donuts', 'detail', id] as const,
  list: () => ['donuts', 'list'] as const,
}

export const donutListQueryOptions = queryOptions({
  queryFn: () => trpc.donut.list.query(),
  queryKey: donutKeys.list(),
})

export const donutDetailQueryOptions = (id: string) =>
  queryOptions({
    queryFn: () => trpc.donut.detail.query({ id }),
    queryKey: donutKeys.detail(id),
  })
