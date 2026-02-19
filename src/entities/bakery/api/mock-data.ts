import type { Bakery } from '../model/types'
import burgerImg from '../assets/burger.png'
import donutsImg from '../assets/donuts.png'
import burgerKingLogo from '../assets/logo-burger-king.png'
import dunkinLogo from '../assets/logo-dunkin-donuts.png'

export const bakeries: Bakery[] = [
  {
    deliveryTime: 45,
    id: '1',
    logo: dunkinLogo,
    name: "Dunkin' Donuts",
    orderLink: 'https://www.dunkindonuts.com',
    promoImage: donutsImg,
    promoText: "Something Fresh is Always Brewin' Here",
    rating: 4.9,
  },
  {
    deliveryTime: 30,
    id: '2',
    logo: burgerKingLogo,
    name: 'Burger King',
    orderLink: 'https://www.bk.com',
    promoImage: burgerImg,
    promoText: 'Have It Your Way, Every Day',
    rating: 4.5,
  },
]
