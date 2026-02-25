import { useCallback } from '@lynx-js/react'
import { useNavigate } from '@tanstack/react-router'
import { useTimeout } from '@/shared/lib/hooks/use-timeout'
import heroImage from '../assets/donuts.png'
import * as css from './onboarding.module.scss'

export const OnboardingScreen = () => {
  const navigate = useNavigate()

  const goToHome = useCallback(() => {
    navigate({ to: '/home' })
  }, [navigate])

  useTimeout(goToHome, 3000)

  return (
    <view className={css.screen} bindtap={goToHome}>
      <image className={css.hero} auto-size mode='aspectFill' src={heroImage} />
      <view className={css.content}>
        <text className={css.tagline}>
          Indulge in Joyful{'\n'}Circles of Flavor with{'\n'}Doughnut Delights!
        </text>
      </view>
    </view>
  )
}
