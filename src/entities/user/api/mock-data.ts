import type { User } from '../model/types'
import avatarImg from '../assets/john.png'

export const currentUser: User = {
  avatar: avatarImg,
  avatarUrl:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces',
  id: 'user-1',
  location: 'York Ave. Brooklyn',
  name: 'John',
}
