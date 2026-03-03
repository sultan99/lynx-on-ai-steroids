import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import express from 'express'
import { onRequest } from 'firebase-functions/v2/https'
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

export const api = onRequest(app)
