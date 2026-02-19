import '@testing-library/jest-dom'
import { render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { PriceTag } from './price-tag'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('PriceTag', () => {
  test('renders formatted price value', () => {
    render(<PriceTag price={3.5} />)
    const { getByText } = queryRoot()
    expect(getByText('3.50')).toBeInTheDocument()
  })

  test('renders whole number price with two decimal places', () => {
    render(<PriceTag price={10} />)
    const { getByText } = queryRoot()
    expect(getByText('10.00')).toBeInTheDocument()
  })

  test('renders dollar sign', () => {
    render(<PriceTag price={3.5} />)
    const { getByText } = queryRoot()
    expect(getByText('$')).toBeInTheDocument()
  })
})
