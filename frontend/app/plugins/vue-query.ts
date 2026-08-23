import type { ApiErrorShape } from '~/types'
import type { DehydratedState, VueQueryPluginOptions } from '@tanstack/vue-query'
import {
  QueryClient,
  VueQueryPlugin,
  dehydrate,
  hydrate,
} from '@tanstack/vue-query'

const shouldRetryQuery = (failureCount: number, error: unknown) => {
  const apiError = error as ApiErrorShape
  const status = apiError?.statusCode || apiError?.status

  // Retrying client errors delays useful feedback and can repeat unauthorised calls.
  if (status && status < 500) return false

  return failureCount < 2
}

export default defineNuxtPlugin((nuxtApp) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query', () => null)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Avoid an immediate duplicate request after hydrating server-fetched data.
        staleTime: 30_000,
        retry: shouldRetryQuery,
      },
      mutations: {
        retry: false,
      },
    },
  })
  const options: VueQueryPluginOptions = { queryClient }

  nuxtApp.vueApp.use(VueQueryPlugin, options)

  if (import.meta.server) {
    nuxtApp.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (import.meta.client) {
    hydrate(queryClient, vueQueryState.value)
  }

  return {
    provide: { queryClient },
  }
})
