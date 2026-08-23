import type { WordPressSidebarLink, WordPressSidebarResponse } from '~~/app/types/dashboard'
import { requireKeycloakAuth } from '../utils/keycloak-auth'
import { parseWordPressSidebarResponse } from '../utils/sidebar-links'

const fetchWordPressSidebar = defineCachedFunction(async (url: string): Promise<WordPressSidebarResponse> => {
  let response: unknown

  try {
    response = await $fetch<unknown>(url, {
      timeout: 8000,
      retry: 1,
    })
  } catch (error) {
    const status = typeof error === 'object' && error !== null && 'status' in error
      ? String(error.status)
      : 'unavailable'
    console.error(`[sidebar-links] WordPress request failed (${status}).`)

    throw createError({
      statusCode: 502,
      statusMessage: 'The sidebar service is temporarily unavailable.',
    })
  }

  return parseWordPressSidebarResponse(response)
}, {
  name: 'wordpress-sidebar-links',
  maxAge: 60,
  swr: true,
  getKey: () => 'all',
})

export default defineEventHandler(async (event): Promise<WordPressSidebarResponse> => {
  setResponseHeader(event, 'Cache-Control', 'private, no-store')
  setResponseHeader(event, 'Vary', 'Authorization')

  const config = useRuntimeConfig(event)
  const { roles } = await requireKeycloakAuth(event)

  if (!config.wordpressSidebarUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'The WordPress sidebar endpoint is not configured.',
    })
  }

  const response: WordPressSidebarResponse = await fetchWordPressSidebar(config.wordpressSidebarUrl)
  const allowedRoles = new Set(roles)
  if (allowedRoles.has('platform_admin')) allowedRoles.add('admin')

  const data: WordPressSidebarLink[] = response.data.filter(link => (
    link.enabled
    && (!link.roles.length || link.roles.some(role => allowedRoles.has(role)))
  ))

  return {
    data,
    meta: {
      ...response.meta,
      total: data.length,
      role: roles[0] || null,
      include_disabled: false,
    },
  } satisfies WordPressSidebarResponse
})
