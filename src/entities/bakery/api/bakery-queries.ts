import type { Bakery } from '../model/types'
import { queryOptions } from '@tanstack/react-query'
import { bakeries } from './mock-data'

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const bakeryKeys = {
  all: ['bakeries'] as const,
  detail: (id: string) => ['bakeries', 'detail', id] as const,
  list: () => ['bakeries', 'list'] as const,
}

export const bakeryListQueryOptions = queryOptions({
  queryFn: async (): Promise<Bakery[]> => {
    await delay(300)
    return bakeries
  },
  queryKey: bakeryKeys.list(),
})

export const bakeryDetailQueryOptions = (id: string) =>
  queryOptions({
    queryFn: async (): Promise<Bakery | undefined> => {
      await delay(200)
      return bakeries.find((b) => b.id === id)
    },
    queryKey: bakeryKeys.detail(id),
  })
