import { useCallback, useEffect, useState } from '@lynx-js/react'
import * as css from './app.module.css'
import arrow from './assets/arrow.png'
import lynxLogo from './assets/lynx-logo.png'
import reactLynxLogo from './assets/react-logo.png'

export function App(props: { onRender?: () => void }) {
  const [alterLogo, setAlterLogo] = useState(false)

  useEffect(() => {
    console.info('Hello, ReactLynx')
  }, [])
  props.onRender?.()

  const onTap = useCallback(() => {
    'background only'
    setAlterLogo((prevAlterLogo) => !prevAlterLogo)
  }, [])

  return (
    <view>
      <view className={css.background} />
      <view className={css.app}>
        <view className={css.banner}>
          <view className={css.logo} bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className={css.logoReact} />
            ) : (
              <image src={lynxLogo} className={css.logoLynx} />
            )}
          </view>
          <text className={css.title}>React</text>
          <text className={css.subtitle}>on Lynx</text>
        </view>
        <view className={css.content}>
          <image src={arrow} className={css.arrow} />
          <text className={css.description}>Tap the logo and have fun!</text>
          <text className={css.hint}>Hello world!</text>
        </view>
        <view style={{ flex: 1 }} />
      </view>
    </view>
  )
}
