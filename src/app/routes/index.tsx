import { useEffect } from '@lynx-js/react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

const IndexRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/home' })
  }, [navigate])

  return <view />
}

export const Route = createFileRoute('/')({
  component: IndexRedirect,
})
