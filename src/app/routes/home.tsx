import { createFileRoute } from '@tanstack/react-router'
import { HomeScreen } from '@/screens/home'

export const Route = createFileRoute('/home')({
  component: HomeScreen,
})
