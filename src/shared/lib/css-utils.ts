import { useEffect } from '@lynx-js/react'
import { toCamel, toKebab, useId } from './common-utils'

type CssVars = Record<string, string | undefined>
type CssModule = Record<string, string>
type Props = Record<string, string | boolean | undefined>

export const cssUnit = (value: string | number | undefined, unit: string) =>
  value != null ? `${value}${unit}` : ''

export const useCssVars = (variables: CssVars) => {
  const id = useId()
  const values = Object.values(variables)
  const hasVars = values.some(Boolean)

  useEffect(() => {
    if (!hasVars) return

    const vars = Object.entries(variables)
      .filter(([, value]) => Boolean(value))
      .reduce(
        (acc, [key, value]) =>
          Object.assign(acc, { [`--${toKebab(key)}`]: value }),
        {},
      )
    lynx.getElementById?.(id)?.setProperty(vars)
  }, values)

  return hasVars ? id : undefined
}

const toClassNames =
  (rootClass: string) =>
  ([key, value]: [string, string | boolean | undefined]) =>
    value === true
      ? `${rootClass}-${toKebab(key)}`
      : typeof value === 'string'
        ? `${rootClass}-${toKebab(key)}-${value}`
        : undefined

export const joinCss = (...classNames: (string | undefined)[]) =>
  classNames.filter(Boolean).join(' ')

export const pickCss =
  (css: CssModule, rootClass: string, ...restClasses: (string | undefined)[]) =>
  (props: Props = {}, ...extraClasses: (string | undefined)[]) =>
    [
      rootClass,
      restClasses,
      Object.entries(props).flatMap(toClassNames(rootClass)),
    ]
      .flat()
      .map((key) => key && css[toCamel(key)])
      .filter(Boolean)
      .concat(extraClasses.filter(Boolean))
      .join(' ')
