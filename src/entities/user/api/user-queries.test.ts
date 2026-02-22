import { QueryClient } from '@tanstack/react-query'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { currentUser } from './mock-data'
import { userKeys, userQueryOptions } from './user-queries'

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

describe('userKeys', () => {
  test('all returns base users key', () => {
    expect(userKeys.all).toEqual(['users'])
  })

  test('current returns scoped current-user key', () => {
    expect(userKeys.current()).toEqual(['users', 'current'])
  })
})

describe('userQueryOptions', () => {
  test('uses the current-user query key', () => {
    expect(userQueryOptions.queryKey).toEqual(['users', 'current'])
  })

  test('queryFn resolves with the current user', async () => {
    const fetchPromise = queryClient.fetchQuery(userQueryOptions)
    await vi.runAllTimersAsync()
    const data = await fetchPromise

    expect(data).toEqual(currentUser)
  })

  test('resolved user has all required fields', async () => {
    const fetchPromise = queryClient.fetchQuery(userQueryOptions)
    await vi.runAllTimersAsync()
    const user = await fetchPromise

    expect(user).toMatchObject({
      avatar: expect.any(String),
      id: expect.any(String),
      location: expect.any(String),
      name: expect.any(String),
      avatarUrl: expect.any(String),
    })
  })

  test('resolved user id is non-empty', async () => {
    const fetchPromise = queryClient.fetchQuery(userQueryOptions)
    await vi.runAllTimersAsync()
    const user = await fetchPromise

    expect(user.id.length).toBeGreaterThan(0)
  })
})

describe('currentUser mock data', () => {
  test('has all required User fields', () => {
    expect(currentUser).toMatchObject({
      avatar: expect.any(String),
      id: expect.any(String),
      location: expect.any(String),
      name: expect.any(String),
      avatarUrl: expect.any(String),
    })
  })

  test('avatarUrl is a valid https URL', () => {
    expect(currentUser.avatarUrl).toMatch(/^https:\/\//)
  })
})
