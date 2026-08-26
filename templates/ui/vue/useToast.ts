import { useState } from '#imports'

export interface ToastItem {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export const useToast = () => {
  const toasts = useState<ToastItem[]>('app_toasts', () => [])

  const add = (type: ToastItem['type'], title: string, message?: string, duration = 3500) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6)
    toasts.value.push({ id, type, title, message, duration })
    if (duration > 0) setTimeout(() => remove(id), duration)
  }

  const remove = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return {
    toasts,
    success: (title: string, message?: string, duration?: number) => add('success', title, message, duration),
    error: (title: string, message?: string, duration?: number) => add('error', title, message, duration),
    warning: (title: string, message?: string, duration?: number) => add('warning', title, message, duration),
    info: (title: string, message?: string, duration?: number) => add('info', title, message, duration),
    remove,
  }
}
