import type { AppRouter } from '@api/trpc/router'
import { createTRPCClient, httpLink } from '@trpc/client'

// PrimJS (Lynx runtime) lacks FormData and Blob globals.
// tRPC checks `instanceof FormData/Blob` during request serialization.
if (typeof globalThis.FormData === 'undefined') {
  globalThis.FormData = class FormData {} as typeof globalThis.FormData
}
if (typeof globalThis.Blob === 'undefined') {
  globalThis.Blob = class Blob {} as typeof globalThis.Blob
}

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpLink({
      url: __API_URL__,
      // PrimJS fetch (OkHttp 4.9) has two known incompatibilities:
      // 1. AbortSignal causes the request body to be dropped
      // 2. Lowercase header names (e.g. "content-type") are not recognized —
      //    OkHttp bridge requires standard casing ("Content-Type")
      fetch: async (url, opts) => {
        const { signal, ...init } = opts ?? {}
        if (init.method !== 'GET') {
          init.headers = { 'Content-Type': 'application/json' }
        }
        const res = await fetch(url, init)
        const text = await res.text()
        return {
          ok: res.ok,
          status: res.status,
          headers: res.headers,
          json: () => Promise.resolve(JSON.parse(text)),
        } as unknown as Response
      },
    }),
  ],
})
