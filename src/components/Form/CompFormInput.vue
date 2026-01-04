<template>
  <div :class="containerClass">
    <label v-if="label" :for="inputId" :class="labelClasses">
      {{ label }}
    </label>

    <div :class="inputWrapperClass">
      <!-- Prefix Icon/Text -->
      <div v-if="prefixIcon || prefixText" :class="prefixClasses">
        <svg
          v-if="prefixIcon"
          class="w-4 h-4 text-gray-700 dark:text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="prefixIcon"
          />
        </svg>
        <span v-else-if="prefixText">{{ prefixText }}</span>
      </div>

      <input
        :id="inputId"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :pattern="pattern"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
    </div>

    <p v-if="helperText" :class="helperClasses">
      <span v-if="helperBold" class="font-medium">{{ helperBold }}</span>
      {{ helperText }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CompFormInput',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    pattern: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'success', 'error'].includes(value),
    },
    helperText: {
      type: String,
      default: '',
    },
    helperBold: {
      type: String,
      default: '',
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    prefixText: {
      type: String,
      default: '',
    },
    containerClass: {
      type: String,
      default: 'mb-6',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
  },
  computed: {
    inputId() {
      return `input-${Math.random().toString(36).substr(2, 9)}`
    },
    labelClasses() {
      const stateColors = {
        default: 'text-gray-900 dark:text-white',
        success: 'text-green-700 dark:text-green-500',
        error: 'text-red-700 dark:text-red-500',
      }
      return `block mb-2.5 text-sm font-medium ${stateColors[this.state]}`
    },
    inputWrapperClass() {
      return this.prefixIcon || this.prefixText ? 'relative flex shadow-sm rounded-lg' : ''
    },
    prefixClasses() {
      if (this.prefixIcon) {
        return 'absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'
      }
      return 'inline-flex items-center px-3 text-sm text-gray-700 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 border rounded-e-0 border-gray-300 dark:border-gray-600 border-e-0 rounded-s-lg'
    },
    inputClasses() {
      const baseClasses = 'block w-full text-sm rounded-lg shadow-sm'
      const paddingClasses = this.prefixIcon
        ? 'ps-9 pe-3 py-2.5'
        : this.prefixText
          ? 'rounded-none rounded-e-lg px-3 py-2.5'
          : 'px-3 py-2.5'

      const stateClasses = {
        default:
          'bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500 dark:placeholder:text-gray-400',
        success:
          'bg-green-50 dark:bg-gray-700 border border-green-500 dark:border-green-500 text-green-900 dark:text-green-400 focus:ring-green-500 focus:border-green-500 placeholder:text-green-700 dark:placeholder:text-green-500',
        error:
          'bg-red-50 dark:bg-gray-700 border border-red-500 dark:border-red-500 text-red-900 dark:text-red-500 focus:ring-red-500 focus:border-red-500 placeholder:text-red-700 dark:placeholder:text-red-500',
      }

      const disabledClasses = this.disabled
        ? 'cursor-not-allowed text-gray-400 dark:text-gray-500'
        : ''

      return `${baseClasses} ${paddingClasses} ${stateClasses[this.state]} ${disabledClasses}`
    },
    helperClasses() {
      const stateColors = {
        default: 'text-gray-700 dark:text-gray-400',
        success: 'text-green-700 dark:text-green-500',
        error: 'text-red-700 dark:text-red-500',
      }
      return `mt-2.5 text-sm ${stateColors[this.state]}`
    },
  },
}
</script>
