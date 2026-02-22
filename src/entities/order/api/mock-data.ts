import type { Order } from '../model/types'

export const orders: Order[] = [
  {
    courier: {
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
      id: '1',
      name: 'Morris Jones',
      phone: '+1 234 567 890',
    },
    deliveryAddress: '00 Street, Area',
    deliveryTime: '4:30pm',
    estimatedTime: 3,
    id: '1',
    status: 'in-transit',
  },
]
