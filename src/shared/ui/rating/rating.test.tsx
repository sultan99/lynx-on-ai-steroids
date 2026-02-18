import '@testing-library/jest-dom'
import { render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '../icon/glyph-map.js'
import { Rating } from './rating.js'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Rating', () => {
  test('renders formatted rating value', () => {
    render(<Rating value={4.5} />)
    const { getByText } = queryRoot()
    expect(getByText('4.5')).toBeInTheDocument()
  })

  test('renders rating value with one decimal place', () => {
    render(<Rating value={3} />)
    const { getByText } = queryRoot()
    expect(getByText('3.0')).toBeInTheDocument()
  })

  test('renders star icon', () => {
    render(<Rating value={4.5} />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap['star-filled'])).toBeInTheDocument()
  })
})
