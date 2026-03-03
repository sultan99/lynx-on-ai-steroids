import { createFileRoute } from '@tanstack/react-router'
import { bakeryListQueryOptions } from '@/entities/bakery'
import { donutListQueryOptions } from '@/entities/donut'
import { OnboardingScreen } from '@/screens/onboarding'

export const Route = createFileRoute('/onboarding')({
  component: OnboardingScreen,
  loader: ({ context: { queryClient } }) =>
    Promise.all([
      queryClient.ensureQueryData(bakeryListQueryOptions),
      queryClient.ensureQueryData(donutListQueryOptions),
    ]),
})
