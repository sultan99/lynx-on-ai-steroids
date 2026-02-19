import '@testing-library/jest-dom'
import { fireEvent, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test-utils'
import { glyphMap } from '../icon/glyph-map'
import { BottomNavigationBar } from './bottom-navigation-bar'

const mockNavigate = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}))

describe('BottomNavigationBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('navigates to home on tap', () => {
    render(<BottomNavigationBar activeTab='cart' />)
    const { getByText } = queryRoot()
    fireEvent.tap(getByText(glyphMap.newspaper))
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/home' })
  })
})
