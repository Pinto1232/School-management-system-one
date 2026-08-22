export default defineNuxtRouteMiddleware(() => {
  const tokenCookie = useCookie<string | null>('school-token')
  if (!tokenCookie.value) {
    return navigateTo('/login')
  }
})
