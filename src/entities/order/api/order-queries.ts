import type { Order } from '../model/types'
import { queryOptions } from '@tanstack/react-query'
import { orders } from './mock-data'

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const orderKeys = {
  all: ['orders'] as const,
  detail: (id: string) => ['orders', 'detail', id] as const,
}

export const orderDetailQueryOptions = (id: string) =>
  queryOptions({
    queryFn: async (): Promise<Order | undefined> => {
      await delay(200)
      return orders.find((o) => o.id === id)
    },
    queryKey: orderKeys.detail(id),
  })
