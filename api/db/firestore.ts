import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID })

export const db = getFirestore()
