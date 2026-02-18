import { useRef } from '@lynx-js/react'

export const toKebab = (str: string) =>
  str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)

export const toCamel = (str: string) =>
  str.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())

export const useId = () => useRef(Math.random().toString(36).slice(2)).current
