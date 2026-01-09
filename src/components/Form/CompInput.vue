<template>
  <div class="w-full">
    <div class="relative">
      <!-- Textarea -->
      <textarea
        v-if="type === 'textarea'"
        :id="inputId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :rows="rows"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :class="textareaClasses"
        @input="handleInput"
        @blur="handleBlur"
      ></textarea>

      <!-- Input -->
      <input
        v-else
        :id="inputId"
        :type="currentType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
      />

      <!-- Password toggle button -->
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
  </div>
</template>

<script>
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'CompInput',
  components: {
    EyeIcon,
    EyeSlashIcon,
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      // 'text', 'password', 'email', 'number', 'textarea', etc.
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: Boolean,
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
      default: 'new-password',
    },
    rows: {
      type: [Number, String],
      default: 4,
    },
    maxlength: {
      type: [Number, String],
      default: null,
    },
  },
  emits: ['update:modelValue', 'blur'],
  data() {
    return {
      showPassword: false,
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
    baseClasses() {
      return 'block w-full border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed'
    },
    statusClasses() {
      if (this.error) {
        return 'border-danger/50 text-danger placeholder-danger/60 focus:ring-danger/50 focus:border-danger dark:border-danger/70 dark:text-danger'
      }
      return 'bg-neutral-secondary-medium border-default-medium text-heading focus:ring-primary-500 focus:border-primary-500 shadow-xs placeholder:text-body'
    },
    inputClasses() {
      const paddingRight = this.type === 'password' ? 'pr-10' : ''
      return `${this.baseClasses} px-3 py-2 rounded-lg ${paddingRight} ${this.statusClasses}`
    },
    textareaClasses() {
      return `${this.baseClasses} p-3.5 rounded-base ${this.statusClasses} resize-y`
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
