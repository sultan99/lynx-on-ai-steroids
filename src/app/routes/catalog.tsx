import { createFileRoute } from '@tanstack/react-router'
import { donutListQueryOptions } from '@/entities/donut'
import { CatalogScreen } from '@/screens/catalog'

export const Route = createFileRoute('/catalog')({
  component: CatalogScreen,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(donutListQueryOptions),
})
