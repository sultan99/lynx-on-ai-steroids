import { z } from 'zod'
import { orders } from '../../db/collections.js'
import { publicProcedure, router } from '../init.js'

export const orderRouter = router({
  detail: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const doc = await orders.doc(input.id).get()
      return doc.data() ?? null
    }),

  list: publicProcedure.query(async () => {
    const snap = await orders.get()
    return snap.docs.map((doc) => doc.data())
  }),
})
