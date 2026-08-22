import type { ApiErrorShape } from '~/types'

export const getApiErrorMessage = (error: unknown, fallback = 'Something went wrong. Please try again.') => {
  const apiError = error as ApiErrorShape
  return apiError?.data?.error
    || apiError?.data?.message
    || apiError?.data?.errors?.[0]?.msg
    || apiError?.message
    || fallback
}

export const useApi = () => {
  const config = useRuntimeConfig()
  const { token, logout } = useAuth()

  const request = async <T>(path: string, options: Parameters<typeof $fetch<T>>[1] = {}) => {
    try {
      return await $fetch<T>(path, {
        baseURL: config.public.apiBase,
        ...options,
        headers: {
          ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
          ...(options.headers || {}),
        },
      })
    } catch (error) {
      const status = (error as ApiErrorShape)?.statusCode
      if (status === 401 && import.meta.client) {
        logout()
        await navigateTo('/login')
      }
      throw error
    }
  }

  const uploadUrl = (path?: string) => {
    if (!path) return '/images/icon.jpg'
    if (/^https?:\/\//.test(path)) return path
    const filename = path.replace(/^.*[\\/]/, '')
    return `${config.public.backendUrl}/uploads/${filename}`
  }

  return { request, uploadUrl }
}
