import type { AppRouter } from '@api/trpc/router'
import type { inferRouterOutputs } from '@trpc/server'

export type TrpcTypes = inferRouterOutputs<AppRouter>
