import { createFileRoute } from '@tanstack/react-router'
import { OnboardingScreen } from '@/screens/onboarding'

export const Route = createFileRoute('/onboarding')({
  component: OnboardingScreen,
})
