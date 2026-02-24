import '@testing-library/jest-dom'
import { fireEvent, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '../icon/glyph-map'
import { ActionButton } from './action-button'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('ActionButton', () => {
  test('renders the given glyph', () => {
    render(<ActionButton glyph='plus' />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap.plus)).toBeInTheDocument()
  })

  test('calls bindtap on tap', () => {
    const handleTap = vi.fn()
    render(<ActionButton glyph='shopping-bag' bindtap={handleTap} />)
    const { getByText } = queryRoot()
    fireEvent.tap(getByText(glyphMap['shopping-bag']))
    expect(handleTap).toHaveBeenCalledOnce()
  })
})
