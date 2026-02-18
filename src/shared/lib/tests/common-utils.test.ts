import { describe, expect, test } from 'vitest'
import { toCamel, toKebab } from '../common-utils'

describe('toKebab', () => {
  test('converts camelCase to kebab-case', () => {
    expect(toKebab('buttonColor')).toBe('button-color')
  })

  test('converts multiple uppercase letters', () => {
    expect(toKebab('buttonColorPrimary')).toBe('button-color-primary')
  })

  test('returns lowercase string unchanged', () => {
    expect(toKebab('button')).toBe('button')
  })

  test('returns empty string unchanged', () => {
    expect(toKebab('')).toBe('')
  })

  test('handles leading uppercase', () => {
    expect(toKebab('Button')).toBe('-button')
  })
})

describe('toCamel', () => {
  test('converts kebab-case to camelCase', () => {
    expect(toCamel('button-color')).toBe('buttonColor')
  })

  test('converts multiple hyphens', () => {
    expect(toCamel('button-color-primary')).toBe('buttonColorPrimary')
  })

  test('returns string without hyphens unchanged', () => {
    expect(toCamel('button')).toBe('button')
  })

  test('returns empty string unchanged', () => {
    expect(toCamel('')).toBe('')
  })
})
