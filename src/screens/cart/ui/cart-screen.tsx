import { useNavigate } from '@tanstack/react-router'
import * as css from './cart-screen.module.scss'

export const CartScreen = () => {
  const navigate = useNavigate()
  return (
    <view className={css.screen}>
      <view className={css.content} bindtap={() => navigate({ to: '/home' })}>
        <text className={css.stubText}>Cart</text>
      </view>
    </view>
  )
}
