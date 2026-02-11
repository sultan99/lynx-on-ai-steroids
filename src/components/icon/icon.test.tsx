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
  test('renders null when isVisible is false', () => {
    render(<Icon glyph='house' isVisible={false} />)
    expect(elementTree.root).toMatchInlineSnapshot(`<page />`)
  })

  test('renders glyph character', () => {
    render(<Icon glyph='house' />)
    const { getByText } = queryRoot()
    expect(getByText('\uE003')).toBeInTheDocument()
  })

  test('applies default size of 16px', () => {
    render(<Icon glyph='house' />)
    expect(elementTree.root).toMatchInlineSnapshot(`
      <page>
        <text
          class=""
          style="font-family: icons; font-size: 16px; width: 16px; height: 16px;"
        >
          
        </text>
      </page>
    `)
  })

  test('resolves numeric size to px', () => {
    render(<Icon glyph='house' size={24} />)
    expect(elementTree.root).toMatchInlineSnapshot(`
      <page>
        <text
          class=""
          style="font-family: icons; font-size: 24px; width: 24px; height: 24px;"
        >
          
        </text>
      </page>
    `)
  })

  test('resolves CSS variable size to var() format', () => {
    render(<Icon glyph='house' size='--icon-md' />)
    expect(elementTree.root).toMatchInlineSnapshot(`
      <page>
        <text
          class=""
          style="font-family: icons; font-size: var(--icon-md); width: var(--icon-md); height: var(--icon-md);"
        >
          
        </text>
      </page>
    `)
  })

  test('applies color prop', () => {
    render(<Icon color='#ff0000' glyph='house' />)
    expect(elementTree.root).toMatchInlineSnapshot(`
      <page>
        <text
          class=""
          style="font-family: icons; font-size: 16px; width: 16px; height: 16px; color: rgb(255, 0, 0);"
        >
          
        </text>
      </page>
    `)
  })

  test('applies rotate prop', () => {
    render(<Icon glyph='house' rotate={45} />)
    expect(elementTree.root).toMatchInlineSnapshot(`
      <page>
        <text
          class=""
          style="font-family: icons; font-size: 16px; width: 16px; height: 16px; transform: rotate(45deg);"
        >
          
        </text>
      </page>
    `)
  })

  test('applies className', () => {
    render(<Icon className='custom-icon' glyph='house' />)
    expect(elementTree.root).toMatchInlineSnapshot(`
      <page>
        <text
          class="custom-icon"
          style="font-family: icons; font-size: 16px; width: 16px; height: 16px;"
        >
          
        </text>
      </page>
    `)
  })

  test('spreads additional props like data-testid', () => {
    render(<Icon data-testid='icon-element' glyph='house' />)
    const { getByTestId } = queryRoot()
    expect(getByTestId('icon-element')).toBeInTheDocument()
  })

  test('combines size, color, rotate, and className', () => {
    render(
      <Icon
        className='combined'
        color='--accent'
        glyph='flask-conical'
        rotate={180}
        size={32}
      />,
    )
    expect(elementTree.root).toMatchInlineSnapshot(`
      <page>
        <text
          class="combined"
          style="font-family: icons; font-size: 32px; width: 32px; height: 32px; color: var(--accent); transform: rotate(180deg);"
        >
          
        </text>
      </page>
    `)
  })

  test('applies font-family via inline style', () => {
    render(<Icon glyph='book' />)
    const { getByText } = queryRoot()
    expect(getByText('\uE001')).toHaveStyle('font-family: icons')
  })
})
