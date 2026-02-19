import '@testing-library/jest-dom'
import type { Donut } from '../model/types'
import { render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '@/shared/ui/icon/glyph-map'
import { DonutCard } from './donut-card'

const baseDonut: Donut = {
  brand: 'Krispy Kreme',
  calories: 350,
  deliveryType: 'Free',
  description: 'A classic donut.',
  id: '1',
  image: 'classic.png',
  isFavorite: false,
  name: 'Chocolate',
  prepTime: 15,
  price: 5,
  rating: 4.8,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('DonutCard', () => {
  test('renders donut name', () => {
    render(<DonutCard donut={baseDonut} />)
    const { getByText } = queryRoot()
    expect(getByText('Chocolate')).toBeInTheDocument()
  })

  test('renders donut brand', () => {
    render(<DonutCard donut={baseDonut} />)
    const { getByText } = queryRoot()
    expect(getByText('Krispy Kreme')).toBeInTheDocument()
  })

  test('renders price with dollar sign', () => {
    render(<DonutCard donut={baseDonut} />)
    const { getByText } = queryRoot()
    expect(getByText('$')).toBeInTheDocument()
    expect(getByText('5.00')).toBeInTheDocument()
  })

  test('renders heart icon when donut is not a favorite', () => {
    render(<DonutCard donut={baseDonut} />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap.heart)).toBeInTheDocument()
  })

  test('renders heart-filled icon when donut is a favorite', () => {
    render(<DonutCard donut={{ ...baseDonut, isFavorite: true }} />)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap['heart-filled'])).toBeInTheDocument()
  })

  test('renders rating value', () => {
    render(<DonutCard donut={baseDonut} />)
    const { getByText } = queryRoot()
    expect(getByText('4.8')).toBeInTheDocument()
  })

  test('passes restProps to root element', () => {
    render(<DonutCard data-testid='donut-card' donut={baseDonut} />)
    const { getByTestId } = queryRoot()
    expect(getByTestId('donut-card')).toBeInTheDocument()
  })
})
