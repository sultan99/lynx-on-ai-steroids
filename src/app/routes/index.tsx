import { createFileRoute } from '@tanstack/react-router'
import { SplashScreen } from '@/screens/splash'

export const Route = createFileRoute('/')({
  component: SplashScreen,
})
