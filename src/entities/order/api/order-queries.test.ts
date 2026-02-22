import { QueryClient } from '@tanstack/react-query'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { orders } from './mock-data'
import { orderDetailQueryOptions, orderKeys } from './order-queries'

let queryClient: QueryClient

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
})

afterEach(() => {
  vi.useRealTimers()
})

describe('orderKeys', () => {
  test('all returns base orders key', () => {
    expect(orderKeys.all).toEqual(['orders'])
  })

  test('detail returns scoped detail key with id', () => {
    expect(orderKeys.detail('42')).toEqual(['orders', 'detail', '42'])
  })

  test('detail keys are unique per id', () => {
    expect(orderKeys.detail('1')).not.toEqual(orderKeys.detail('2'))
  })
})

describe('orderDetailQueryOptions', () => {
  test('uses the detail query key for the given id', () => {
    const options = orderDetailQueryOptions('1')
    expect(options.queryKey).toEqual(['orders', 'detail', '1'])
  })

  test('queryFn resolves with the matching order', async () => {
    const firstOrder = orders[0]
    const options = orderDetailQueryOptions(firstOrder?.id ?? '1')

    const fetchPromise = queryClient.fetchQuery(options)
    await vi.runAllTimersAsync()
    const data = await fetchPromise

    expect(data).toEqual(firstOrder)
  })

  test('queryFn resolves with undefined for an unknown id', async () => {
    const options = orderDetailQueryOptions('nonexistent-id')

    const fetchPromise = queryClient.fetchQuery(options).catch(() => undefined)
    await vi.runAllTimersAsync()
    const data = await fetchPromise

    expect(data).toBeUndefined()
  })

  test('resolved order has all required fields', async () => {
    const firstOrder = orders[0]
    const options = orderDetailQueryOptions(firstOrder?.id ?? '1')

    const fetchPromise = queryClient.fetchQuery(options)
    await vi.runAllTimersAsync()
    const data = await fetchPromise

    expect(data).toMatchObject({
      courier: {
        avatar: expect.any(String),
        id: expect.any(String),
        name: expect.any(String),
        phone: expect.any(String),
      },
      deliveryAddress: expect.any(String),
      deliveryTime: expect.any(String),
      estimatedTime: expect.any(Number),
      id: expect.any(String),
      status: expect.stringMatching(/^(preparing|in-transit|delivered)$/),
    })
  })

  test('each id produces an independent query key', () => {
    const keyA = orderDetailQueryOptions('1').queryKey
    const keyB = orderDetailQueryOptions('2').queryKey

    expect(keyA).not.toEqual(keyB)
    expect(keyA[keyA.length - 1]).toBe('1')
    expect(keyB[keyB.length - 1]).toBe('2')
  })
})

describe('orders mock data', () => {
  test('is a non-empty array', () => {
    expect(orders.length).toBeGreaterThan(0)
  })

  test('every order has a valid status', () => {
    const validStatuses = ['preparing', 'in-transit', 'delivered']
    orders.forEach((order) => {
      expect(validStatuses).toContain(order.status)
    })
  })

  test('every order has a courier with all required fields', () => {
    orders.forEach((order) => {
      expect(order.courier).toMatchObject({
        avatar: expect.any(String),
        id: expect.any(String),
        name: expect.any(String),
        phone: expect.any(String),
      })
    })
  })

  test('every order has a positive estimatedTime', () => {
    orders.forEach((order) => {
      expect(order.estimatedTime).toBeGreaterThan(0)
    })
  })

  test('order ids are unique', () => {
    const ids = orders.map((o) => o.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
