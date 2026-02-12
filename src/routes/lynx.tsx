import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import lynxLogo from '@/assets/lynx-logo.png'
import { Screen } from '@/components'
import * as css from '@/components/screen/screen.module.css'

const lynxQueryOptions = queryOptions({
  queryKey: ['route', 'lynx'],
  queryFn: () =>
    new Promise<{ message: string }>((resolve) => {
      setTimeout(() => resolve({ message: 'Hello from Lynx' }), 100)
    }),
})

export const Route = createFileRoute('/lynx')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(lynxQueryOptions),
  component: LynxRoute,
})

let isFirstVisit = true

function LynxRoute() {
  const { data } = useQuery(lynxQueryOptions)
  console.log('[/lynx]', data?.message)

  const slideDirection = isFirstVisit ? undefined : ('left' as const)
  isFirstVisit = false

  return (
    <Screen
      logoClassName={css.logoLynx}
      logoSrc={lynxLogo}
      navigateTo='/react'
      slideDirection={slideDirection}
    >
      <text className={css.title}>Lynx</text>
      <text className={css.subtitle}>on React</text>
    </Screen>
  )
}
