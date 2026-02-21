import type { Donut } from '@/entities/donut'

export type CartItem = {
  donut: Donut
  donutId: string
  quantity: number
}
