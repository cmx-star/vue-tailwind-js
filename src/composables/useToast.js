import { getToastInstance } from '@/plugins/toast'

export function useToast() {
  const getInstance = () => {
    const instance = getToastInstance()
    if (!instance) {
      console.warn('Toast plugin not installed or not mounted yet.')
    }
    return instance
  }

  const success = (message, duration = 3000, title = null) => {
    getInstance()?.success(message, duration, title)
  }

  const error = (message, duration = 3000, title = null) => {
    getInstance()?.error(message, duration, title)
  }

  const danger = (message, duration = 3000, title = null) => {
    getInstance()?.danger(message, duration, title)
  }

  const warning = (message, duration = 3000, title = null) => {
    getInstance()?.warning(message, duration, title)
  }

  const info = (message, duration = 3000, title = null) => {
    getInstance()?.info(message, duration, title)
  }

  // 直接暴露 show 方法
  const show = (message, type, duration, title) => {
    getInstance()?.show(message, type, duration, title)
  }

  return {
    success,
    error,
    danger,
    warning,
    info,
    show,
  }
}
