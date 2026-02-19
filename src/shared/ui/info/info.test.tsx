import '@testing-library/jest-dom'
import { render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '@/shared/ui/icon/glyph-map'
import { Info } from './info'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Info', () => {
  test('renders icon', () => {
    render(<Info icon='clock'>45 min</Info>)
    const { getByText } = queryRoot()
    expect(getByText(glyphMap.clock)).toBeInTheDocument()
  })

  test('renders text', () => {
    render(<Info icon='clock'>45 min</Info>)
    const { getByText } = queryRoot()
    expect(getByText('45 min')).toBeInTheDocument()
  })

  test('passes restProps to root element', () => {
    render(
      <Info data-testid='info' icon='clock'>
        45 min
      </Info>,
    )
    const { getByTestId } = queryRoot()
    expect(getByTestId('info')).toBeInTheDocument()
  })
})
