import { createFileRoute } from '@tanstack/react-router'
import { ReactWelcome, reactQueryOptions } from '@/screens/react-welcome'

export const Route = createFileRoute('/react')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(reactQueryOptions),
  component: ReactWelcome,
})
