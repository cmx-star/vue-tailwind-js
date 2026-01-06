import { ref } from 'vue'

const toastInstance = ref(null)

export function useToast() {
  const success = (message, duration = 3000, title = null) => {
    if (toastInstance.value) {
      toastInstance.value.success(message, duration, title)
    }
  }

  const error = (message, duration = 3000, title = null) => {
    if (toastInstance.value) {
      toastInstance.value.error(message, duration, title)
    }
  }

  const danger = (message, duration = 3000, title = null) => {
    if (toastInstance.value) {
      toastInstance.value.danger(message, duration, title)
    }
  }

  const warning = (message, duration = 3000, title = null) => {
    if (toastInstance.value) {
      toastInstance.value.warning(message, duration, title)
    }
  }

  const info = (message, duration = 3000, title = null) => {
    if (toastInstance.value) {
      toastInstance.value.info(message, duration, title)
    }
  }

  return {
    success,
    error,
    danger,
    warning,
    info,
  }
}

export function setToastInstance(instance) {
  toastInstance.value = instance
}
