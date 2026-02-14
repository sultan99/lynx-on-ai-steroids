import { QueryClient } from '@tanstack/react-query'
import { beforeEach, describe, expect, test, vi } from 'vitest'

let queryClient: QueryClient

beforeEach(() => {
  vi.clearAllMocks()
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
})

describe('Route loaders', () => {
  test('/lynx query fetches data', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const { lynxQueryOptions } = await import('./lynx')

    const data = await queryClient.ensureQueryData(lynxQueryOptions)

    expect(data).toEqual({ message: 'Hello from Lynx' })
    vi.useRealTimers()
  })

  test('/react query fetches data', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const { reactQueryOptions } = await import('./react')

    const data = await queryClient.ensureQueryData(reactQueryOptions)

    expect(data).toEqual({ message: 'Hello from React' })
    vi.useRealTimers()
  })
})
