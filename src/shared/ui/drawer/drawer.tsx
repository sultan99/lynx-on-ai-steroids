import type { ReactNode } from '@lynx-js/react'
import type { MainThread } from '@lynx-js/types'
import { useMainThreadRef } from '@lynx-js/react'
import { joinCss } from '@/shared/lib/css-utils'
import * as css from './drawer.module.scss'

const HANDLE_HEIGHT = 48
const SNAP_TRANSITION = '300ms cubic-bezier(0.2, 0, 0, 1)'
const SWIPE_THRESHOLD = 30

type DrawerProps = Omit<JSX.IntrinsicElements['view'], 'children'> & {
  children: ReactNode
  height?: number
}

export const Drawer = ({
  children,
  className,
  height,
  ...restProps
}: DrawerProps) => {
  const drawerRef = useMainThreadRef<MainThread.Element>(null)
  const scrollRef = useMainThreadRef<MainThread.Element>(null)

  const stateRef = useMainThreadRef({
    collapsed: height != null,
    currentHeight: 0,
    dragging: false,
    scrollTop: 0,
    startHeight: 0,
    startY: 0,
  })

  const snap = (collapse: boolean) => {
    'main thread'
    const state = stateRef.current
    const drawer = drawerRef.current

    state.collapsed = collapse

    if (height == null) {
      const target = `${state.startHeight}px`
      const transition = `height ${SNAP_TRANSITION}, max-height ${SNAP_TRANSITION}`
      drawer?.setStyleProperty('transition', transition)
      drawer?.setStyleProperty('height', target)
      drawer?.setStyleProperty('max-height', target)
      return
    }

    drawer?.setStyleProperty('transition', '')
    drawer?.setStyleProperty('height', '')
    drawer?.setStyleProperty('max-height', collapse ? `${height}px` : '')
    scrollRef.current?.setAttribute('enable-scroll', !collapse)
  }

  const handleDrawerLayout = (e: MainThread.LayoutChangeEvent) => {
    'main thread'
    if (!stateRef.current.dragging) {
      stateRef.current.currentHeight = e.detail.height
    }
  }

  const handleTouchStart = (e: MainThread.TouchEvent) => {
    'main thread'
    const touch = e.touches[0]
    if (!touch) return
    const state = stateRef.current
    state.startY = touch.clientY
    state.startHeight = state.currentHeight

    if (state.collapsed || height == null) {
      state.dragging = true
      drawerRef.current?.setStyleProperty('transition', 'none')
    }
  }

  const handleTouchMove = (e: MainThread.TouchEvent) => {
    'main thread'
    const touch = e.touches[0]
    if (!touch) return
    const state = stateRef.current
    const deltaY = state.startY - touch.clientY

    if (!state.dragging && state.scrollTop > 0) return
    if (!state.dragging && deltaY >= 0) return

    if (!state.dragging) {
      state.dragging = true
      scrollRef.current?.setAttribute('enable-scroll', false)
      state.startY = touch.clientY
      state.startHeight = state.currentHeight
      drawerRef.current?.setStyleProperty('transition', 'none')
    }

    const newHeight = Math.max(HANDLE_HEIGHT, state.startHeight + deltaY)
    state.currentHeight = newHeight
    drawerRef.current?.setStyleProperty('height', `${newHeight}px`)
    drawerRef.current?.setStyleProperty('max-height', `${newHeight}px`)
  }

  const handleTouchEnd = (e: MainThread.TouchEvent) => {
    'main thread'
    const touch = e.changedTouches[0]
    if (!touch) return
    const state = stateRef.current
    if (!state.dragging) return
    state.dragging = false

    if (height == null) {
      snap(false)
      return
    }

    const deltaY = state.startY - touch.clientY
    if (deltaY > SWIPE_THRESHOLD) {
      snap(false)
      return
    }
    if (deltaY < -SWIPE_THRESHOLD) {
      snap(true)
      return
    }
    snap(state.collapsed)
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
      style={height != null ? { maxHeight: `${height}px` } : undefined}
      main-thread:bindlayoutchange={handleDrawerLayout}
      main-thread:bindtouchend={handleTouchEnd}
      main-thread:bindtouchmove={handleTouchMove}
      main-thread:bindtouchstart={handleTouchStart}
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
