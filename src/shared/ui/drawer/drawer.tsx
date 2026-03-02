import type { ReactNode } from '@lynx-js/react'
import type { MainThread } from '@lynx-js/types'
import { useMainThreadRef } from '@lynx-js/react'
import { joinCss } from '@/shared/lib/css-utils'
import * as css from './drawer.module.scss'

const SNAP_DURATION = 300
const SNAP_EASING = 'cubic-bezier(0.2, 0, 0, 1)'
const SWIPE_THRESHOLD = 30

type DrawerProps = Omit<JSX.IntrinsicElements['view'], 'children'> & {
  children: ReactNode
  height?: number
  maxHeight?: number
}

export const Drawer = ({
  children,
  className,
  height = 55,
  maxHeight = 80,
  ...restProps
}: DrawerProps) => {
  const drawerRef = useMainThreadRef<MainThread.Element>(null)
  const scrollRef = useMainThreadRef<MainThread.Element>(null)
  const animationRef = useMainThreadRef<MainThread.Animation | null>(null)
  const stateRef = useMainThreadRef({
    currentHeight: height,
    mode: 'drag' as 'drag' | 'scroll',
    scrollTop: 0,
    startHeight: height,
    startY: 0,
  })

  const stops = [height, maxHeight]

  const cancelAnimation = () => {
    'main thread'
    const anim = animationRef.current
    if (!anim) return
    const state = stateRef.current
    drawerRef.current?.setStyleProperty('height', `${state.currentHeight}%`)
    anim.cancel()
    animationRef.current = null
  }

  const updateMode = (target: number) => {
    'main thread'
    const isScroll = target >= maxHeight
    stateRef.current.mode = isScroll ? 'scroll' : 'drag'
    scrollRef.current?.setAttribute('enable-scroll', isScroll)
  }

  const animateToHeight = (target: number) => {
    'main thread'
    cancelAnimation()
    const state = stateRef.current
    const from = state.currentHeight

    state.currentHeight = target
    updateMode(target)

    animationRef.current =
      drawerRef.current?.animate(
        [{ height: `${from}%` }, { height: `${target}%` }],
        { duration: SNAP_DURATION, easing: SNAP_EASING, fill: 'forwards' },
      ) ?? null
  }

  const snapToNearest = (direction: 'up' | 'down') => {
    'main thread'
    const current = stateRef.current.currentHeight

    if (direction === 'up') {
      const target = [...stops].find((stop) => stop > current + 1)
      animateToHeight(target ?? maxHeight)
      return
    }

    const target = [...stops].reverse().find((stop) => stop < current - 1)

    animateToHeight(target ?? height)
  }

  const handleTouchStart = (e: MainThread.TouchEvent) => {
    'main thread'
    const touch = e.touches[0]
    if (!touch) return
    cancelAnimation()
    const state = stateRef.current
    state.startY = touch.clientY
    state.startHeight = state.currentHeight
  }

  const handleTouchMove = (e: MainThread.TouchEvent) => {
    'main thread'
    const touch = e.touches[0]
    if (!touch) return
    const state = stateRef.current

    if (state.mode === 'scroll') return

    const screenHeight = SystemInfo.pixelHeight / SystemInfo.pixelRatio
    const deltaY = state.startY - touch.clientY
    const deltaPercent = (deltaY / screenHeight) * 100
    const newHeight = state.startHeight + deltaPercent

    const clampedHeight = Math.min(maxHeight, Math.max(height, newHeight))

    state.currentHeight = clampedHeight
    drawerRef.current?.setStyleProperty('height', `${clampedHeight}%`)
  }

  const handleTouchEnd = (e: MainThread.TouchEvent) => {
    'main thread'
    const touch = e.changedTouches[0]
    if (!touch) return
    const state = stateRef.current
    const deltaY = state.startY - touch.clientY

    const isScrollSwipeDown =
      state.mode === 'scroll' &&
      state.scrollTop <= 0 &&
      deltaY < -SWIPE_THRESHOLD

    if (isScrollSwipeDown) {
      snapToNearest('down')
      return
    }

    if (state.mode === 'scroll') return

    if (Math.abs(deltaY) < SWIPE_THRESHOLD) {
      const closest = [...stops].reduce((prev, curr) =>
        Math.abs(curr - state.currentHeight) <
        Math.abs(prev - state.currentHeight)
          ? curr
          : prev,
      )
      animateToHeight(closest)
      return
    }

    snapToNearest(deltaY > 0 ? 'up' : 'down')
  }

  const handleScroll = (e: { detail: { scrollTop: number } }) => {
    'main thread'
    stateRef.current.scrollTop = e.detail.scrollTop
  }

  return (
    <view
      {...restProps}
      className={joinCss(css.root, className)}
      main-thread:ref={drawerRef}
      style={{ height: `${height}%`, maxHeight: `${maxHeight}%` }}
      main-thread:bindtouchstart={handleTouchStart}
      main-thread:bindtouchmove={handleTouchMove}
      main-thread:bindtouchend={handleTouchEnd}
    >
      <view className={css.handleArea}>
        <view className={css.handle} />
      </view>
      <scroll-view
        className={css.content}
        enable-scroll={false}
        main-thread:ref={scrollRef}
        scroll-y
        main-thread:bindscroll={handleScroll}
      >
        {children}
      </scroll-view>
    </view>
  )
}
