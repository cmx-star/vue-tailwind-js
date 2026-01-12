<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="modelValue"
      tabindex="-1"
      aria-hidden="true"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-gray-900/50 dark:bg-gray-900/80" @click="close"></div>

      <!-- Modal Content -->
      <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-900">
          <!-- Header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b border-gray-300 rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ title }}
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="close"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <!-- Body -->
          <div class="p-4 md:p-5 space-y-4">
            <template v-if="content">
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {{ content }}
              </p>
            </template>
            <slot v-else></slot>
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer || showFooter"
            class="flex items-center p-4 md:p-5 border-t border-gray-300 rounded-b dark:border-gray-600"
          >
            <slot name="footer">
              <div class="flex justify-end gap-3 w-full">
                <button
                  v-if="showConfirm"
                  type="button"
                  class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  @click="onConfirm"
                >
                  {{ displayConfirmText }}
                </button>
                <button
                  v-if="showCancel"
                  type="button"
                  class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  @click="onCancel"
                >
                  {{ displayCancelText }}
                </button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'CompModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Modal Title',
    },
    content: {
      type: String,
      default: '',
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
    showConfirm: {
      type: Boolean,
      default: true,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    confirmText: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'close', 'confirm', 'cancel'],
  computed: {
    displayConfirmText() {
      return this.confirmText || this.$t('common.confirm')
    },
    displayCancelText() {
      return this.cancelText || this.$t('common.cancel')
    },
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false)
      this.$emit('close')
    },
    onConfirm() {
      this.$emit('confirm')
    },
    onCancel() {
      this.$emit('cancel')
      this.close()
    },
  },
}
</script>
