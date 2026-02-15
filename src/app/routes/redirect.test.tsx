import '@testing-library/jest-dom'
import { render } from '@lynx-js/react/testing-library'
import { beforeEach, expect, test, vi } from 'vitest'

const navigateComponentMock = vi.fn((_props: Record<string, unknown>) => null)

vi.mock('@tanstack/react-router', () => ({
  createFileRoute: (_path: string) => (options: Record<string, unknown>) => ({
    options,
  }),
  Navigate: (props: Record<string, unknown>) => navigateComponentMock(props),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

test('/ redirects to /lynx', async () => {
  const { Route } = await import('./index')
  const Component = Route.options.component
  if (!Component) throw new Error('component not defined')
  render(<Component />)

  expect(navigateComponentMock).toHaveBeenCalledWith(
    expect.objectContaining({ to: '/lynx' }),
  )
})
