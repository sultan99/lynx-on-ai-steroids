import { useQuery } from '@tanstack/react-query'
import { userQueryOptions } from '@/entities/user'

export const useUserData = () => {
  const { data: user } = useQuery(userQueryOptions)
  return user
}
