<template>
  <div :class="containerClass">
    <label v-if="label" :for="inputId" :class="labelClasses">
      {{ label }}
    </label>
    
    <textarea
      :id="inputId"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :rows="rows"
      :class="textareaClasses"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    ></textarea>
    
    <p v-if="helperText" :class="helperClasses">
      <span v-if="helperBold" class="font-medium">{{ helperBold }}</span>
      {{ helperText }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CompTextarea',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 4
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    state: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'success', 'error'].includes(value)
    },
    helperText: {
      type: String,
      default: ''
    },
    helperBold: {
      type: String,
      default: ''
    },
    containerClass: {
      type: String,
      default: 'mb-6'
    }
  },
  computed: {
    inputId() {
      return `textarea-${Math.random().toString(36).substr(2, 9)}`;
    },
    labelClasses() {
      const stateColors = {
        default: 'text-gray-900 dark:text-white',
        success: 'text-green-700 dark:text-green-500',
        error: 'text-red-700 dark:text-red-500'
      };
      return `block mb-2.5 text-sm font-medium ${stateColors[this.state]}`;
    },
    textareaClasses() {
      const baseClasses = 'block w-full text-sm rounded-lg shadow-sm p-3.5';
      
      const stateClasses = {
        default: 'bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500 dark:placeholder:text-gray-400',
        success: 'bg-green-50 dark:bg-gray-700 border border-green-500 dark:border-green-500 text-green-900 dark:text-green-400 focus:ring-green-500 focus:border-green-500 placeholder:text-green-700 dark:placeholder:text-green-500',
        error: 'bg-red-50 dark:bg-gray-700 border border-red-500 dark:border-red-500 text-red-900 dark:text-red-500 focus:ring-red-500 focus:border-red-500 placeholder:text-red-700 dark:placeholder:text-red-500'
      };
      
      const disabledClasses = this.disabled ? 'cursor-not-allowed text-gray-400 dark:text-gray-500' : '';
      
      return `${baseClasses} ${stateClasses[this.state]} ${disabledClasses}`;
    },
    helperClasses() {
      const stateColors = {
        default: 'text-gray-700 dark:text-gray-400',
        success: 'text-green-700 dark:text-green-500',
        error: 'text-red-700 dark:text-red-500'
      };
      return `mt-2.5 text-sm ${stateColors[this.state]}`;
    }
  }
};
</script>
