'use client'

import { useState, useEffect, useCallback } from 'react'

export interface ToastItem {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

// Global store for React toasts
type ToastListener = (toasts: ToastItem[]) => void
let memoryToasts: ToastItem[] = []
const listeners = new Set<ToastListener>()

const notify = () => {
  listeners.forEach((listener) => listener([...memoryToasts]))
}

export const toast = {
  add: (type: ToastItem['type'], title: string, message?: string, duration = 3500) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6)
    const newToast: ToastItem = { id, type, title, message, duration }
    memoryToasts = [...memoryToasts, newToast]
    notify()

    if (duration > 0) {
      setTimeout(() => {
        toast.remove(id)
      }, duration)
    }
  },
  remove: (id: string) => {
    memoryToasts = memoryToasts.filter((t) => t.id !== id)
    notify()
  },
  success: (title: string, message?: string, duration?: number) => toast.add('success', title, message, duration),
  error: (title: string, message?: string, duration?: number) => toast.add('error', title, message, duration),
  warning: (title: string, message?: string, duration?: number) => toast.add('warning', title, message, duration),
  info: (title: string, message?: string, duration?: number) => toast.add('info', title, message, duration),
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>(memoryToasts)

  useEffect(() => {
    const listener: ToastListener = (newToasts) => setToasts(newToasts)
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  return {
    toasts,
    toast,
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
    remove: toast.remove,
  }
}
