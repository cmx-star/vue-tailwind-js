<template>
  <div :class="wrapperClasses">
    <div class="flex items-center" :class="containerPadding">
      <input
        :id="inputId"
        type="radio"
        :checked="checked"
        :value="value"
        :name="name"
        :disabled="disabled"
        :class="radioClasses"
        @change="handleChange"
      >
      <label :for="inputId" :class="labelClasses">
        <slot>
          <div v-if="variant === 'card'" class="block">
            <slot name="icon"></slot>
            <div v-if="label" class="w-full font-medium mb-1">{{ label }}</div>
            <div v-if="description" class="w-full text-sm">{{ description }}</div>
          </div>
          <p v-else-if="label" class="select-none w-full text-sm font-medium text-gray-900 dark:text-white">
            {{ label }}
          </p>
        </slot>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompRadio',
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    name: {
      type: String,
      required: true
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
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'list', 'card'].includes(value)
    }
  },
  computed: {
    inputId() {
      return `radio-${Math.random().toString(36).substr(2, 9)}`;
    },
    wrapperClasses() {
      if (this.variant === 'card') {
        return '';
      }
      if (this.variant === 'list') {
        return '';
      }
      return 'flex items-center mb-4';
    },
    containerPadding() {
      if (this.variant === 'list') {
        return 'ps-3';
      }
      return '';
    },
    radioClasses() {
      const baseClasses = 'w-4 h-4 bg-gray-100 border-gray-300 rounded-full focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 appearance-none';
      const checkedClasses = 'checked:bg-blue-600 checked:border-blue-600';
      
      if (this.variant === 'card') {
        return 'hidden peer';
      }
      
      return `${baseClasses} ${checkedClasses}`;
    },
    labelClasses() {
      const disabledClasses = this.disabled ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white';
      
      if (this.variant === 'card') {
        const baseCardClasses = 'inline-flex items-center justify-between w-full p-5 bg-white dark:bg-gray-800 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700';
        const checkedCardClasses = this.checked 
          ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-500' 
          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-400';
        return `${baseCardClasses} ${checkedCardClasses}`;
      }
      
      if (this.variant === 'list') {
        return `select-none ms-2 text-sm font-medium w-full py-3 ${disabledClasses}`;
      }
      
      return `select-none ms-2 text-sm font-medium ${disabledClasses}`;
    }
  },
  methods: {
    handleChange(event) {
      this.$emit('change', this.value);
    }
  }
};
</script>

<style scoped>
/* 自定义单选框选中样式 */
input[type="radio"]:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
