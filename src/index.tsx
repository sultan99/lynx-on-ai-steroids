import './shims/window.js'
import 'url-search-params-polyfill'
import './styles/tokens.css'
import '@lynx-js/preact-devtools'
import '@lynx-js/react/debug'
import { root } from '@lynx-js/react'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router.js'

root.render(<RouterProvider router={router} />)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
