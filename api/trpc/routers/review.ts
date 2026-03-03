import { z } from 'zod'
import { reviews } from '../../db/collections.js'
import { publicProcedure, router } from '../init.js'

export const reviewRouter = router({
  list: publicProcedure
    .input(z.object({ donutId: z.string() }))
    .query(async ({ input }) => {
      const snap = await reviews.where('donutId', '==', input.donutId).get()
      return snap.docs.map((doc) => doc.data())
    }),
})
