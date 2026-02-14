import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import reactLogo from '@/assets/react-logo.png'
import { Screen } from '@/components'
import * as css from '@/components/screen/screen.module.css'

const reactQueryOptions = queryOptions({
  queryKey: ['route', 'react'],
  queryFn: () =>
    new Promise<{ message: string }>((resolve) => {
      setTimeout(() => resolve({ message: 'Hello from React' }), 100)
    }),
})

const ReactRoute = () => {
  useQuery(reactQueryOptions)

  return (
    <Screen
      logoClassName={css.logoReact}
      logoSrc={reactLogo}
      navigateTo='/lynx'
      slideDirection='right'
    >
      <text className={css.title}>React</text>
      <text className={css.subtitle}>on Lynx</text>
    </Screen>
  )
}

export const Route = createFileRoute('/react')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(reactQueryOptions),
  component: ReactRoute,
})
