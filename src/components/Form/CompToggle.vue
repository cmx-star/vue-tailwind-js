<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      class="sr-only peer"
      @change="handleChange"
    >
    <div :class="toggleClasses"></div>
    <span v-if="label" class="select-none ms-3 text-sm font-medium text-gray-900 dark:text-white">
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'CompToggle',
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'base',
      validator: (value) => ['sm', 'base', 'lg'].includes(value)
    }
  },
  computed: {
    toggleClasses() {
      const sizeClasses = {
        sm: 'w-7 h-4 after:h-3 after:w-3',
        base: 'w-9 h-5 after:h-4 after:w-4',
        lg: 'w-11 h-6 after:h-5 after:w-5'
      };
      
      const baseClasses = 'relative bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all peer-checked:bg-blue-600';
      
      const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : '';
      
      return `${baseClasses} ${sizeClasses[this.size]} ${disabledClasses}`;
    }
  },
  methods: {
    handleChange(event) {
      if (!this.disabled) {
        this.$emit('change', event.target.checked);
      }
    }
  }
};
</script>
