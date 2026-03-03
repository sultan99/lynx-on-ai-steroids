import { queryOptions } from '@tanstack/react-query'
import { trpc } from '@/shared/api/trpc'

export const orderKeys = {
  all: ['orders'] as const,
  detail: (id: string) => [...orderKeys.all, 'detail', id] as const,
  list: () => [...orderKeys.all, 'list'] as const,
}

export const orderListQueryOptions = queryOptions({
  queryFn: () => trpc.order.list.query(),
  queryKey: orderKeys.list(),
})

export const orderDetailQueryOptions = (id: string) =>
  queryOptions({
    queryFn: () => trpc.order.detail.query({ id }),
    queryKey: orderKeys.detail(id),
  })
