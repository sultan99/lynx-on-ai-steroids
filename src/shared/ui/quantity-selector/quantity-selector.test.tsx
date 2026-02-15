import '@testing-library/jest-dom'
import { render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test'
import { QuantitySelector } from './quantity-selector.js'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('QuantitySelector', () => {
  test('renders count value', () => {
    const onDecrement = vi.fn()
    const onIncrement = vi.fn()
    render(
      <QuantitySelector
        value={5}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
      />,
    )
    const { getByText } = queryRoot()
    expect(getByText('5')).toBeInTheDocument()
  })

  test('renders minus icon', () => {
    const onDecrement = vi.fn()
    const onIncrement = vi.fn()
    render(
      <QuantitySelector
        value={5}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
      />,
    )
    const { getByText } = queryRoot()
    expect(getByText('\uE00D')).toBeInTheDocument()
  })

  test('renders plus icon', () => {
    const onDecrement = vi.fn()
    const onIncrement = vi.fn()
    render(
      <QuantitySelector
        value={5}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
      />,
    )
    const { getByText } = queryRoot()
    expect(getByText('\uE00F')).toBeInTheDocument()
  })
})
