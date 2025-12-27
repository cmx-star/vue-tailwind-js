<template>
  <div ref="toastContainer" class="fixed top-4 right-4 z-50 space-y-4">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="[
        'flex items-start sm:items-center w-full max-w-xs p-4 rounded-base shadow-lg border transition-all duration-300',
        getToastClasses(toast.type)
      ]"
      role="alert"
    >
      <div :class="[
        'inline-flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-base',
        getIconClasses(toast.type)
      ]">
        <svg v-if="toast.type === 'success'" class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <svg v-else-if="toast.type === 'error' || toast.type === 'danger'" class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
        <svg v-else-if="toast.type === 'warning'" class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
        </svg>
        <svg v-else class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
      </div>
      <div class="ms-3 text-sm font-normal flex-1">
        <p v-if="toast.title" class="font-medium mb-1">{{ toast.title }}</p>
        <p>{{ toast.message }}</p>
      </div>
      <button
        type="button"
        @click="removeToast(toast.id)"
        class="ms-auto -mx-1.5 -my-1.5 rounded-base focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 opacity-70 hover:opacity-100 transition-opacity"
        :class="getCloseButtonClasses(toast.type)"
        aria-label="Close"
      >
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toastContainer = ref(null)
const toasts = ref([])
let toastId = 0

// 获取 Toast 容器样式类
const getToastClasses = (type) => {
  const baseClasses = 'text-sm'
  switch (type) {
    case 'success':
      return `${baseClasses} text-fg-success-strong rounded-base bg-success-soft border border-success-subtle`
    case 'error':
    case 'danger':
      return `${baseClasses} text-fg-danger-strong rounded-base bg-danger-soft border border-danger-subtle`
    case 'warning':
      return `${baseClasses} text-fg-warning rounded-base bg-warning-soft border border-warning-subtle`
    case 'info':
    default:
      return `${baseClasses} text-fg-brand-strong rounded-base bg-brand-softer border border-brand-subtle`
  }
}

// 获取图标样式类
const getIconClasses = (type) => {
  switch (type) {
    case 'success':
      return 'text-fg-success-strong'
    case 'error':
    case 'danger':
      return 'text-fg-danger-strong'
    case 'warning':
      return 'text-fg-warning'
    case 'info':
    default:
      return 'text-fg-brand-strong'
  }
}

// 获取关闭按钮样式类
const getCloseButtonClasses = (type) => {
  switch (type) {
    case 'success':
      return 'text-fg-success-strong hover:bg-success-medium focus:ring-success-subtle'
    case 'error':
    case 'danger':
      return 'text-fg-danger-strong hover:bg-danger-medium focus:ring-danger-subtle'
    case 'warning':
      return 'text-fg-warning hover:bg-warning-medium focus:ring-warning-subtle'
    case 'info':
    default:
      return 'text-fg-brand-strong hover:bg-brand-soft focus:ring-brand-subtle'
  }
}

const show = (message, type = 'info', duration = 3000, title = null) => {
  const id = ++toastId
  toasts.value.push({ id, message, type, title })

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const success = (message, duration = 3000, title = null) => show(message, 'success', duration, title)
const error = (message, duration = 3000, title = null) => show(message, 'error', duration, title)
const danger = (message, duration = 3000, title = null) => show(message, 'danger', duration, title)
const warning = (message, duration = 3000, title = null) => show(message, 'warning', duration, title)
const info = (message, duration = 3000, title = null) => show(message, 'info', duration, title)

defineExpose({
  show,
  success,
  error,
  danger,
  warning,
  info
})
</script>
