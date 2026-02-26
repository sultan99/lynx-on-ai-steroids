import { useQuery } from '@tanstack/react-query'
import { categoryListQueryOptions } from '@/entities/category'

export const useCategoriesData = () => {
  const { data: categories = [] } = useQuery(categoryListQueryOptions)
  return categories
}
