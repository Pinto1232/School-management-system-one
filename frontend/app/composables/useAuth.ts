import type Keycloak from 'keycloak-js'
import type { KeycloakTokenParsed } from 'keycloak-js'
import type { User } from '~/types'

interface SchoolToken extends KeycloakTokenParsed {
  email?: string
  given_name?: string
  family_name?: string
  picture?: string
  preferred_username?: string
  school_id?: string
  realm_access?: { roles: string[] }
  resource_access?: Record<string, { roles: string[] }>
}

const SCHOOL_ROLES = ['platform_admin', 'admin', 'teacher', 'staff', 'parent', 'student'] as const
let keycloak: Keycloak | null = null
let initialisePromise: Promise<boolean> | null = null

const redirectUrl = (path: string) => {
  if (/^https?:\/\//.test(path)) return path
  return new URL(path, window.location.origin).toString()
}

export const useAuth = () => {
  const config = useRuntimeConfig()
  const user = useState<User | null>('auth-user', () => null)
  const token = useState<string | null>('auth-token', () => null)
  const roles = useState<string[]>('auth-roles', () => [])
  const ready = useState<boolean>('auth-ready', () => false)
  const authError = useState<string>('auth-error', () => '')

  const legacyTokenCookie = useCookie<string | null>('school-token', { default: () => null })
  const legacyUserCookie = useCookie<User | null>('school-user', { default: () => null })

  const clearAuth = () => {
    user.value = null
    token.value = null
    roles.value = []
  }

  const clearLegacySession = () => {
    legacyTokenCookie.value = null
    legacyUserCookie.value = null
    if (!import.meta.client) return

    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
  }

  const applyKeycloakSession = () => {
    if (!keycloak?.authenticated || !keycloak.token || !keycloak.tokenParsed) {
      clearAuth()
      return
    }

    const parsed = keycloak.tokenParsed as SchoolToken
    const realmRoles = parsed.realm_access?.roles || []
    const clientRoles = parsed.resource_access?.[config.public.keycloakAudience]?.roles || []
    const schoolRoles = [...new Set([...realmRoles, ...clientRoles])]
      .map(role => role.toLowerCase())
      .filter(role => SCHOOL_ROLES.includes(role as typeof SCHOOL_ROLES[number]))
    const primaryRole = SCHOOL_ROLES.find(role => schoolRoles.includes(role)) || 'unassigned'

    token.value = keycloak.token
    roles.value = schoolRoles
    user.value = {
      id: parsed.sub,
      keycloakId: parsed.sub,
      schoolId: parsed.school_id || parsed.sub,
      email: parsed.email || parsed.preferred_username || '',
      firstName: parsed.given_name || parsed.preferred_username || '',
      lastName: parsed.family_name || '',
      role: primaryRole,
      roles: schoolRoles,
      image: parsed.picture,
    }
  }

  const initialiseAuth = async () => {
    if (!import.meta.client) return false
    if (initialisePromise) return initialisePromise

    const attempt = (async () => {
      authError.value = ''
      try {
        const { default: KeycloakAdapter } = await import('keycloak-js')
        keycloak = new KeycloakAdapter({
          url: config.public.keycloakUrl,
          realm: config.public.keycloakRealm,
          clientId: config.public.keycloakClientId,
        })

        keycloak.onAuthSuccess = applyKeycloakSession
        keycloak.onAuthRefreshSuccess = applyKeycloakSession
        keycloak.onAuthLogout = () => {
          clearAuth()
          void navigateTo('/')
        }
        keycloak.onAuthRefreshError = clearAuth
        keycloak.onTokenExpired = () => {
          void keycloak?.updateToken(30).then(applyKeycloakSession).catch(clearAuth)
        }

        await keycloak.init({
          onLoad: 'check-sso',
          flow: 'standard',
          pkceMethod: 'S256',
          checkLoginIframe: true,
          silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
          silentCheckSsoFallback: false,
          messageReceiveTimeout: 3000,
        })

        applyKeycloakSession()
        clearLegacySession()
        return Boolean(keycloak.authenticated)
      } catch {
        clearAuth()
        authError.value = 'Não foi possível ligar ao serviço de autenticação. Confirme que o Keycloak está em execução.'
        return false
      } finally {
        ready.value = true
      }
    })()

    initialisePromise = attempt
    const authenticated = await attempt
    if (authError.value) initialisePromise = null
    return authenticated
  }

  const login = async (redirectPath = '/dashboard') => {
    await initialiseAuth()
    if (!keycloak) throw new Error('Keycloak is not available')
    await keycloak.login({ redirectUri: redirectUrl(redirectPath), locale: 'pt' })
  }

  const register = async (redirectPath = '/dashboard') => {
    await initialiseAuth()
    if (!keycloak) throw new Error('Keycloak is not available')
    await keycloak.register({ redirectUri: redirectUrl(redirectPath), locale: 'pt' })
  }

  const logout = async (redirectPath = '/') => {
    await initialiseAuth()
    clearAuth()
    clearLegacySession()
    if (keycloak) await keycloak.logout({ redirectUri: redirectUrl(redirectPath) })
  }

  const getAccessToken = async () => {
    await initialiseAuth()
    if (!keycloak?.authenticated) return null

    try {
      await keycloak.updateToken(30)
      applyKeycloakSession()
      return keycloak.token || null
    } catch {
      clearAuth()
      return null
    }
  }

  const hasRole = (role: string) => roles.value.includes(role.toLowerCase())
  const isAuthenticated = computed(() => Boolean(user.value && token.value))

  return {
    user: readonly(user),
    token: readonly(token),
    roles: readonly(roles),
    ready: readonly(ready),
    authError: readonly(authError),
    isAuthenticated,
    initialiseAuth,
    login,
    register,
    logout,
    clearAuth,
    getAccessToken,
    hasRole,
  }
}
