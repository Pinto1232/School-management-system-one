import type { User } from '~/types'

export const useAuth = () => {
  const user = useState<User | null>('auth-user', () => null)
  const token = useState<string | null>('auth-token', () => null)
  const ready = useState<boolean>('auth-ready', () => false)

  const tokenCookie = useCookie<string | null>('school-token', {
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    default: () => null,
  })
  const userCookie = useCookie<User | null>('school-user', {
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    default: () => null,
  })

  const initialiseAuth = () => {
    token.value = tokenCookie.value || null
    user.value = userCookie.value || null

    if (import.meta.client) {
      const legacyToken = localStorage.getItem('token') || sessionStorage.getItem('token')
      const legacyUser = localStorage.getItem('user')
      if (!token.value && legacyToken) token.value = legacyToken
      if (!user.value && legacyUser) {
        try {
          user.value = JSON.parse(legacyUser) as User
        } catch {
          localStorage.removeItem('user')
        }
      }
    }
    ready.value = true
  }

  const login = (userData: User, accessToken: string, remember = false) => {
    user.value = userData
    token.value = accessToken
    tokenCookie.value = accessToken
    userCookie.value = userData

    if (import.meta.client) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify(userData))
      if (remember) {
        localStorage.setItem('token', accessToken)
        sessionStorage.removeItem('token')
      } else {
        sessionStorage.setItem('token', accessToken)
        localStorage.removeItem('token')
      }
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    tokenCookie.value = null
    userCookie.value = null
    if (import.meta.client) {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
    }
  }

  const isAuthenticated = computed(() => Boolean(token.value && user.value))

  return {
    user: readonly(user),
    token: readonly(token),
    ready: readonly(ready),
    isAuthenticated,
    initialiseAuth,
    login,
    logout,
  }
}
