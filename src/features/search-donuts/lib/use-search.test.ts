import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

let mockState = ''
const mockSetState = vi.fn((val: string) => {
  mockState = val
})

vi.mock('@lynx-js/react', () => ({
  useCallback: (fn: (...args: unknown[]) => unknown) => fn,
  useRef: () => ({ current: null }),
  useState: () => [mockState, mockSetState],
}))

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  vi.clearAllMocks()
  mockState = ''
})

afterEach(() => {
  vi.useRealTimers()
})

describe('useSearch', () => {
  test('returns empty query initially', async () => {
    const { useSearch } = await import('./use-search')
    const { query } = useSearch()

    expect(query).toBe('')
  })

  test('debounces input before updating query', async () => {
    const { useSearch } = await import('./use-search')
    const { handleInput } = useSearch()

    handleInput('choco')
    expect(mockSetState).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(300)
    expect(mockSetState).toHaveBeenCalledWith('choco')
  })

  test('resets timer on rapid input', async () => {
    const { useSearch } = await import('./use-search')
    const { handleInput } = useSearch()

    handleInput('ch')
    await vi.advanceTimersByTimeAsync(200)
    handleInput('choco')
    await vi.advanceTimersByTimeAsync(200)

    expect(mockSetState).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(100)
    expect(mockSetState).toHaveBeenCalledWith('choco')
    expect(mockSetState).toHaveBeenCalledTimes(1)
  })
})
