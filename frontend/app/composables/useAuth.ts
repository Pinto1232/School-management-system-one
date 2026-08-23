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
  sid?: string
  session_state?: string
  realm_access?: { roles: string[] }
  resource_access?: Record<string, { roles: string[] }>
}

const SCHOOL_ROLES = ['platform_admin', 'admin', 'teacher', 'staff', 'parent', 'student'] as const
let keycloak: Keycloak | null = null
let initialisePromise: Promise<boolean> | null = null

const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error('Keycloak token refresh timed out.')),
      timeoutMs,
    )
  })

  try {
    return await Promise.race([promise, timeout])
  }
  finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId)
  }
}

const currentValidAccessToken = () => {
  if (!keycloak?.authenticated || !keycloak.token) return null

  try {
    return keycloak.isTokenExpired(0) ? null : keycloak.token
  }
  catch {
    return null
  }
}

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

    const accessClaims = keycloak.tokenParsed as SchoolToken
    const identityClaims = keycloak.idTokenParsed as SchoolToken | undefined
    const subject = accessClaims.sub || identityClaims?.sub
    // Keycloak lightweight access tokens may omit identity claims such as
    // `sub`. The standard-flow ID token is the correct client-side fallback.
    // A session identifier keeps query caches isolated if both tokens omit it.
    const sessionIdentity = subject
      || accessClaims.sid
      || accessClaims.session_state
      || identityClaims?.sid
      || identityClaims?.session_state
      || accessClaims.preferred_username
      || identityClaims?.preferred_username
      || accessClaims.email
      || identityClaims?.email
    const realmRoles = accessClaims.realm_access?.roles || []
    const apiRoles = accessClaims.resource_access?.[config.public.keycloakAudience]?.roles || []
    const frontendRoles = accessClaims.resource_access?.[config.public.keycloakClientId]?.roles || []
    const schoolRoles = [...new Set([...realmRoles, ...apiRoles, ...frontendRoles])]
      .map(role => role.toLowerCase())
      .filter(role => SCHOOL_ROLES.includes(role as typeof SCHOOL_ROLES[number]))
    const primaryRole = SCHOOL_ROLES.find(role => schoolRoles.includes(role)) || 'unassigned'

    token.value = keycloak.token
    roles.value = schoolRoles
    user.value = {
      id: sessionIdentity,
      keycloakId: subject,
      schoolId: accessClaims.school_id || identityClaims?.school_id || subject,
      email: accessClaims.email
        || identityClaims?.email
        || accessClaims.preferred_username
        || identityClaims?.preferred_username
        || '',
      firstName: accessClaims.given_name
        || identityClaims?.given_name
        || accessClaims.preferred_username
        || identityClaims?.preferred_username
        || '',
      lastName: accessClaims.family_name || identityClaims?.family_name || '',
      role: primaryRole,
      roles: schoolRoles,
      image: accessClaims.picture || identityClaims?.picture,
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
        keycloak.onAuthRefreshError = () => {
          // Keycloak clears its authenticated state for a rejected refresh
          // token. A temporary network failure must not erase a valid session.
          if (!keycloak?.authenticated) clearAuth()
        }
        keycloak.onTokenExpired = () => {
          if (!keycloak) return

          void withTimeout(keycloak.updateToken(30), 10_000)
            .then(applyKeycloakSession)
            .catch(() => {
              if (!keycloak?.authenticated) clearAuth()
            })
        }

        await keycloak.init({
          onLoad: 'check-sso',
          flow: 'standard',
          pkceMethod: 'S256',
          // The adapter waits indefinitely when Chrome or an extension blocks
          // the hidden Keycloak status iframe response. Token expiry callbacks
          // and server-side JWT verification still protect the session.
          checkLoginIframe: false,
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

  const getAccessToken = async (forceRefresh = false) => {
    await initialiseAuth()
    if (!keycloak?.authenticated) return null

    try {
      await withTimeout(keycloak.updateToken(forceRefresh ? -1 : 30), 10_000)
      applyKeycloakSession()
      return keycloak.token || null
    } catch {
      const fallbackToken = currentValidAccessToken()
      if (fallbackToken) return fallbackToken

      if (!keycloak?.authenticated) clearAuth()
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
