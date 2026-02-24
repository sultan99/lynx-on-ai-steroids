import { beforeEach, describe, expect, test } from 'vitest'
import { useDonutFavoritesStore } from './use-donut-favorites-store'

const getState = () => useDonutFavoritesStore.getState()

beforeEach(() => {
  useDonutFavoritesStore.setState({ favorites: new Map() })
})

describe('useDonutFavoritesStore', () => {
  test('starts with empty favorites', () => {
    expect(getState().favorites.size).toBe(0)
  })

  test('setFavorite adds a donut to favorites', () => {
    getState().setFavorite('1', true)
    expect(getState().favorites.get('1')).toBe(true)
  })

  test('setFavorite can mark as unfavorited', () => {
    getState().setFavorite('1', false)
    expect(getState().favorites.get('1')).toBe(false)
  })

  test('setFavorite overwrites previous value', () => {
    getState().setFavorite('1', true)
    getState().setFavorite('1', false)
    expect(getState().favorites.get('1')).toBe(false)
  })

  test('setFavorite handles multiple donuts', () => {
    getState().setFavorite('1', true)
    getState().setFavorite('2', false)
    expect(getState().favorites.get('1')).toBe(true)
    expect(getState().favorites.get('2')).toBe(false)
  })

  test('clearFavorite removes a donut from favorites', () => {
    getState().setFavorite('1', true)
    getState().clearFavorite('1')
    expect(getState().favorites.has('1')).toBe(false)
  })

  test('clearFavorite does not affect other donuts', () => {
    getState().setFavorite('1', true)
    getState().setFavorite('2', true)
    getState().clearFavorite('1')
    expect(getState().favorites.has('1')).toBe(false)
    expect(getState().favorites.get('2')).toBe(true)
  })

  test('clearFavorite on non-existent key is a no-op', () => {
    getState().clearFavorite('999')
    expect(getState().favorites.size).toBe(0)
  })
})
