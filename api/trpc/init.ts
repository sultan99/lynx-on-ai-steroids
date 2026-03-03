import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { initTRPC } from '@trpc/server'
import { db } from '../db/firestore.js'

export const createContext = (_opts: CreateExpressContextOptions) => ({
  db,
  userId: 'user-1',
})

export type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create()

export const router = t.router

export const publicProcedure = t.procedure
