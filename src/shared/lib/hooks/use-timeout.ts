import { useEffect, useRef } from '@lynx-js/react'

export const useTimeout = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback)

  savedCallback.current = callback

  useEffect(() => {
    if (delay === null) return undefined

    const id = setTimeout(() => savedCallback.current(), delay)
    return () => clearTimeout(id)
  }, [delay])
}
