import '@testing-library/jest-dom'
import { fireEvent, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from './glyph-map'
import { Icon } from './icon'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Icon', () => {
  test('renders glyph character', () => {
    render(<Icon glyph='menu' />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap.menu)).toBeInTheDocument()
  })

  test('spreads data-testid prop', () => {
    render(<Icon data-testid='icon-element' glyph='menu' />)
    const { getByTestId } = queryRoot()
    expect(getByTestId('icon-element')).toBeInTheDocument()
  })

  test('fires bindtap callback', () => {
    const handler = vi.fn()
    render(<Icon data-testid='tap-icon' glyph='menu' bindtap={handler} />)
    const { getByTestId } = queryRoot()
    fireEvent.tap(getByTestId('tap-icon'))
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
