import type { ReactNode } from '@lynx-js/react'
import { useCallback } from '@lynx-js/react'
import { useNavigate } from '@tanstack/react-router'
import arrow from '@/assets/arrow.png'
import { Icon } from '@/components/icon/icon'
import * as css from './screen.module.css'

type ScreenProps = {
  children: ReactNode
  logoSrc: string
  logoClassName: string
  navigateTo: string
  slideDirection?: 'left' | 'right'
}

export const Screen = ({
  children,
  logoSrc,
  logoClassName,
  navigateTo,
  slideDirection,
}: ScreenProps) => {
  const navigate = useNavigate()

  const onTap = useCallback(() => {
    navigate({ to: navigateTo })
  }, [navigate, navigateTo])

  return (
    <view
      className={
        slideDirection === 'left'
          ? css.slideFromLeft
          : slideDirection === 'right'
            ? css.slideFromRight
            : undefined
      }
    >
      <view className={css.background} />
      <view className={css.screen}>
        <view className={css.banner}>
          <view className={css.logo} data-testid="logo" bindtap={onTap}>
            <image className={logoClassName} src={logoSrc} />
          </view>
          {children}
        </view>
        <view className={css.content}>
          <image className={css.arrow} src={arrow} />
          <text className={css.description}>Tap the logo and have fun!</text>
          <view className={css.hint}>
            <Icon color='gray' glyph='book' size='13px' />
            <text>Read more about Lynx</text>
          </view>
        </view>
        <view className={css.spacer} />
      </view>
    </view>
  )
}
