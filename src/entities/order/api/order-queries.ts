import type { Order } from '../model/types'
import { queryOptions } from '@tanstack/react-query'
import { orders } from './mock-data'

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const orderKeys = {
  all: ['orders'] as const,
  detail: (id: string) => [...orderKeys.all, 'detail', id] as const,
  list: () => [...orderKeys.all, 'list'] as const,
}

export const orderListQueryOptions = queryOptions({
  queryFn: async (): Promise<Order[]> => {
    await delay(200)
    return orders
  },
  queryKey: orderKeys.list(),
})

export const orderDetailQueryOptions = (id: string) =>
  queryOptions({
    queryFn: async (): Promise<Order | undefined> => {
      await delay(200)
      return orders.find((o) => o.id === id)
    },
    queryKey: orderKeys.detail(id),
  })
