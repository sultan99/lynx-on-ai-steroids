import type { User } from '../../db/collections.js'
import type { ImageMap } from '../upload-images.js'

export const createUsers = (images: ImageMap): User[] => [
  {
    avatar: images['users/john.png'],
    avatarUrl: images['users/john.png'],
    id: 'user-1',
    location: 'York Ave. Brooklyn',
    name: 'John',
  },
]
