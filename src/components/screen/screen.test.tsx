import '@testing-library/jest-dom'
import {
  fireEvent,
  getQueriesForElement,
  render,
} from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Screen } from './screen'

const navigateMock = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => navigateMock,
}))

const queryRoot = () => {
  const root = elementTree.root
  if (!root) throw new Error('root not rendered')
  return getQueriesForElement(root)
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Screen', () => {
  test('renders children', () => {
    render(
      <Screen logoClassName='logo' logoSrc='/logo.png' navigateTo='/react'>
        <text>Hello</text>
      </Screen>,
    )
    const { getByText } = queryRoot()
    expect(getByText('Hello')).toBeInTheDocument()
  })

  test('renders logo image', () => {
    render(
      <Screen logoClassName='logo' logoSrc='/logo.png' navigateTo='/react'>
        <text>Title</text>
      </Screen>,
    )
    const root = elementTree.root
    if (!root) throw new Error('root not rendered')
    const image = root.querySelector('image.logo')
    expect(image).toBeTruthy()
  })

  test('navigates on logo tap', () => {
    render(
      <Screen logoClassName='logo' logoSrc='/logo.png' navigateTo='/react'>
        <text>Title</text>
      </Screen>,
    )
    const root = elementTree.root
    if (!root) throw new Error('root not rendered')

    const image = root.querySelector('image.logo')
    if (!image) throw new Error('logo image not found')
    const logoView = image.parentElement
    if (!logoView) throw new Error('logo view not found')
    fireEvent.tap(logoView)

    expect(navigateMock).toHaveBeenCalledWith({ to: '/react' })
  })

  test('navigates to correct route', () => {
    render(
      <Screen logoClassName='logo' logoSrc='/logo.png' navigateTo='/lynx'>
        <text>Title</text>
      </Screen>,
    )
    const root = elementTree.root
    if (!root) throw new Error('root not rendered')

    const image = root.querySelector('image.logo')
    if (!image) throw new Error('logo image not found')
    const logoView = image.parentElement
    if (!logoView) throw new Error('logo view not found')
    fireEvent.tap(logoView)

    expect(navigateMock).toHaveBeenCalledWith({ to: '/lynx' })
  })
})
