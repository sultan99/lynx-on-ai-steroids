import { createFileRoute } from '@tanstack/react-router'
import { ProfileScreen } from '@/screens/profile'

export const Route = createFileRoute('/profile')({
  component: ProfileScreen,
})
