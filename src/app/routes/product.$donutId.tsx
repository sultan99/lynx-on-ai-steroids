import { createFileRoute } from '@tanstack/react-router'
import { donutDetailQueryOptions } from '@/entities/donut'
import { reviewListQueryOptions } from '@/entities/review'
import { ProductDetailScreen } from '@/screens/product-detail'

export const Route = createFileRoute('/product/$donutId')({
  component: ProductDetailScreen,
  loader: ({ context: { queryClient }, params: { donutId } }) =>
    Promise.all([
      queryClient.ensureQueryData(donutDetailQueryOptions(donutId)),
      queryClient.ensureQueryData(reviewListQueryOptions(donutId)),
    ]),
})
