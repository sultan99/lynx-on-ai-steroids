import { users } from '../../db/collections.js'
import { publicProcedure, router } from '../init.js'

export const userRouter = router({
  current: publicProcedure.query(async ({ ctx }) => {
    const doc = await users.doc(ctx.userId).get()
    return doc.data() ?? null
  }),
})
