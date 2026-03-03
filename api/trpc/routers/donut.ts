import { z } from 'zod'
import { donuts, favorites } from '../../db/collections.js'
import { publicProcedure, router } from '../init.js'

export const donutRouter = router({
  detail: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const doc = await donuts.doc(input.id).get()
      if (!doc.exists) return null

      const data = doc.data()
      if (!data) return null

      const favDoc = await favorites.doc(ctx.userId).get()
      const favData = favDoc.data()
      const isFavorite = favData?.donutIds?.includes(input.id) ?? false
      return { ...data, isFavorite }
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    const [donutSnap, favDoc] = await Promise.all([
      donuts.get(),
      favorites.doc(ctx.userId).get(),
    ])

    const favData = favDoc.data()
    const favDonutIds = new Set(favData?.donutIds ?? [])

    return donutSnap.docs.map((doc) => ({
      ...doc.data(),
      isFavorite: favDonutIds.has(doc.id),
    }))
  }),

  toggleFavorite: publicProcedure
    .input(z.object({ donutId: z.string() }))
    .mutation(({ ctx, input }) => {
      const favRef = favorites.doc(ctx.userId)

      return favorites.firestore.runTransaction(async (tx) => {
        const favDoc = await tx.get(favRef)
        const favData = favDoc.data()
        const donutIds = favData?.donutIds ?? []

        if (donutIds.includes(input.donutId)) {
          tx.set(favRef, {
            donutIds: donutIds.filter((id) => id !== input.donutId),
            userId: ctx.userId,
          })
          return { isFavorite: false }
        }

        tx.set(favRef, {
          donutIds: [...donutIds, input.donutId],
          userId: ctx.userId,
        })
        return { isFavorite: true }
      })
    }),
})
