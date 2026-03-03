import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { createBakeries } from './data/bakeries.js'
import { categories } from './data/categories.js'
import { createDonuts } from './data/donuts.js'
import { favorites } from './data/favorites.js'
import { orders } from './data/orders.js'
import { reviews } from './data/reviews.js'
import { createUsers } from './data/users.js'
import { uploadImages } from './upload-images.js'

const isFirestoreEmulator = Boolean(process.env.FIRESTORE_EMULATOR_HOST)
const isStorageEmulator = Boolean(process.env.FIREBASE_STORAGE_EMULATOR_HOST)
const isEmulator = isFirestoreEmulator && isStorageEmulator
const isForced = process.argv.includes('--force')

if (!isEmulator && !isForced) {
  throw new Error(
    'Refusing to seed live Firestore/Storage.\n' +
      'Set FIRESTORE_EMULATOR_HOST and FIREBASE_STORAGE_EMULATOR_HOST for emulator,\n' +
      'or pass --force to seed production.',
  )
}

initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
})
const db = getFirestore()

const seedCollection = async (name: string, docs: Array<{ id: string }>) => {
  const batchSize = 500
  for (let i = 0; i < docs.length; i += batchSize) {
    const batch = db.batch()
    const chunk = docs.slice(i, i + batchSize)
    for (const doc of chunk) {
      batch.set(db.collection(name).doc(doc.id), doc)
    }
    await batch.commit()
  }
  console.log(`  ${name}: ${docs.length} docs`)
}

const seedFavorites = async () => {
  const batch = db.batch()
  for (const fav of favorites) {
    batch.set(db.collection('favorites').doc(fav.userId), fav)
  }
  await batch.commit()
  console.log(`  favorites: ${favorites.length} docs`)
}

const seed = async () => {
  console.log('Uploading images to Firebase Storage...\n')
  const images = await uploadImages()

  console.log('\nSeeding Firestore...\n')
  const donuts = createDonuts(images)
  const bakeries = createBakeries(images)
  const users = createUsers(images)

  await Promise.all([
    seedCollection('donuts', donuts),
    seedCollection('categories', categories),
    seedCollection('bakeries', bakeries),
    seedCollection('orders', orders),
    seedCollection('reviews', reviews),
    seedCollection('users', users),
  ])
  await seedFavorites()

  console.log('\nDone!')
}

seed().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
