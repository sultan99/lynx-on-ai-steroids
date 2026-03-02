import { useQuery } from '@tanstack/react-query'
import { orderDetailQueryOptions } from '@/entities/order'

export const useOrderData = (orderId: string) =>
  useQuery(orderDetailQueryOptions(orderId)).data
