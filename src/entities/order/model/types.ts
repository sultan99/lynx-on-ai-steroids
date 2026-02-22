export type Courier = {
  avatar: string
  id: string
  name: string
  phone: string
}

export type Order = {
  courier: Courier
  deliveryAddress: string
  deliveryTime: string
  estimatedTime: number
  id: string
  status: 'delivered' | 'in-transit' | 'preparing'
}
