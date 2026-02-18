import { useInitData } from '@lynx-js/react'

export const useStatusBarHeight = (unit?: string) => {
  const height = useInitData()?.statusBarHeight ?? 0
  return unit ? `${height}${unit}` : height
}
