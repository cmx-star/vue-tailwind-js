<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <input
        :id="inputId"
        :type="currentType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
      />
      <button
        v-if="type === 'password'"
        type="button"
        tabindex="-1"
        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer focus:outline-none"
        @click="togglePasswordVisibility"
      >
        <EyeIcon v-if="!showPassword" class="h-5 w-5" aria-hidden="true" />
        <EyeSlashIcon v-else class="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ hint }}</p>
  </div>
</template>

<script>
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'CompBaseInput',
  components: {
    EyeIcon,
    EyeSlashIcon,
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: Boolean,
    required: Boolean,
    error: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
  },
  emits: ['update:modelValue', 'blur'],
  data() {
    return {
      showPassword: false,
      // 使用随机ID
      inputId: `input-${Math.random().toString(36).substr(2, 9)}`,
    }
  },
  computed: {
    currentType() {
      if (this.type === 'password') {
        return this.showPassword ? 'text' : 'password'
      }
      return this.type
    },
    inputClasses() {
      const baseClasses =
        'block w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed'

      // 如果是密码框，右侧需要留出图标位置
      const paddingRight = this.type === 'password' ? 'pr-10' : ''

      let statusClasses = ''
      if (this.error) {
        statusClasses =
          'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-600 dark:text-red-400'
      } else {
        statusClasses =
          'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500'
      }

      return `${baseClasses} ${paddingRight} ${statusClasses}`
    },
  },
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    handleBlur(event) {
      this.$emit('blur', event)
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
  },
}
</script>
