import { useMutation, useQueryClient } from '@tanstack/react-query'
import { donutKeys, donuts } from '@/entities/donut'
import { useDonutFavoritesStore } from '../model/use-donut-favorites-store'

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const useUpdateDonutLike = () => {
  const queryClient = useQueryClient()
  const setFavorite = useDonutFavoritesStore((s) => s.setFavorite)
  const clearFavorite = useDonutFavoritesStore((s) => s.clearFavorite)

  return useMutation({
    mutationFn: async (donutId: string) => {
      await delay(300)
      const donut = donuts.find((d) => d.id === donutId)
      if (donut) {
        donut.isFavorite = !donut.isFavorite
      }
      return donutId
    },
    onMutate: (donutId: string) => {
      const donut = donuts.find((d) => d.id === donutId)
      const wasFavorite = donut?.isFavorite ?? false
      setFavorite(donutId, !wasFavorite)
      return { wasFavorite }
    },
    onError: (_err, donutId, context) => {
      if (context) {
        setFavorite(donutId, context.wasFavorite)
      }
    },
    onSettled: (_data, _err, donutId) => {
      clearFavorite(donutId)
      queryClient.invalidateQueries({ queryKey: donutKeys.all })
    },
  })
}
