import type { Order } from '../model/types'

export const orders: Order[] = [
  {
    courier: {
      avatar:
        'https://plus.unsplash.com/premium_photo-1670588775983-666b23590ffc?w=128&h=128&fit=crop&crop=faces',
      id: '1',
      name: 'Anna Bright',
      phone: '+1 234 567 890',
    },
    deliveryAddress: 'Awesome Street',
    deliveryTime: '4:30pm',
    estimatedTime: 3,
    id: '1',
    status: 'in-transit',
  },
]
