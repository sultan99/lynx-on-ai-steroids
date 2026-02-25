import { useCallback } from '@lynx-js/react'
import { useNavigate } from '@tanstack/react-router'
import { useTimeout } from '@/shared/lib/hooks/use-timeout'
import donutsImage from '../assets/donuts.png'
import logoImage from '../assets/logo.png'
import * as css from './splash.module.scss'

export const SplashScreen = () => {
  const navigate = useNavigate()

  const goToOnboarding = useCallback(() => {
    navigate({ to: '/onboarding' })
  }, [navigate])

  useTimeout(goToOnboarding, 3000)

  return (
    <view className={css.screen} bindtap={goToOnboarding}>
      <view className={css.brand}>
        <image className={css.logo} src={logoImage} />
        <text className={css.title}>Donut Delights</text>
      </view>
      <image
        auto-size
        className={css.donuts}
        mode='aspectFill'
        src={donutsImage}
      />
    </view>
  )
}
