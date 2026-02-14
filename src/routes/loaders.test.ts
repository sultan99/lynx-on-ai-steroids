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
  test('/lynx loader fetches query data', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const { Route } = await import('./lynx')
    const loader = Route.options.loader
    if (!loader) throw new Error('loader not defined')

    // @ts-expect-error — partial context, only queryClient is needed by loader
    await loader({ context: { queryClient } })
    const data = queryClient.getQueryData(['route', 'lynx'])

    expect(data).toEqual({ message: 'Hello from Lynx' })
    vi.useRealTimers()
  })

  test('/react loader fetches query data', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const { Route } = await import('./react')
    const loader = Route.options.loader
    if (!loader) throw new Error('loader not defined')

    // @ts-expect-error — partial context, only queryClient is needed by loader
    await loader({ context: { queryClient } })
    const data = queryClient.getQueryData(['route', 'react'])

    expect(data).toEqual({ message: 'Hello from React' })
    vi.useRealTimers()
  })
})
