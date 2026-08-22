import type { ApiErrorShape } from '~/types'

const apiMessageTranslations: Record<string, string> = {
  'Enter a valid email address': 'Introduza um endereço de e-mail válido.',
  'Password must be at least 6 characters long': 'A palavra-passe deve ter pelo menos 6 caracteres.',
  'First name is required': 'O nome é obrigatório.',
  'Last name is required': 'O apelido é obrigatório.',
  'Profile image is required': 'A imagem de perfil é obrigatória.',
  'User already exists with this email': 'Já existe um utilizador com este endereço de e-mail.',
  'Error registering user': 'Ocorreu um erro ao registar o utilizador.',
  'Invalid email or password': 'E-mail ou palavra-passe inválidos.',
  'Error logging in user': 'Ocorreu um erro ao iniciar sessão.',
  'User not found': 'Utilizador não encontrado.',
  'Password reset link sent to your email address': 'A ligação de recuperação foi enviada para o seu e-mail.',
  'An error occurred while processing your request': 'Ocorreu um erro ao processar o seu pedido.',
  'Invalid or expired reset token': 'A ligação de recuperação é inválida ou expirou.',
  'Password updated successfully': 'A palavra-passe foi atualizada com sucesso.',
  'Invalid token, access denied.': 'Token inválido. Acesso negado.',
}

export const translateApiMessage = (message: string | undefined, fallback: string) => {
  if (!message) return fallback
  return apiMessageTranslations[message.trim()] || fallback
}

export const getApiErrorMessage = (error: unknown, fallback = 'Ocorreu um erro. Tente novamente.') => {
  const apiError = error as ApiErrorShape
  const message = apiError?.data?.error
    || apiError?.data?.message
    || apiError?.data?.errors?.[0]?.msg
    || apiError?.message
  return translateApiMessage(message, fallback)
}

export const useApi = () => {
  const config = useRuntimeConfig()
  const { getAccessToken, isAuthenticated, logout } = useAuth()

  const request = async <T>(path: string, options: Parameters<typeof $fetch<T>>[1] = {}) => {
    try {
      const accessToken = isAuthenticated.value ? await getAccessToken() : null
      return await $fetch<T>(path, {
        baseURL: config.public.apiBase,
        timeout: 8000,
        retry: 0,
        ...options,
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          ...(options.headers || {}),
        },
      })
    } catch (error) {
      const apiError = error as ApiErrorShape
      const status = apiError?.statusCode || apiError?.status
      if (status === 401 && import.meta.client) {
        await logout('/login')
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
