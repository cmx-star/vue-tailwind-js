<template>
  <div ref="toastContainer" class="fixed top-4 right-4 z-9999 space-y-3">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'flex items-start sm:items-center w-full max-w-sm p-4 rounded-lg shadow-xl border backdrop-blur-sm transition-all duration-300 transform hover:scale-105',
          getToastClasses(toast.type),
        ]"
        role="alert"
      >
        <div
          :class="[
            'inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg',
            getIconClasses(toast.type),
          ]"
        >
          <svg
            v-if="toast.type === 'success'"
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
            />
          </svg>
          <svg
            v-else-if="toast.type === 'error' || toast.type === 'danger'"
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
            />
          </svg>
          <svg
            v-else-if="toast.type === 'warning'"
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"
            />
          </svg>
          <svg
            v-else
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div class="ms-3 text-sm flex-1">
          <p v-if="toast.title" class="font-semibold mb-1">{{ toast.title }}</p>
          <p class="font-normal">{{ toast.message }}</p>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'CompToast',
  data() {
    return {
      toasts: [],
      toastId: 0,
    }
  },
  methods: {
    // 获取 Toast 容器样式类
    getToastClasses(type) {
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
    },

    // 获取图标样式类
    getIconClasses(type) {
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
    },

    // 获取关闭按钮样式类
    getCloseButtonClasses(type) {
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
    },

    show(message, type = 'info', duration = 3000, title = null) {
      const id = ++this.toastId
      this.toasts.push({ id, message, type, title })

      if (duration > 0) {
        setTimeout(() => {
          this.removeToast(id)
        }, duration)
      }
    },

    removeToast(id) {
      const index = this.toasts.findIndex((t) => t.id === id)
      if (index > -1) {
        this.toasts.splice(index, 1)
      }
    },

    success(message, duration = 3000, title = null) {
      this.show(message, 'success', duration, title)
    },
    error(message, duration = 3000, title = null) {
      this.show(message, 'error', duration, title)
    },
    danger(message, duration = 3000, title = null) {
      this.show(message, 'danger', duration, title)
    },
    warning(message, duration = 3000, title = null) {
      this.show(message, 'warning', duration, title)
    },
    info(message, duration = 3000, title = null) {
      this.show(message, 'info', duration, title)
    },
  },
}
</script>

<style scoped>
/* Toast 进入/离开动画 */
.toast-enter-active {
  animation: toast-in 0.3s ease-out;
}

.toast-leave-active {
  animation: toast-out 0.3s ease-in;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes toast-out {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(100%) scale(0.9);
  }
}
</style>
