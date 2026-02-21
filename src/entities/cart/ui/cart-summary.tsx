import { joinCss } from '@/shared/lib/css-utils'
import * as css from './cart-summary.module.scss'

type SummaryRowProps = {
  label: string
  value: string
}

const SummaryRow = ({ label, value }: SummaryRowProps) => (
  <view className={css.row}>
    <text className={css.label}>{label}</text>
    <text className={css.value}>{value}</text>
  </view>
)

const Divider = () => <view className={css.divider} />

type CartSummaryProps = {
  deliveryCharges: number
  promoDiscount: number
  subTotal: number
  onOrder?: () => void
} & Omit<JSX.IntrinsicElements['view'], 'children'>

export const CartSummary = ({
  className,
  deliveryCharges,
  onOrder,
  promoDiscount,
  subTotal,
  ...restProps
}: CartSummaryProps) => {
  const total = subTotal - promoDiscount + deliveryCharges

  return (
    <view {...restProps} className={joinCss(css.root, className)}>
      <SummaryRow label='Sub Total' value={`$${subTotal.toFixed(2)}`} />
      <Divider />
      <SummaryRow label='Promocode' value={`$${promoDiscount.toFixed(2)}`} />
      <Divider />
      <SummaryRow
        label='Delivery Charges'
        value={
          deliveryCharges === 0 ? 'Free' : `$${deliveryCharges.toFixed(2)}`
        }
      />
      <Divider />
      <view className={css.row}>
        <text className={css.totalLabel}>Total</text>
        <text className={css.totalValue}>${total.toFixed(2)}</text>
      </view>
      <view className={css.orderButton} bindtap={onOrder}>
        <text className={css.orderLabel}>Order</text>
      </view>
    </view>
  )
}
