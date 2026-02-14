if (typeof globalThis.window === 'undefined') {
  // @ts-expect-error — minimal shim, RouterCore accesses window directly
  globalThis.window = globalThis
}

if (typeof globalThis.self === 'undefined') {
  // @ts-expect-error — minimal shim, RouterCore assigns self.__TSR_ROUTER__
  globalThis.self = globalThis
}
