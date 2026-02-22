import { create } from 'zustand'

type FavoriteState = {
  clearFavorite: (donutId: string) => void
  favorites: Map<string, boolean>
  setFavorite: (donutId: string, isFavorite: boolean) => void
}

export const useDonutFavorites = create<FavoriteState>()((set) => ({
  favorites: new Map(),

  setFavorite: (donutId, isFavorite) =>
    set((state) => {
      const next = new Map(state.favorites)
      next.set(donutId, isFavorite)
      return { favorites: next }
    }),

  clearFavorite: (donutId) =>
    set((state) => {
      const next = new Map(state.favorites)
      next.delete(donutId)
      return { favorites: next }
    }),
}))
