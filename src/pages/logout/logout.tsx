import { FC } from 'react'

import { useLogout } from './logout.hooks'
import { useRouter } from 'next/router'


export const Logout: FC = () => {
  const { done } = useLogout()
  const router = useRouter()

  if (done) {
    router.push('/login')
  }

  return null
}
