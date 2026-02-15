import { queryOptions } from '@tanstack/react-query'

export const reactQueryOptions = queryOptions({
  queryKey: ['route', 'react'],
  queryFn: () =>
    new Promise<{ message: string }>((resolve) => {
      setTimeout(() => resolve({ message: 'Hello from React' }), 100)
    }),
})
