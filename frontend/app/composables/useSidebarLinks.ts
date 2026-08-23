import type { MaybeRefOrGetter } from 'vue'
import type { WordPressSidebarResponse } from '~/types/dashboard'
import { queryOptions, useQuery } from '@tanstack/vue-query'

export const sidebarLinkKeys = {
  all: ['wordpress-sidebar-links'] as const,
  forUser: (userId: string) => [...sidebarLinkKeys.all, userId] as const,
}

type AccessTokenGetter = (forceRefresh?: boolean) => Promise<string | null>

type FetchErrorShape = {
  status?: number
  statusCode?: number
  response?: { status?: number }
}

const requestSidebarLinks = (accessToken: string, signal?: AbortSignal) => (
  $fetch<WordPressSidebarResponse>('/api/sidebar-links', {
    signal,
    timeout: 20_000,
    headers: { Authorization: `Bearer ${accessToken}` },
  })
)

const fetchSidebarLinks = async (getAccessToken: AccessTokenGetter, signal?: AbortSignal) => {
  const accessToken = await getAccessToken()
  if (!accessToken) {
    throw Object.assign(new Error('Authentication is required to load dashboard navigation.'), {
      statusCode: 401,
    })
  }

  try {
    return await requestSidebarLinks(accessToken, signal)
  } catch (error) {
    const fetchError = error as FetchErrorShape
    const status = fetchError.statusCode || fetchError.status || fetchError.response?.status

    // A token can become stale after an audience/role/key change. Force one
    // refresh and retry once; never loop on a persistently invalid token.
    if (status !== 401 || signal?.aborted) throw error

    const refreshedAccessToken = await getAccessToken(true)
    if (!refreshedAccessToken || refreshedAccessToken === accessToken) throw error

    return await requestSidebarLinks(refreshedAccessToken, signal)
  }
}

export const sidebarLinkQueries = {
  forUser: (userId: string, getAccessToken: AccessTokenGetter) => queryOptions({
    queryKey: sidebarLinkKeys.forUser(userId),
    queryFn: ({ signal }) => fetchSidebarLinks(getAccessToken, signal),
    staleTime: 60_000,
    gcTime: import.meta.server ? Infinity : 10 * 60_000,
    // The Nitro proxy already retries WordPress once; avoid stacking client
    // retries and leaving the initial navigation loader visible for too long.
    retry: false,
  }),
}

export const useSidebarLinksQuery = (enabled: MaybeRefOrGetter<boolean> = true) => {
  const { getAccessToken, user } = useAuth()

  return useQuery(computed(() => {
    const userId = user.value?.id || ''

    return {
      ...sidebarLinkQueries.forUser(userId, getAccessToken),
      // Keycloak tokens live only in browser memory, so this protected query is
      // intentionally client-side instead of issuing an unauthenticated SSR request.
      enabled: import.meta.client
        && toValue(enabled),
    }
  }))
}
