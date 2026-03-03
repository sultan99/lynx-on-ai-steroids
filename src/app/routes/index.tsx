import { createFileRoute } from '@tanstack/react-router'
import { categoryListQueryOptions } from '@/entities/category'
import { userQueryOptions } from '@/entities/user'
import { SplashScreen } from '@/screens/splash'

export const Route = createFileRoute('/')({
  component: SplashScreen,
  loader: ({ context: { queryClient } }) =>
    Promise.all([
      queryClient.ensureQueryData(userQueryOptions),
      queryClient.ensureQueryData(categoryListQueryOptions),
    ]),
})
