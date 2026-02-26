import { createFileRoute } from '@tanstack/react-router'
import { bakeryListQueryOptions } from '@/entities/bakery'
import { categoryListQueryOptions } from '@/entities/category'
import { donutListQueryOptions } from '@/entities/donut'
import { userQueryOptions } from '@/entities/user'
import { HomeScreen } from '@/screens/home'

export const Route = createFileRoute('/home')({
  component: HomeScreen,
  loader: ({ context: { queryClient } }) =>
    Promise.all([
      queryClient.ensureQueryData(userQueryOptions),
      queryClient.ensureQueryData(categoryListQueryOptions),
      queryClient.ensureQueryData(bakeryListQueryOptions),
      queryClient.ensureQueryData(donutListQueryOptions),
    ]),
})
