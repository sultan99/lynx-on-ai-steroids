import { useQuery } from '@tanstack/react-query'
import { Screen } from '@/shared/ui'
import reactLogo from '@/shared/ui/assets/react-logo.png'
import { reactQueryOptions } from '../api/react-query'
import * as css from './react-welcome.module.css'

export const ReactWelcome = () => {
  useQuery(reactQueryOptions)

  return (
    <Screen
      logoClassName={css.logoReact}
      logoSrc={reactLogo}
      navigateTo='/lynx'
      slideDirection='right'
    >
      <text className={css.title}>React</text>
      <text className={css.subtitle}>on Lynx</text>
    </Screen>
  )
}
