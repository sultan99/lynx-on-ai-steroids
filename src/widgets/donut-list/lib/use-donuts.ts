import type { Donut } from '@/entities/donut'
import { useMemo } from '@lynx-js/react'
import { useQuery } from '@tanstack/react-query'
import { donutListQueryOptions } from '@/entities/donut'
import { useDonutFavorites } from '@/features/favorite-donut'

type UseDonutsOptions = {
  categoryId?: string
  searchQuery?: string
}

export const useDonuts = ({
  categoryId,
  searchQuery,
}: UseDonutsOptions = {}) => {
  const { data: donutList } = useQuery(donutListQueryOptions)
  const favorites = useDonutFavorites((s) => s.favorites)

  return useMemo((): Donut[] => {
    if (!donutList) return []

    const search = searchQuery?.trim().toLowerCase()

    return donutList
      .filter((donut) => {
        if (categoryId && donut.categoryId !== categoryId) return false
        if (search) {
          const name = donut.name.toLowerCase()
          const brand = donut.brand.toLowerCase()
          return name.includes(search) || brand.includes(search)
        }
        return true
      })
      .map((donut) => ({
        ...donut,
        isFavorite: favorites.get(donut.id) ?? donut.isFavorite,
      }))
  }, [donutList, favorites, categoryId, searchQuery])
}
