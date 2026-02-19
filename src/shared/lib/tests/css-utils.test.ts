import { describe, expect, test } from 'vitest'
import { cssUnit, joinCss, pickCss } from '../css-utils'

const css: Record<string, string> = {
  button: 'button_hash',
  buttonColor: 'button-color_hash',
  buttonColorPrimary: 'button-color-primary_hash',
  buttonColorSecondary: 'button-color-secondary_hash',
  buttonIsDisabled: 'button-is-disabled_hash',
  icon: 'icon_hash',
  iconSizeSmall: 'icon-size-small_hash',
  iconSizeMedium: 'icon-size-medium_hash',
  iconSizeLarge: 'icon-size-large_hash',
  caption: 'caption_hash',
  tabIcon: 'tab-icon_hash',
  tabIconIsActive: 'tab-icon-is-active_hash',
}

describe('cssUnit', () => {
  test('appends unit to number value', () => {
    expect(cssUnit(42, 'px')).toBe('42px')
  })

  test('appends unit to string value', () => {
    expect(cssUnit('90', 'deg')).toBe('90deg')
  })

  test('returns empty string for undefined', () => {
    expect(cssUnit(undefined, 'px')).toBe('')
  })

  test('handles zero value', () => {
    expect(cssUnit(0, 'px')).toBe('0px')
  })
})

describe('joinCss', () => {
  test('joins multiple class names', () => {
    expect(joinCss('foo', 'bar', 'baz')).toBe('foo bar baz')
  })

  test('filters out undefined values', () => {
    expect(joinCss('foo', undefined, 'bar')).toBe('foo bar')
  })

  test('returns empty string when all values are undefined', () => {
    expect(joinCss(undefined, undefined)).toBe('')
  })

  test('returns single class name as-is', () => {
    expect(joinCss('foo')).toBe('foo')
  })
})

describe('pickCss', () => {
  test('returns root class only when called with no props', () => {
    const cssCaption = pickCss(css, 'caption')

    expect(cssCaption()).toBe('caption_hash')
  })

  test('includes rest classes', () => {
    const cssButton = pickCss(css, 'button', 'button-color')

    expect(cssButton()).toBe('button_hash button-color_hash')
  })

  test('appends string prop value as chain name', () => {
    const cssButton = pickCss(css, 'button', 'button-color')

    expect(cssButton({ color: 'primary' })).toBe(
      'button_hash button-color_hash button-color-primary_hash',
    )

    expect(cssButton({ color: 'secondary' })).toBe(
      'button_hash button-color_hash button-color-secondary_hash',
    )
  })

  test('appends boolean prop as kebab-case modifier', () => {
    const cssButton = pickCss(css, 'button', 'button-color')

    expect(cssButton({ isDisabled: true })).toBe(
      'button_hash button-color_hash button-is-disabled_hash',
    )
  })

  test('skips false boolean props', () => {
    const cssButton = pickCss(css, 'button', 'button-color')

    expect(cssButton({ isDisabled: false })).toBe(
      'button_hash button-color_hash',
    )
  })

  test('skips undefined props', () => {
    const cssButton = pickCss(css, 'button', 'button-color')

    expect(cssButton({ color: undefined })).toBe(
      'button_hash button-color_hash',
    )
  })

  test('combines string and boolean props', () => {
    const cssButton = pickCss(css, 'button', 'button-color')

    expect(cssButton({ color: 'secondary', isDisabled: true })).toBe(
      'button_hash button-color_hash button-color-secondary_hash button-is-disabled_hash',
    )
  })

  test('works with root class and string prop without rest', () => {
    const cssIcon = pickCss(css, 'icon')

    expect(cssIcon({ size: 'small' })).toBe('icon_hash icon-size-small_hash')
    expect(cssIcon({ size: 'large' })).toBe('icon_hash icon-size-large_hash')
  })

  test('resolves kebab-case root class via camelCase lookup', () => {
    const cssTabIcon = pickCss(css, 'tab-icon')

    expect(cssTabIcon()).toBe('tab-icon_hash')
    expect(cssTabIcon({ isActive: true })).toBe(
      'tab-icon_hash tab-icon-is-active_hash',
    )
  })

  test('skips classes not found in css module', () => {
    const cssButton = pickCss(css, 'button', 'button-color')

    expect(cssButton({ color: 'nonexistent' })).toBe(
      'button_hash button-color_hash',
    )
  })

  test('appends extra class names as-is', () => {
    const cssIcon = pickCss(css, 'icon')

    expect(cssIcon({ size: 'small' }, 'external-class')).toBe(
      'icon_hash icon-size-small_hash external-class',
    )
  })

  test('skips undefined extra class names', () => {
    const cssIcon = pickCss(css, 'icon')

    expect(cssIcon({ size: 'small' }, undefined)).toBe(
      'icon_hash icon-size-small_hash',
    )
  })
})
