import type { ToastMessage, ToastTone } from '~/types/dashboard'

let toastSequence = 0

export const useToast = () => {
  const toasts = useState<ToastMessage[]>('app-toast-messages', () => [])

  const add = (
    title: string,
    options: {
      description?: string
      tone?: ToastTone
      duration?: number
    } = {},
  ) => {
    toastSequence += 1
    const toast: ToastMessage = {
      id: `toast-${Date.now()}-${toastSequence}`,
      title,
      description: options.description,
      tone: options.tone || 'info',
      duration: options.duration ?? 5000,
    }

    toasts.value = [...toasts.value, toast]
    return toast.id
  }

  const remove = (id: string) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  const clear = () => {
    toasts.value = []
  }

  return {
    toasts: readonly(toasts),
    add,
    remove,
    clear,
    info: (title: string, description?: string) => add(title, { description, tone: 'info' }),
    success: (title: string, description?: string) => add(title, { description, tone: 'success' }),
    warning: (title: string, description?: string) => add(title, { description, tone: 'warning' }),
    error: (title: string, description?: string) => add(title, { description, tone: 'error', duration: 7000 }),
  }
}
