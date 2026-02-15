import { createFileRoute } from '@tanstack/react-router'
import { LynxWelcome, lynxQueryOptions } from '@/screens/lynx-welcome'

export const Route = createFileRoute('/lynx')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(lynxQueryOptions),
  component: LynxWelcome,
})
