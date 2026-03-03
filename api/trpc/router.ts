import { router } from './init.js'
import { bakeryRouter } from './routers/bakery.js'
import { categoryRouter } from './routers/category.js'
import { donutRouter } from './routers/donut.js'
import { orderRouter } from './routers/order.js'
import { reviewRouter } from './routers/review.js'
import { userRouter } from './routers/user.js'

export const appRouter = router({
  bakery: bakeryRouter,
  category: categoryRouter,
  donut: donutRouter,
  order: orderRouter,
  review: reviewRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
