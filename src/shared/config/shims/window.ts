if (typeof globalThis.window === 'undefined') {
  // @ts-expect-error — minimal shim, RouterCore accesses window directly
  globalThis.window = globalThis
}

if (typeof globalThis.self === 'undefined') {
  // @ts-expect-error — minimal shim, RouterCore assigns self.__TSR_ROUTER__
  globalThis.self = globalThis
}

if (typeof Promise.allSettled !== 'function') {
  Promise.allSettled = <T>(
    promises: Array<T | PromiseLike<T>>,
  ): Promise<Array<PromiseSettledResult<Awaited<T>>>> =>
    Promise.all(
      promises.map((p) =>
        Promise.resolve(p).then(
          (value) =>
            ({ status: 'fulfilled' as const, value }) as PromiseFulfilledResult<
              Awaited<T>
            >,
          (reason) =>
            ({ status: 'rejected' as const, reason }) as PromiseRejectedResult,
        ),
      ),
    )
}

if (typeof globalThis.Response === 'undefined') {
  // @ts-expect-error — minimal stub for redirect()/isRedirect()
  globalThis.Response = class Response {
    status: number
    headers: Headers
    options?: unknown
    constructor(
      _body: unknown,
      init?: { status?: number; headers?: Headers | Record<string, string> },
    ) {
      this.status = init?.status ?? 200
      if (init?.headers instanceof Headers) {
        this.headers = init.headers
      } else {
        this.headers = new Headers(
          init?.headers && typeof init.headers === 'object'
            ? init.headers
            : undefined,
        )
      }
    }
  }
}

if (typeof globalThis.Headers === 'undefined') {
  // @ts-expect-error — minimal stub for redirect()
  globalThis.Headers = class Headers {
    private map = new Map<string, string>()
    constructor(init?: Record<string, string>) {
      if (init && typeof init === 'object') {
        for (const [k, v] of Object.entries(init)) {
          this.map.set(k.toLowerCase(), v)
        }
      }
    }
    get(name: string) {
      return this.map.get(name.toLowerCase()) ?? null
    }
    set(name: string, value: string) {
      this.map.set(name.toLowerCase(), value)
    }
  }
}
