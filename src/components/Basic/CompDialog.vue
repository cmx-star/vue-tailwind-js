<template>
  <teleport to="body">
    <transition name="dialog-fade">
      <div
        v-if="visible"
        class="fixed inset-0 overflow-y-auto overflow-x-hidden flex justify-center items-center"
        :style="{ zIndex: zIndexes.content }"
      >
        <!-- 遮罩层 -->
        <transition name="backdrop-fade">
          <div
            v-if="visible"
            class="fixed inset-0 bg-gray-900/50 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity"
            :style="{ zIndex: zIndexes.backdrop }"
            @click="handleBackdropClick"
          ></div>
        </transition>

        <!-- Dialog 内容 -->
        <div
          class="relative w-full max-h-full p-4"
          :class="widthClass"
          :style="{ zIndex: zIndexes.content }"
        >
          <div
            class="relative bg-neutral-primary-soft border border-default rounded-lg shadow-sm p-4 md:p-6"
          >
            <!-- Header -->
            <div
              v-if="showHeader"
              class="flex items-center justify-between border-b border-default pb-4 md:pb-5"
            >
              <slot name="header">
                <h3 class="text-lg font-medium text-heading">
                  {{ title }}
                </h3>
              </slot>
              <button
                type="button"
                class="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                @click="handleClose"
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <!-- Body -->
            <div class="py-4 md:py-6 pr-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <slot></slot>
            </div>

            <!-- Footer -->
            <div
              v-if="showFooter"
              class="flex items-center border-t border-default space-x-4 pt-4 md:pt-5"
            >
              <slot name="footer">
                <button
                  type="button"
                  class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                  @click="handleConfirm"
                >
                  确定
                </button>
                <button
                  type="button"
                  class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                  @click="handleClose"
                >
                  取消
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { pushDialog, popDialog } from '@/utils/useDialogStack'

export default {
  name: 'CompDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: '2xl',
      validator: (value) =>
        ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'full'].includes(value),
    },
  },
  emits: ['update:modelValue', 'close', 'open', 'confirm'],
  data() {
    return {
      visible: this.modelValue,
      dialogId: null,
      zIndexes: {
        backdrop: 40,
        content: 50,
      },
    }
  },
  computed: {
    widthClass() {
      return `max-w-${this.width}`
    },
  },
  watch: {
    modelValue(newVal) {
      if (newVal) {
        this.open()
      } else {
        this.close()
      }
    },
  },
  mounted() {
    if (this.modelValue) {
      this.open()
    }
  },
  beforeUnmount() {
    this.cleanup()
  },
  methods: {
    open() {
      this.visible = true
      this.dialogId = `dialog-${Date.now()}-${Math.random()}`

      // 推入栈并获取 z-index
      const { backdropZIndex, contentZIndex } = pushDialog(this.dialogId)
      this.zIndexes.backdrop = backdropZIndex
      this.zIndexes.content = contentZIndex

      // 锁定 body 滚动
      document.body.style.overflow = 'hidden'

      // 监听 ESC 键
      if (this.closeOnPressEscape) {
        document.addEventListener('keydown', this.handleEscapeKey)
      }

      this.$emit('open')
    },
    close() {
      this.visible = false

      // 从栈中移除
      if (this.dialogId) {
        popDialog(this.dialogId)
      }

      this.cleanup()
      this.$emit('update:modelValue', false)
      this.$emit('close')
    },
    cleanup() {
      // 恢复 body 滚动
      document.body.style.overflow = ''

      // 移除 ESC 键监听
      document.removeEventListener('keydown', this.handleEscapeKey)
    },
    handleBackdropClick() {
      if (this.closeOnClickModal) {
        this.handleClose()
      }
    },
    handleClose() {
      this.close()
    },
    handleConfirm() {
      this.$emit('confirm')
      this.close()
    },
    handleEscapeKey(event) {
      if (event.key === 'Escape') {
        this.handleClose()
      }
    },
  },
}
</script>

<style scoped>
/* Dialog 淡入淡出动画 */
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

/* 遮罩层淡入淡出动画 */
.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  opacity: 0;
}

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-scrollbar, rgba(156, 163, 175, 0.3));
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--color-scrollbar-hover, rgba(156, 163, 175, 0.5));
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-scrollbar-dark, rgba(75, 85, 99, 0.5));
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--color-scrollbar-dark-hover, rgba(75, 85, 99, 0.7));
}
</style>
