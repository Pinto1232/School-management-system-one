import { canAccessDashboardView } from '~/data/school'

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const { initialiseAuth, isAuthenticated, login, roles } = useAuth()
  await initialiseAuth()

  if (!isAuthenticated.value) {
    await login(to.fullPath)
    return
  }

  if (to.path.startsWith('/dashboard/')) {
    const view = to.path.slice('/dashboard/'.length).split('/')[0] || 'dashboard'
    if (!canAccessDashboardView(view, roles.value)) {
      return navigateTo('/dashboard?access=denied')
    }
  }
})
