import { beforeEach, describe, expect, test, vi } from 'vitest'
import { donuts } from '@/entities/donut/api/mock-data'

type MutationConfig = {
  mutationFn: (donutId: string) => Promise<string>
  onMutate: (donutId: string) => { wasFavorite: boolean }
  onError: (
    err: unknown,
    donutId: string,
    context?: { wasFavorite: boolean },
  ) => void
  onSettled: (data: unknown, err: unknown, donutId: string) => void
}

let capturedConfig: MutationConfig
const mockSetFavorite = vi.fn()
const mockClearFavorite = vi.fn()
const mockInvalidateQueries = vi.fn()

vi.mock('@/entities/donut', async () => {
  const mockData = await import('@/entities/donut/api/mock-data')
  return {
    donuts: mockData.donuts,
    donutKeys: { all: ['donuts'] },
  }
})

vi.mock('@tanstack/react-query', () => ({
  useMutation: (config: MutationConfig) => {
    capturedConfig = config
    return { mutate: vi.fn() }
  },
  useQueryClient: () => ({
    invalidateQueries: mockInvalidateQueries,
  }),
}))

vi.mock('../model/use-donut-favorites-store', () => ({
  useDonutFavoritesStore: (selector: (s: Record<string, unknown>) => unknown) =>
    selector({
      setFavorite: mockSetFavorite,
      clearFavorite: mockClearFavorite,
    }),
}))

beforeEach(() => {
  vi.clearAllMocks()
  vi.useFakeTimers({ shouldAdvanceTime: true })
})

const getHook = async () => {
  const { useUpdateDonutLike } = await import('./use-update-donut-like')
  useUpdateDonutLike()
  return capturedConfig
}

describe('donuts mock data favorite state', () => {
  test('some donuts are favorited by default', () => {
    const favorited = donuts.filter((d) => d.isFavorite)
    expect(favorited.length).toBeGreaterThan(0)
  })

  test('some donuts are not favorited by default', () => {
    const notFavorited = donuts.filter((d) => !d.isFavorite)
    expect(notFavorited.length).toBeGreaterThan(0)
  })
})

describe('useUpdateDonutLike', () => {
  test('onMutate sets optimistic favorite overlay', async () => {
    const config = await getHook()
    const unfavorited = donuts.filter((d) => !d.isFavorite).at(0)
    expect(unfavorited).toBeDefined()

    config.onMutate(unfavorited?.id ?? '')

    expect(mockSetFavorite).toHaveBeenCalledWith(unfavorited?.id, true)
  })

  test('onMutate returns previous favorite state for rollback', async () => {
    const config = await getHook()
    const favorited = donuts.filter((d) => d.isFavorite).at(0)
    expect(favorited).toBeDefined()

    const context = config.onMutate(favorited?.id ?? '')

    expect(context.wasFavorite).toBe(true)
  })

  test('onError rolls back to previous state', async () => {
    const config = await getHook()

    config.onError(new Error('fail'), '1', { wasFavorite: true })

    expect(mockSetFavorite).toHaveBeenCalledWith('1', true)
  })

  test('onError handles missing context', async () => {
    const config = await getHook()

    expect(() =>
      config.onError(new Error('fail'), '1', undefined),
    ).not.toThrow()
  })

  test('onSettled clears overlay and invalidates queries', async () => {
    const config = await getHook()

    config.onSettled(undefined, undefined, '1')

    expect(mockClearFavorite).toHaveBeenCalledWith('1')
    expect(mockInvalidateQueries).toHaveBeenCalled()
  })

  test('mutationFn toggles donut favorite in mock data', async () => {
    const config = await getHook()
    const donut = donuts.filter((d) => d.id === '1').at(0)
    expect(donut).toBeDefined()
    const wasFavorite = donut?.isFavorite

    const result = await config.mutationFn('1')

    expect(result).toBe('1')
    expect(donut?.isFavorite).toBe(!wasFavorite)
    if (donut) donut.isFavorite = wasFavorite ?? false
  })
})
