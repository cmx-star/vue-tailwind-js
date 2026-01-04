<template>
  <div :class="containerClass">
    <label
      v-if="label"
      :for="inputId"
      class="block mb-2.5 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ label }}
    </label>

    <div class="relative flex items-center max-w-[9rem] shadow-sm rounded-lg">
      <button
        type="button"
        :disabled="disabled || value <= min"
        :class="decrementClasses"
        @click="decrement"
      >
        <svg
          class="w-4 h-4 text-gray-900 dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14"
          />
        </svg>
      </button>

      <input
        :id="inputId"
        type="text"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        class="border-x-0 h-10 text-center w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-2.5 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none"
        @input="handleInput"
        @blur="handleBlur"
      />

      <button
        type="button"
        :disabled="disabled || value >= max"
        :class="incrementClasses"
        @click="increment"
      >
        <svg
          class="w-4 h-4 text-gray-900 dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14m-7 7V5"
          />
        </svg>
      </button>
    </div>

    <p v-if="helperText" class="mt-2.5 text-sm text-gray-700 dark:text-gray-400">
      {{ helperText }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CompNumberInput',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '0',
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 999,
    },
    step: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    helperText: {
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
      return `number-input-${Math.random().toString(36).substr(2, 9)}`
    },
    baseButtonClasses() {
      return 'text-gray-700 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 font-medium text-sm px-3 focus:outline-none h-10'
    },
    decrementClasses() {
      const disabled =
        this.disabled || this.value <= this.min ? 'opacity-50 cursor-not-allowed' : ''
      return `${this.baseButtonClasses} rounded-s-lg ${disabled}`
    },
    incrementClasses() {
      const disabled =
        this.disabled || this.value >= this.max ? 'opacity-50 cursor-not-allowed' : ''
      return `${this.baseButtonClasses} rounded-e-lg ${disabled}`
    },
  },
  methods: {
    decrement() {
      if (this.value > this.min) {
        const newValue = this.value - this.step
        this.$emit('input', Math.max(newValue, this.min))
      }
    },
    increment() {
      if (this.value < this.max) {
        const newValue = this.value + this.step
        this.$emit('input', Math.min(newValue, this.max))
      }
    },
    handleInput(event) {
      const value = parseInt(event.target.value) || 0
      const clampedValue = Math.max(this.min, Math.min(value, this.max))
      this.$emit('input', clampedValue)
    },
    handleBlur() {
      // 确保值在范围内
      if (this.value < this.min) {
        this.$emit('input', this.min)
      } else if (this.value > this.max) {
        this.$emit('input', this.max)
      }
    },
  },
}
</script>
