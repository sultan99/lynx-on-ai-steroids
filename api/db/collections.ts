import type { FirestoreDataConverter } from 'firebase-admin/firestore'
import { db } from './firestore.js'

const converter = <T>(): FirestoreDataConverter<T> => ({
  fromFirestore: (snap) => snap.data() as T,
  toFirestore: <D, F>(data: D) => data as Record<string, F>,
})

const collection = <T>(name: string) =>
  db.collection(name).withConverter(converter<T>())

export type Bakery = {
  deliveryTime: number
  id: string
  logo: string
  name: string
  orderLink: string
  promoImage: string
  promoText: string
  rating: number
}

export type Category = {
  iconGlyph: string
  id: string
  name: string
}

export type Courier = {
  avatar: string
  id: string
  name: string
  phone: string
}

export type Donut = {
  brand: string
  calories: number
  categoryId: string
  deliveryType: 'Free' | 'Paid'
  description: string
  id: string
  image: string
  name: string
  prepTime: number
  price: number
  rating: number
}

export type Favorite = {
  donutIds: string[]
  userId: string
}

export type Order = {
  courier: Courier
  deliveryAddress: string
  deliveryTime: string
  estimatedTime: number
  id: string
  status: 'delivered' | 'in-transit' | 'preparing'
}

export type Review = {
  authorAvatar: string
  authorName: string
  date: string
  donutId: string
  id: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
}

export type User = {
  avatar: string
  avatarUrl: string
  id: string
  location: string
  name: string
}

export const bakeries = collection<Bakery>('bakeries')
export const categories = collection<Category>('categories')
export const donuts = collection<Donut>('donuts')
export const favorites = collection<Favorite>('favorites')
export const orders = collection<Order>('orders')
export const reviews = collection<Review>('reviews')
export const users = collection<User>('users')
