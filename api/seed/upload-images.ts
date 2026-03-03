import { readFileSync, readdirSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getStorage } from 'firebase-admin/storage'

export type ImageMap = Record<string, string>

const currentDir = dirname(fileURLToPath(import.meta.url))
const entitiesDir = resolve(currentDir, '../../src/entities')

const buildDownloadUrl = (bucketName: string, storagePath: string, token: string) => {
  const encodedPath = encodeURIComponent(storagePath)
  const host = process.env.FIREBASE_STORAGE_EMULATOR_HOST

  if (host) {
    return `http://${host}/v0/b/${bucketName}/o/${encodedPath}?alt=media&token=${token}`
  }

  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedPath}?alt=media&token=${token}`
}

const uploadFile = async (
  bucket: ReturnType<ReturnType<typeof getStorage>['bucket']>,
  localPath: string,
  storagePath: string,
) => {
  const token = randomUUID()
  const file = bucket.file(storagePath)

  await file.save(readFileSync(localPath), {
    metadata: {
      contentType: 'image/png',
      metadata: { firebaseStorageDownloadTokens: token },
    },
  })

  return buildDownloadUrl(bucket.name, storagePath, token)
}

const entityAssets: Array<{ entity: string; folder: string }> = [
  { entity: 'donut', folder: 'donuts' },
  { entity: 'bakery', folder: 'bakeries' },
  { entity: 'user', folder: 'users' },
]

export const uploadImages = async (): Promise<ImageMap> => {
  const bucket = getStorage().bucket()
  const images: ImageMap = {}

  for (const { entity, folder } of entityAssets) {
    const assetsDir = join(entitiesDir, entity, 'assets')
    const files = readdirSync(assetsDir).filter((f) => f.endsWith('.png'))

    for (const file of files) {
      const localPath = join(assetsDir, file)
      const storagePath = `${folder}/${file}`
      const url = await uploadFile(bucket, localPath, storagePath)
      images[storagePath] = url
      console.log(`  uploaded: ${storagePath}`)
    }
  }

  return images
}
