import type { Donut } from '@/entities/donut'
import { useMemo } from '@lynx-js/react'
import { useQuery } from '@tanstack/react-query'
import { donutListQueryOptions } from '@/entities/donut'
import { useDonutFavoritesStore } from '@/features/like-donut'

type UseDonutsOptions = {
  categoryId?: string
  searchQuery?: string
}

export const useDonutsData = ({
  categoryId,
  searchQuery,
}: UseDonutsOptions = {}) => {
  const { data: donuts } = useQuery(donutListQueryOptions)
  const favorites = useDonutFavoritesStore((s) => s.favorites)

  return useMemo((): Donut[] => {
    if (!donuts) return []

    const search = searchQuery?.trim().toLowerCase()

    return donuts
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
  }, [donuts, favorites, categoryId, searchQuery])
}
