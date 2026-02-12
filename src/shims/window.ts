if (typeof globalThis.window === 'undefined') {
  // @ts-expect-error — minimal shim, RouterCore accesses window directly
  globalThis.window = globalThis
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
    headers: Map<string, string>
    options?: unknown
    constructor(_body: unknown, init?: { status?: number; headers?: unknown }) {
      this.status = init?.status ?? 200
      this.headers = new Map()
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
