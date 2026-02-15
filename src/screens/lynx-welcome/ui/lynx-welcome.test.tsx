import '@testing-library/jest-dom'
import { fireEvent, render } from '@lynx-js/react/testing-library'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { queryRoot } from '@/shared/lib/test'

const navigateMock = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => navigateMock,
}))

vi.mock('@tanstack/react-query', () => ({
  queryOptions: (opts: Record<string, unknown>) => opts,
  useQuery: () => ({ data: { message: 'Hello' } }),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('LynxWelcome', () => {
  test('renders title and subtitle', async () => {
    const { LynxWelcome } = await import('./lynx-welcome')
    render(<LynxWelcome />)

    const { getByText } = queryRoot()
    expect(getByText('Lynx')).toBeInTheDocument()
    expect(getByText('on React')).toBeInTheDocument()
  })

  test('renders shared content', async () => {
    const { LynxWelcome } = await import('./lynx-welcome')
    render(<LynxWelcome />)

    const { getByText } = queryRoot()
    expect(getByText('Tap the logo and have fun!')).toBeInTheDocument()
    expect(getByText('Read more about Lynx')).toBeInTheDocument()
  })

  test('logo tap navigates to /react', async () => {
    const { LynxWelcome } = await import('./lynx-welcome')
    render(<LynxWelcome />)

    const { getByTestId } = queryRoot()
    fireEvent.tap(getByTestId('logo'))

    expect(navigateMock).toHaveBeenCalledWith({ to: '/react' })
  })
})
