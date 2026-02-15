import { queryOptions } from '@tanstack/react-query'

export const lynxQueryOptions = queryOptions({
  queryKey: ['route', 'lynx'],
  queryFn: () =>
    new Promise<{ message: string }>((resolve) => {
      setTimeout(() => resolve({ message: 'Hello from Lynx' }), 100)
    }),
})
