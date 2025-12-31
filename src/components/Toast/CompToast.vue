<template>
  <transition name="toast-fade">
    <div
      v-if="visible"
      :class="toastClasses"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <svg
        class="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          v-if="type === 'success'"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
        <path
          v-else-if="type === 'warning' || type === 'danger'"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
        <path
          v-else
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <p>
        <span v-if="title" class="font-medium me-1">{{ title }}</span>
        {{ message }}
      </p>
      <button
        v-if="showClose"
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700"
        @click="close"
      >
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CompToast',
  data() {
    return {
      visible: false,
      message: '',
      title: '',
      type: 'info',
      duration: 3000,
      showClose: true,
      onClose: null,
      timer: null
    };
  },
  computed: {
    toastClasses() {
      const baseClasses = 'flex items-start sm:items-center p-4 text-sm rounded-lg transition-all duration-300';
      
      const typeClasses = {
        info: 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
        danger: 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400',
        success: 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400',
        warning: 'text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300',
        dark: 'text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
      };
      
      return `${baseClasses} ${typeClasses[this.type] || typeClasses.info}`;
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.close();
        }, this.duration);
      }
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    close() {
      this.visible = false;
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
      setTimeout(() => {
        this.$destroy();
        if (this.$el && this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el);
        }
      }, 300);
    }
  }
};
</script>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}

.toast-fade-enter {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
