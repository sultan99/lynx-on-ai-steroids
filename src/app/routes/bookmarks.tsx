import { createFileRoute } from '@tanstack/react-router'
import { BookmarksScreen } from '@/screens/bookmarks'

export const Route = createFileRoute('/bookmarks')({
  component: BookmarksScreen,
})
