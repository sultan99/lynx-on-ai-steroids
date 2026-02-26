import { useQuery } from '@tanstack/react-query'
import { bakeryListQueryOptions } from '@/entities/bakery'

export const useBakeriesData = () => {
  const { data: bakeries = [] } = useQuery(bakeryListQueryOptions)
  return bakeries
}
