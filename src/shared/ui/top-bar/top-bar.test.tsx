import '@testing-library/jest-dom'
import { render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '../icon/glyph-map.js'
import { TopBar } from './top-bar.js'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('TopBar', () => {
  test('renders title text', () => {
    render(<TopBar title='Home' />)
    const { getByText } = queryRoot()
    expect(getByText('Home')).toBeInTheDocument()
  })

  test('renders back arrow when onBack provided', () => {
    const onBack = vi.fn()
    render(<TopBar onBack={onBack} title='Home' />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap['chevron-left'])).toBeInTheDocument()
  })

  test('hides back arrow when onBack absent', () => {
    render(<TopBar title='Home' />)
    const { queryByText } = queryRoot()
    expect(queryByText(glyphMap['chevron-left'])).not.toBeInTheDocument()
  })

  test('renders action icon when actionIcon and onAction provided', () => {
    const onAction = vi.fn()
    render(<TopBar actionIcon='search' onAction={onAction} title='Home' />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap.search)).toBeInTheDocument()
  })

  test('hides action icon when actionIcon absent', () => {
    const onAction = vi.fn()
    render(<TopBar onAction={onAction} title='Home' />)
    const { queryByText } = queryRoot()
    expect(queryByText(glyphMap.search)).not.toBeInTheDocument()
  })

  test('hides action icon when onAction absent', () => {
    render(<TopBar actionIcon='search' title='Home' />)
    const { queryByText } = queryRoot()
    expect(queryByText(glyphMap.search)).not.toBeInTheDocument()
  })
})
