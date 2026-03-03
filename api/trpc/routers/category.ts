import { categories } from '../../db/collections.js'
import { publicProcedure, router } from '../init.js'

export const categoryRouter = router({
  list: publicProcedure.query(async () => {
    const snap = await categories.get()
    return snap.docs.map((doc) => doc.data())
  }),
})
