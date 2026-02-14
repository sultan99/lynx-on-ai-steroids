import '@testing-library/jest-dom'
import { getQueriesForElement, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Icon, resolveValue } from './icon'

const queryRoot = () => {
  const root = elementTree.root
  if (!root) throw new Error('root not rendered')
  return getQueriesForElement(root)
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('resolveValue', () => {
  test('converts number to px string', () => {
    expect(resolveValue(24)).toBe('24px')
  })

  test('wraps CSS variable name in var()', () => {
    expect(resolveValue('--icon-md')).toBe('var(--icon-md)')
  })

  test('passes through string value as-is', () => {
    expect(resolveValue('2rem')).toBe('2rem')
  })
})

describe('Icon', () => {
  test('renders nothing when isVisible is false', () => {
    render(<Icon glyph='house' isVisible={false} />)
    const root = elementTree.root
    if (!root) throw new Error('root not rendered')
    expect(root.childNodes).toHaveLength(0)
  })

  test('renders glyph character', () => {
    render(<Icon glyph='house' />)
    const { getByText } = queryRoot()
    expect(getByText('\uE003')).toBeInTheDocument()
  })

  test('spreads data-testid prop', () => {
    render(<Icon data-testid='icon-element' glyph='house' />)
    const { getByTestId } = queryRoot()
    expect(getByTestId('icon-element')).toBeInTheDocument()
  })

  test('applies font-family for icon rendering', () => {
    render(<Icon glyph='book' />)
    const { getByText } = queryRoot()
    expect(getByText('\uE001')).toHaveStyle('font-family: icons')
  })

  test('applies color as inline style', () => {
    render(<Icon color='#ff0000' glyph='house' />)
    const { getByText } = queryRoot()
    expect(getByText('\uE003')).toHaveStyle('color: rgb(255, 0, 0)')
  })

  test('applies rotation as inline style', () => {
    render(<Icon glyph='house' rotate={45} />)
    const { getByText } = queryRoot()
    expect(getByText('\uE003')).toHaveStyle('transform: rotate(45deg)')
  })
})
