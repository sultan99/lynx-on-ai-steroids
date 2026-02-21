import type { Donut } from '@/entities/donut'
import type { CartItem } from './types'
import { create } from 'zustand'

type CartState = {
  addItem: (donut: Donut) => void
  clearCart: () => void
  items: CartItem[]
  removeItem: (donutId: string) => void
  subTotal: () => number
  totalItems: () => number
  updateQuantity: (donutId: string, quantity: number) => void
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],

  addItem: (donut) =>
    set((state) => {
      const existing = state.items.find((item) => item.donutId === donut.id)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.donutId === donut.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }
      return {
        items: [...state.items, { donut, donutId: donut.id, quantity: 1 }],
      }
    }),

  clearCart: () => set({ items: [] }),

  removeItem: (donutId) =>
    set((state) => ({
      items: state.items.filter((item) => item.donutId !== donutId),
    })),

  subTotal: () =>
    get().items.reduce(
      (sum, item) => sum + item.donut.price * item.quantity,
      0,
    ),

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

  updateQuantity: (donutId, quantity) =>
    set((state) =>
      quantity <= 0
        ? { items: state.items.filter((item) => item.donutId !== donutId) }
        : {
            items: state.items.map((item) =>
              item.donutId === donutId ? { ...item, quantity } : item,
            ),
          },
    ),
}))
