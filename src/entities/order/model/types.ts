import type { TrpcTypes } from '@/shared/api/trpc-types'

type OrderOutput = TrpcTypes['order']['list'][number]
export type Order = OrderOutput
export type Courier = Order['courier']
