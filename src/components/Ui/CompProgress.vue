<template>
  <div>
    <div v-if="showLabel" :class="labelClasses">{{ label }}</div>
    <div :class="containerClasses">
      <div :class="barClasses" :style="barStyles">
        <span v-if="showPercentage" class="text-xs font-medium text-white text-center leading-none">
          {{ percentage }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompProgress',
  props: {
    percentage: {
      type: Number,
      required: true,
      validator: (value) => value >= 0 && value <= 100,
    },
    variant: {
      type: String,
      default: 'brand',
      validator: (value) => ['brand', 'dark', 'success', 'danger', 'warning'].includes(value),
    },
    size: {
      type: String,
      default: 'base',
      validator: (value) => ['sm', 'base', 'lg'].includes(value),
    },
    showPercentage: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    labelClasses() {
      const sizeMap = {
        sm: 'text-sm',
        base: 'text-sm',
        lg: 'text-base',
      }
      const variantMap = {
        brand: 'text-blue-600 dark:text-blue-400',
        dark: 'text-gray-900 dark:text-white',
        success: 'text-green-600 dark:text-green-400',
        danger: 'text-red-600 dark:text-red-400',
        warning: 'text-yellow-600 dark:text-yellow-400',
      }
      return `mb-1 font-medium ${sizeMap[this.size]} ${variantMap[this.variant]}`
    },
    containerClasses() {
      const sizeMap = {
        sm: 'h-1.5',
        base: 'h-2',
        lg: 'h-2.5',
      }
      const heightClass = this.showPercentage ? 'h-4' : sizeMap[this.size]
      return `w-full bg-gray-200 dark:bg-gray-700 rounded-full ${heightClass}`
    },
    barClasses() {
      const sizeMap = {
        sm: 'h-1.5',
        base: 'h-2',
        lg: 'h-2.5',
      }
      const variantMap = {
        brand: 'bg-blue-600',
        dark: 'bg-gray-800 dark:bg-gray-600',
        success: 'bg-green-600',
        danger: 'bg-red-600',
        warning: 'bg-yellow-400',
      }
      const heightClass = this.showPercentage
        ? 'h-4 flex items-center justify-center p-0.5'
        : sizeMap[this.size]
      return `${variantMap[this.variant]} ${heightClass} rounded-full transition-all duration-300`
    },
    barStyles() {
      return {
        width: `${this.percentage}%`,
      }
    },
  },
}
</script>
