import { beforeEach, describe, expect, test, vi } from 'vitest'

vi.mock('@lynx-js/react', () => ({
  useInitData: vi.fn(),
  useRef: (v: unknown) => ({ current: v }),
}))

import { useInitData } from '@lynx-js/react'
import { useStatusBarHeight } from './use-status-bar-height'

const mockUseInitData = vi.mocked(useInitData)

describe('useStatusBarHeight', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('returns numeric height when no unit provided', () => {
    mockUseInitData.mockReturnValue({ statusBarHeight: 44 })

    expect(useStatusBarHeight()).toBe(44)
  })

  test('returns height with unit suffix when unit provided', () => {
    mockUseInitData.mockReturnValue({ statusBarHeight: 44 })

    expect(useStatusBarHeight('px')).toBe('44px')
  })

  test('returns 0 when useInitData returns undefined', () => {
    mockUseInitData.mockReturnValue(undefined)

    expect(useStatusBarHeight()).toBe(0)
  })

  test('returns "0px" when useInitData returns undefined and unit provided', () => {
    mockUseInitData.mockReturnValue(undefined)

    expect(useStatusBarHeight('px')).toBe('0px')
  })

  test('returns 0 when statusBarHeight is missing', () => {
    mockUseInitData.mockReturnValue({})

    expect(useStatusBarHeight()).toBe(0)
  })
})
