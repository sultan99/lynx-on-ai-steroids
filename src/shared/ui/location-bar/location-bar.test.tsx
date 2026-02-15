import '@testing-library/jest-dom'
import { render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test'
import { LocationBar } from './location-bar.js'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('LocationBar', () => {
  test('renders address text', () => {
    render(<LocationBar address='123 Main St, Springfield' />)
    const { getByText } = queryRoot()
    expect(getByText('123 Main St, Springfield')).toBeInTheDocument()
  })

  test('renders search icon when onSearch provided', () => {
    const onSearch = vi.fn()
    render(<LocationBar address='123 Main St' onSearch={onSearch} />)
    const { getByTestId } = queryRoot()
    expect(getByTestId('location-bar-search')).toBeInTheDocument()
  })

  test('hides search icon when onSearch absent', () => {
    render(<LocationBar address='123 Main St' />)
    const { queryByTestId } = queryRoot()
    expect(queryByTestId('location-bar-search')).not.toBeInTheDocument()
  })
})
