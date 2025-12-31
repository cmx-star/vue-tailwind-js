<template>
  <div :class="containerClass">
    <div :class="wrapperClasses">
      <input
        :id="inputId"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      >
      <label :for="inputId" :class="labelClasses">
        <svg v-if="icon" class="w-4 h-4 me-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon"/>
        </svg>
        {{ label }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompFloatingInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ' '
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'filled',
      validator: (value) => ['filled', 'outlined', 'standard'].includes(value)
    },
    containerClass: {
      type: String,
      default: 'mb-6'
    }
  },
  computed: {
    inputId() {
      return `floating-${Math.random().toString(36).substr(2, 9)}`;
    },
    wrapperClasses() {
      if (this.variant === 'standard') {
        return 'relative z-0';
      }
      return 'relative';
    },
    inputClasses() {
      const baseClasses = 'block w-full text-sm text-gray-900 dark:text-white appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-500 peer';
      
      const variantClasses = {
        filled: 'rounded-t-lg px-2.5 pb-2.5 pt-5 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 dark:border-gray-600',
        outlined: 'px-2.5 pb-2.5 pt-4 bg-transparent rounded-lg border border-gray-300 dark:border-gray-600',
        standard: 'py-2.5 px-0 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600'
      };
      
      const disabledClasses = this.disabled ? 'cursor-not-allowed opacity-50' : '';
      
      return `${baseClasses} ${variantClasses[this.variant]} ${disabledClasses}`;
    },
    labelClasses() {
      const baseClasses = 'inline-flex items-center absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform origin-[0] peer-focus:text-blue-600 dark:peer-focus:text-blue-500';
      
      const variantClasses = {
        filled: '-translate-y-4 scale-75 top-4 z-10 start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4',
        outlined: '-translate-y-4 scale-75 top-2 z-10 bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1',
        standard: '-translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
      };
      
      return `${baseClasses} ${variantClasses[this.variant]}`;
    }
  }
};
</script>
