import '@testing-library/jest-dom'
import { fireEvent, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '../utils/test'

const navigateMock = vi.fn()
const navigateComponentMock = vi.fn((_props: Record<string, unknown>) => null)

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => navigateMock,
  createFileRoute: (_path: string) => (options: Record<string, unknown>) => ({
    options,
  }),
  Navigate: (props: Record<string, unknown>) => navigateComponentMock(props),
}))

vi.mock('@tanstack/react-query', () => ({
  queryOptions: (opts: Record<string, unknown>) => opts,
  useQuery: () => ({ data: { message: 'Hello' } }),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('App routes', () => {
  test('/ redirects to /lynx', async () => {
    const { Route } = await import('./index')
    const Component = Route.options.component
    if (!Component) throw new Error('component not defined')
    render(<Component />)

    expect(navigateComponentMock).toHaveBeenCalledWith(
      expect.objectContaining({ to: '/lynx' }),
    )
  })

  test('/lynx renders title and subtitle', async () => {
    const { Route } = await import('./lynx')
    const Component = Route.options.component
    if (!Component) throw new Error('component not defined')
    render(<Component />)

    const { getByText } = queryRoot()
    expect(getByText('Lynx')).toBeInTheDocument()
    expect(getByText('on React')).toBeInTheDocument()
  })

  test('/react renders title and subtitle', async () => {
    const { Route } = await import('./react')
    const Component = Route.options.component
    if (!Component) throw new Error('component not defined')
    render(<Component />)

    const { getByText } = queryRoot()
    expect(getByText('React')).toBeInTheDocument()
    expect(getByText('on Lynx')).toBeInTheDocument()
  })

  test('routes render shared content', async () => {
    const { Route } = await import('./lynx')
    const Component = Route.options.component
    if (!Component) throw new Error('component not defined')
    render(<Component />)

    const { getByText } = queryRoot()
    expect(getByText('Tap the logo and have fun!')).toBeInTheDocument()
    expect(getByText('Read more about Lynx')).toBeInTheDocument()
  })

  test('logo tap on /lynx navigates to /react', async () => {
    const { Route } = await import('./lynx')
    const Component = Route.options.component
    if (!Component) throw new Error('component not defined')
    render(<Component />)

    const { getByTestId } = queryRoot()
    fireEvent.tap(getByTestId('logo'))

    expect(navigateMock).toHaveBeenCalledWith({ to: '/react' })
  })

  test('logo tap on /react navigates to /lynx', async () => {
    const { Route } = await import('./react')
    const Component = Route.options.component
    if (!Component) throw new Error('component not defined')
    render(<Component />)

    const { getByTestId } = queryRoot()
    fireEvent.tap(getByTestId('logo'))

    expect(navigateMock).toHaveBeenCalledWith({ to: '/lynx' })
  })
})
