import type { TrpcTypes } from '@/shared/api/trpc-types'

export type User = NonNullable<TrpcTypes['user']['current']>
