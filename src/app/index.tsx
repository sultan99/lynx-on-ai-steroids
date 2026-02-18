import '@/shared/config/shims/window.js'
import 'url-search-params-polyfill'
import '@/shared/ui/font/font.scss'
import '@/shared/ui/tokens.scss'
import '@lynx-js/preact-devtools'
import '@lynx-js/react/debug'
import { root } from '@lynx-js/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { queryClient } from './query-client'
import { router } from './routes/router'

root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
