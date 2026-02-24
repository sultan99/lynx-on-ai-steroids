import { useCallback, useRef, useState } from '@lynx-js/react'

const DEBOUNCE_MS = 300

export const useSearch = () => {
  const [query, setQuery] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleInput = useCallback((value: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setQuery(value), DEBOUNCE_MS)
  }, [])

  return { handleInput, query }
}
