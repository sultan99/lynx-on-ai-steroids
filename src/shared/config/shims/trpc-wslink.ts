// Stub for @trpc/client's wsLink chunk.
// tRPC's barrel import eagerly loads wsLink which pulls in @lynx-js/websocket.
// That module crashes on PrimJS main thread (lynx.getJSModule unavailable).
// We only use httpBatchLink, so wsLink exports are replaced with no-ops.
export const createWSClient = () => {
  throw new Error('WebSocket is not supported in this environment')
}
export const wsLink = () => {
  throw new Error('WebSocket is not supported in this environment')
}
export const jsonEncoder = { encode: JSON.stringify, decode: JSON.parse }
export const resultOf = () => null
