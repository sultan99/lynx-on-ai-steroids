import type { Review } from '../model/types'
import { queryOptions } from '@tanstack/react-query'
import { reviews } from './mock-data'

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const reviewKeys = {
  all: ['reviews'] as const,
  list: (donutId: string) => [...reviewKeys.all, 'list', donutId] as const,
}

export const reviewListQueryOptions = (donutId: string) =>
  queryOptions({
    queryFn: async (): Promise<Review[]> => {
      await delay(200)
      return reviews.filter((r) => r.donutId === donutId)
    },
    queryKey: reviewKeys.list(donutId),
  })
