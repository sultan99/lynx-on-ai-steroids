import '@testing-library/jest-dom'
import { render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { getRoot, queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '../icon/glyph-map.js'
import { LocationBar } from './location-bar.js'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('LocationBar', () => {
  test('renders input element', () => {
    render(<LocationBar value='123 Main St' />)
    const root = getRoot()
    const input = Array.from(root.childNodes)
      .flatMap((n) => Array.from(n.childNodes))
      .find((n: { tagName: string }) => n.tagName === 'INPUT')
    expect(input).toBeDefined()
  })

  test('renders search icon when onSearch provided', () => {
    const onSearch = vi.fn()
    render(<LocationBar value='123 Main St' onSearch={onSearch} />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap.search)).toBeInTheDocument()
  })

  test('hides search icon when onSearch absent', () => {
    render(<LocationBar value='123 Main St' />)
    const { queryByText } = queryRoot()
    expect(queryByText(glyphMap.search)).not.toBeInTheDocument()
  })
})
