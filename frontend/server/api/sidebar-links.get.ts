import type { SidebarNavigationResponse } from '~~/app/types/dashboard'
import { requireKeycloakAuth } from '../utils/keycloak-auth'
import { parseSidebarNavigationResponse } from '../utils/sidebar-links'

const navigationEndpoint = (apiBase: string) => {
  try {
    const url = new URL(apiBase)
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Unsupported protocol')

    url.pathname = `${url.pathname.replace(/\/+$/, '')}/v1/navigation/sidebar`
    url.search = ''
    url.hash = ''
    return url.toString()
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'The backend API is not configured correctly.',
    })
  }
}

const upstreamStatus = (error: unknown) => {
  if (typeof error !== 'object' || error === null) return null
  if ('statusCode' in error && typeof error.statusCode === 'number') return error.statusCode
  if ('status' in error && typeof error.status === 'number') return error.status
  return null
}

export default defineEventHandler(async (event): Promise<SidebarNavigationResponse> => {
  setResponseHeader(event, 'Cache-Control', 'private, no-store')
  setResponseHeader(event, 'Vary', 'Authorization')

  await requireKeycloakAuth(event)

  const config = useRuntimeConfig(event)
  const apiBase = config.public.apiBase.trim()
  if (!apiBase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'The backend API is not configured.',
    })
  }
  const endpoint = navigationEndpoint(apiBase)

  const authorization = getHeader(event, 'authorization')
  if (!authorization) {
    setResponseHeader(event, 'WWW-Authenticate', 'Bearer')
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing bearer token.',
    })
  }

  let response: unknown
  try {
    response = await $fetch<unknown>(endpoint, {
      timeout: 8000,
      retry: 1,
      headers: { Authorization: authorization },
    })
  } catch (error) {
    const status = upstreamStatus(error)
    console.error(`[sidebar-links] Backend navigation request failed (${status ?? 'unavailable'}).`)

    if (status === 401) {
      setResponseHeader(event, 'WWW-Authenticate', 'Bearer error="invalid_token"')
      throw createError({ statusCode: 401, statusMessage: 'Invalid or expired access token.' })
    }
    if (status === 403) {
      throw createError({ statusCode: 403, statusMessage: 'You are not authorised to load this navigation.' })
    }
    if (status === 503) {
      setResponseHeader(event, 'Retry-After', 5)
      throw createError({ statusCode: 503, statusMessage: 'The navigation service is temporarily unavailable.' })
    }

    throw createError({
      statusCode: 502,
      statusMessage: 'The navigation service is temporarily unavailable.',
    })
  }

  return parseSidebarNavigationResponse(response)
})
