import type { Donut } from '@/entities/donut'
import type { CartItem } from './types'
import { create } from 'zustand'

type CartState = {
  addItem: (donut: Donut) => void
  clearCart: () => void
  items: CartItem[]
  removeItem: (donutId: string) => void
  updateQuantity: (donutId: string, quantity: number) => void
}

export const selectSubTotal = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.donut.price * item.quantity, 0)

export const selectTotalItems = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)

export const useCartStore = create<CartState>()((set) => ({
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
