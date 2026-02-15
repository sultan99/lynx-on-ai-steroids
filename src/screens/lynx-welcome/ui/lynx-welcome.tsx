import { useQuery } from '@tanstack/react-query'
import { Screen } from '@/shared/ui'
import lynxLogo from '@/shared/ui/assets/lynx-logo.png'
import { lynxQueryOptions } from '../api/lynx-query'
import * as css from './lynx-welcome.module.css'

let isFirstVisit = true

export const LynxWelcome = () => {
  useQuery(lynxQueryOptions)

  const slideDirection = isFirstVisit ? undefined : 'left'
  isFirstVisit = false

  return (
    <Screen
      logoClassName={css.logoLynx}
      logoSrc={lynxLogo}
      navigateTo='/react'
      slideDirection={slideDirection}
    >
      <text className={css.title}>Lynx</text>
      <text className={css.subtitle}>on React</text>
    </Screen>
  )
}
