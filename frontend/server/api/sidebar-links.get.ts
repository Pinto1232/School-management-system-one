import type { WordPressSidebarResponse } from '~~/app/types/dashboard'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  return await $fetch<WordPressSidebarResponse>(config.wordpressSidebarUrl, {
    timeout: 8000,
    retry: 1,
  })
})
