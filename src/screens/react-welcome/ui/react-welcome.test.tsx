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

describe('ReactWelcome', () => {
  test('renders title and subtitle', async () => {
    const { ReactWelcome } = await import('./react-welcome')
    render(<ReactWelcome />)

    const { getByText } = queryRoot()
    expect(getByText('React')).toBeInTheDocument()
    expect(getByText('on Lynx')).toBeInTheDocument()
  })

  test('logo tap navigates to /lynx', async () => {
    const { ReactWelcome } = await import('./react-welcome')
    render(<ReactWelcome />)

    const { getByTestId } = queryRoot()
    fireEvent.tap(getByTestId('logo'))

    expect(navigateMock).toHaveBeenCalledWith({ to: '/lynx' })
  })
})
