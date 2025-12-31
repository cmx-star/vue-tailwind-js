<template>
  <div :class="wrapperClasses">
    <div class="flex items-center" :class="containerPadding">
      <input
        :id="inputId"
        type="checkbox"
        :checked="checked"
        :value="value"
        :disabled="disabled"
        :class="checkboxClasses"
        @change="handleChange"
      >
      <label :for="inputId" :class="labelClasses">
        <slot>
          <p v-if="label" class="select-none w-full text-sm font-medium text-gray-900 dark:text-white">
            {{ label }}
          </p>
          <p v-if="description" class="select-none text-sm text-gray-700 dark:text-gray-400">
            {{ description }}
          </p>
        </slot>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompCheckbox',
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'bordered', 'list'].includes(value)
    }
  },
  computed: {
    inputId() {
      return `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    },
    wrapperClasses() {
      if (this.variant === 'bordered' || this.variant === 'list') {
        return 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm';
      }
      return this.bordered ? 'flex items-center mb-4' : 'flex items-center mb-4';
    },
    containerPadding() {
      if (this.variant === 'bordered') {
        return this.description ? 'space-x-2.5' : 'ps-4';
      }
      if (this.variant === 'list') {
        return 'ps-3';
      }
      return '';
    },
    checkboxClasses() {
      const baseClasses = 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600';
      
      if (this.variant === 'bordered' && this.description) {
        return `${baseClasses} mt-4 ms-4`;
      }
      
      return baseClasses;
    },
    labelClasses() {
      const baseClasses = 'select-none ms-2 text-sm font-medium';
      const disabledClasses = this.disabled ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white';
      
      if (this.variant === 'bordered') {
        return this.description ? 'py-4 pe-4' : `${baseClasses} w-full py-4 ${disabledClasses}`;
      }
      
      if (this.variant === 'list') {
        return `${baseClasses} w-full py-3 ${disabledClasses}`;
      }
      
      return `${baseClasses} ${disabledClasses}`;
    }
  },
  methods: {
    handleChange(event) {
      this.$emit('change', event.target.checked);
    }
  }
};
</script>
