// React compat layer for third-party React libraries on Lynx
//
// ReactLynx uses Preact (React 17 API surface). Libraries like TanStack Router
// expect standard React behavior that differs in Lynx's runtime:
//
// 1. useLayoutEffect is a no-op in ReactLynx → remap to useEffect
//    (Transitioner uses useLayoutEffect to trigger router.load)
// 2. Preact's startTransition has devtools hooks that interfere with
//    TanStack Router's state commit chain → use a plain pass-through

// @ts-expect-error — ReactLynx default export typing
// React compat layer for third-party React libraries on Lynx
//
// ReactLynx uses Preact (React 17 API surface). Libraries like TanStack Router
// expect standard React behavior that differs in Lynx's runtime:
//
// 1. useLayoutEffect is a no-op in ReactLynx → remap to useEffect
//    (Transitioner uses useLayoutEffect to trigger router.load)
// 2. Preact's startTransition has devtools hooks that interfere with
//    TanStack Router's state commit chain → use a plain pass-through

import ReactLynx, { useEffect } from '@lynx-js/react'

const startTransition = (fn: () => void) => fn()

const useTransition = (): [boolean, typeof startTransition] => [
  false,
  startTransition,
]

export default Object.assign({}, ReactLynx, {
  startTransition,
  useTransition,
  useLayoutEffect: useEffect,
})

export * from '@lynx-js/react'
export { startTransition, useTransition }
export { useEffect as useLayoutEffect }
