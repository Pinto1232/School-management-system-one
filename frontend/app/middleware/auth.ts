import { sidebarLinkQueries } from '~/composables/useSidebarLinks'

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const { $queryClient } = useNuxtApp()
  const { authError, getAccessToken, initialiseAuth, isAuthenticated, logout, user } = useAuth()
  const redirectToLogin = (retryAutomatically = true) => navigateTo({
    path: '/login',
    query: {
      redirect: to.fullPath,
      ...(retryAutomatically ? {} : { retry: 'false' }),
    },
  }, { replace: true })
  const authenticated = await initialiseAuth()

  // Keep failed, cancelled, and unavailable Keycloak sessions outside every
  // protected dashboard route. The login page owns the external redirect and
  // can present a recoverable error if Keycloak cannot be reached.
  if (!authenticated || !isAuthenticated.value) {
    return redirectToLogin(!authError.value)
  }

  if (to.path !== '/dashboard' && !to.path.startsWith('/dashboard/')) return
  // The dashboard root is always available to an authenticated user. Sidebar
  // availability must never decide whether a valid login session can continue.
  if (to.path === '/dashboard') return

  const userId = user.value?.id
  if (!userId) {
    await logout(to.fullPath)
    return
  }

  let sidebarResponse
  try {
    sidebarResponse = await $queryClient.fetchQuery(
      sidebarLinkQueries.forUser(userId, getAccessToken),
    )
  } catch {
    // A token-refresh failure clears the in-memory session and requires a new
    // login. A sidebar-specific 401 must not terminate an otherwise valid one.
    if (!isAuthenticated.value) return redirectToLogin()

    return navigateTo('/dashboard?access=navigation-unavailable')
  }

  const requestedPath = to.path.replace(/\/+$/, '')
  const canAccess = sidebarResponse.data.some(link => (
    link.path !== '/dashboard'
    && (requestedPath === link.path || requestedPath.startsWith(`${link.path}/`))
  ))

  if (!canAccess) return navigateTo('/dashboard?access=denied')
})
