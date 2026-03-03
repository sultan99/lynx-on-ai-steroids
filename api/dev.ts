import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import express from 'express'
import { createContext } from './trpc/init.js'
import { appRouter } from './trpc/router.js'

const app = express()
app.use(cors())
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    createContext,
    router: appRouter,
  }),
)

const port = 4000
app.listen(port, () => {
  console.log(`API dev server running on http://localhost:${port}`)
  console.log(`tRPC endpoint: http://localhost:${port}/trpc`)
})
