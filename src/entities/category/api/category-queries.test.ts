import { QueryClient } from '@tanstack/react-query'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { categoryKeys, categoryListQueryOptions } from './category-queries'
import { categories } from './mock-data'

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

describe('categoryKeys', () => {
  test('all returns base categories key', () => {
    expect(categoryKeys.all).toEqual(['categories'])
  })

  test('list returns scoped list key', () => {
    expect(categoryKeys.list()).toEqual(['categories', 'list'])
  })
})

describe('categoryListQueryOptions', () => {
  test('uses the list query key', () => {
    expect(categoryListQueryOptions.queryKey).toEqual(['categories', 'list'])
  })

  test('queryFn resolves with the full category list', async () => {
    const fetchPromise = queryClient.fetchQuery(categoryListQueryOptions)
    await vi.runAllTimersAsync()
    const data = await fetchPromise

    expect(data).toEqual(categories)
  })

  test('resolved list contains the expected number of categories', async () => {
    const fetchPromise = queryClient.fetchQuery(categoryListQueryOptions)
    await vi.runAllTimersAsync()
    const data = await fetchPromise

    expect(data).toHaveLength(categories.length)
  })

  test('each category has all required fields', async () => {
    const fetchPromise = queryClient.fetchQuery(categoryListQueryOptions)
    await vi.runAllTimersAsync()
    const data = await fetchPromise

    data.forEach((category) => {
      expect(category).toMatchObject({
        iconGlyph: expect.any(String),
        id: expect.any(String),
        name: expect.any(String),
      })
    })
  })

  test('category ids are unique', async () => {
    const fetchPromise = queryClient.fetchQuery(categoryListQueryOptions)
    await vi.runAllTimersAsync()
    const data = await fetchPromise

    const ids = data.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('categories mock data', () => {
  test('is a non-empty array', () => {
    expect(categories.length).toBeGreaterThan(0)
  })

  test('every entry has a non-empty iconGlyph', () => {
    categories.forEach((category) => {
      expect(category.iconGlyph.length).toBeGreaterThan(0)
    })
  })

  test('every entry has a non-empty name', () => {
    categories.forEach((category) => {
      expect(category.name.length).toBeGreaterThan(0)
    })
  })
})
