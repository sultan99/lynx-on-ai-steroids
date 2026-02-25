import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

let effectCleanup: (() => void) | undefined
let effectDeps: unknown[] | undefined

vi.mock('@lynx-js/react', () => ({
  useEffect: (fn: () => (() => void) | undefined, deps: unknown[]) => {
    effectDeps = deps
    effectCleanup = fn()
  },
  useRef: (v: unknown) => ({ current: v }),
}))

import { useTimeout } from './use-timeout'

describe('useTimeout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    effectCleanup = undefined
    effectDeps = undefined
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('calls callback after specified delay', () => {
    const callback = vi.fn()

    useTimeout(callback, 1000)

    expect(callback).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledOnce()
  })

  test('does not call callback before delay elapses', () => {
    const callback = vi.fn()

    useTimeout(callback, 3000)

    vi.advanceTimersByTime(2999)
    expect(callback).not.toHaveBeenCalled()
  })

  test('does not set timeout when delay is null', () => {
    const callback = vi.fn()

    useTimeout(callback, null)

    vi.advanceTimersByTime(10000)
    expect(callback).not.toHaveBeenCalled()
  })

  test('clears timeout on cleanup', () => {
    const callback = vi.fn()

    useTimeout(callback, 1000)
    effectCleanup?.()

    vi.advanceTimersByTime(1000)
    expect(callback).not.toHaveBeenCalled()
  })

  test('uses delay as effect dependency', () => {
    useTimeout(vi.fn(), 5000)

    expect(effectDeps).toEqual([5000])
  })
})
