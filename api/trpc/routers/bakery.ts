import { z } from 'zod'
import { bakeries } from '../../db/collections.js'
import { publicProcedure, router } from '../init.js'

export const bakeryRouter = router({
  detail: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const doc = await bakeries.doc(input.id).get()
      return doc.data() ?? null
    }),

  list: publicProcedure.query(async () => {
    const snap = await bakeries.get()
    return snap.docs.map((doc) => doc.data())
  }),
})
