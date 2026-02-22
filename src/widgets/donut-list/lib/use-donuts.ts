import type { Donut } from '@/entities/donut'
import { useMemo } from '@lynx-js/react'
import { useQuery } from '@tanstack/react-query'
import { donutListQueryOptions } from '@/entities/donut'
import { useDonutFavorites } from '@/features/favorite-donut'

export const useDonuts = () => {
  const { data: donutList } = useQuery(donutListQueryOptions)
  const favorites = useDonutFavorites((s) => s.favorites)

  return useMemo((): Donut[] => {
    if (!donutList) return []

    return donutList.map((donut) => ({
      ...donut,
      isFavorite: favorites.get(donut.id) ?? donut.isFavorite,
    }))
  }, [donutList, favorites])
}
