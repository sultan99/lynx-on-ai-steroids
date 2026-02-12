import '@testing-library/jest-dom'
import {
  fireEvent,
  getQueriesForElement,
  render,
} from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'

vi.mock('./screen.module.css', () => ({
  background: 'background',
  screen: 'screen',
  banner: 'banner',
  logo: 'logo',
  content: 'content',
  arrow: 'arrow',
  description: 'description',
  hint: 'hint',
  slideFromLeft: 'slide-from-left',
  slideFromRight: 'slide-from-right',
}))

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

  test('applies slide-from-left class when slideDirection is left', () => {
    render(
      <Screen
        logoClassName='logo'
        logoSrc='/logo.png'
        navigateTo='/react'
        slideDirection='left'
      >
        <text>Title</text>
      </Screen>,
    )
    const root = elementTree.root
    if (!root) throw new Error('root not rendered')
    const outerView = root.firstChild as Element
    expect(outerView.getAttribute('class')).toBe('slide-from-left')
  })

  test('applies slide-from-right class when slideDirection is right', () => {
    render(
      <Screen
        logoClassName='logo'
        logoSrc='/logo.png'
        navigateTo='/react'
        slideDirection='right'
      >
        <text>Title</text>
      </Screen>,
    )
    const root = elementTree.root
    if (!root) throw new Error('root not rendered')
    const outerView = root.firstChild as Element
    expect(outerView.getAttribute('class')).toBe('slide-from-right')
  })

  test('does not apply slide class when slideDirection is undefined', () => {
    render(
      <Screen logoClassName='logo' logoSrc='/logo.png' navigateTo='/react'>
        <text>Title</text>
      </Screen>,
    )
    const root = elementTree.root
    if (!root) throw new Error('root not rendered')
    const outerView = root.firstChild as Element
    expect(outerView.getAttribute('class')).not.toMatch(/slide/)
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
