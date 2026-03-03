import { useMutation, useQueryClient } from '@tanstack/react-query'
import { donutKeys } from '@/entities/donut'
import { trpc } from '@/shared/api/trpc'
import { useDonutFavoritesStore } from '../model/use-donut-favorites-store'

type QueryData = { id: string; isFavorite: boolean }[]

export const useUpdateDonutLike = () => {
  const queryClient = useQueryClient()
  const setFavorite = useDonutFavoritesStore((s) => s.setFavorite)
  const clearFavorite = useDonutFavoritesStore((s) => s.clearFavorite)

  return useMutation({
    mutationFn: (donutId: string) =>
      trpc.donut.toggleFavorite.mutate({ donutId }),

    onMutate: (donutId: string) => {
      const donuts = queryClient.getQueryData<QueryData>(donutKeys.list())
      const wasFavorite =
        donuts?.find((donut) => donut.id === donutId)?.isFavorite ?? false
      setFavorite(donutId, !wasFavorite)
      return { wasFavorite }
    },

    onError: (_err, donutId, context) => {
      if (context) {
        setFavorite(donutId, context.wasFavorite)
      }
    },

    onSettled: async (_data, _err, donutId) => {
      await queryClient.invalidateQueries({ queryKey: donutKeys.all })
      clearFavorite(donutId)
    },
  })
}
