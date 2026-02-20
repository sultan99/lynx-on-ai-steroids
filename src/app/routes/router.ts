import type { QueryClient } from '@tanstack/react-query'
import { createMemoryHistory, createRouter } from '@tanstack/react-router'
import { queryClient } from '../query-client'
import { routeTree } from './__route-tree.gen'

export type RouterContext = {
  queryClient: QueryClient
}

const memoryHistory = createMemoryHistory({
  initialEntries: ['/home'],
})

export const router = createRouter({
  routeTree,
  history: memoryHistory,
  isServer: false,
  context: { queryClient },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
