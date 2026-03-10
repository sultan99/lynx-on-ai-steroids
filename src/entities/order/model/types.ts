import type { TrpcTypes } from '@/shared/api/trpc-types'

export type Order = TrpcTypes['order']['list'][number]
export type Courier = Order['courier']
