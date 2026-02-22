import type { Category } from '../model/types'
import { queryOptions } from '@tanstack/react-query'
import { categories } from './mock-data'

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const categoryKeys = {
  all: ['categories'] as const,
  list: () => ['categories', 'list'] as const,
}

export const categoryListQueryOptions = queryOptions({
  queryFn: async (): Promise<Category[]> => {
    await delay(300)
    return categories
  },
  queryKey: categoryKeys.list(),
})
