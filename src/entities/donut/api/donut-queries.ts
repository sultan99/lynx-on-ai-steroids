import type { Donut } from '../model/types'
import { queryOptions } from '@tanstack/react-query'
import { donuts } from './mock-data'

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const donutKeys = {
  all: ['donuts'] as const,
  detail: (id: string) => ['donuts', 'detail', id] as const,
  list: () => ['donuts', 'list'] as const,
}

export const donutListQueryOptions = queryOptions({
  queryFn: async (): Promise<Donut[]> => {
    await delay(300)
    return donuts
  },
  queryKey: donutKeys.list(),
})

export const donutDetailQueryOptions = (id: string) =>
  queryOptions({
    queryFn: async (): Promise<Donut | undefined> => {
      await delay(200)
      return donuts.find((d) => d.id === id)
    },
    queryKey: donutKeys.detail(id),
  })
