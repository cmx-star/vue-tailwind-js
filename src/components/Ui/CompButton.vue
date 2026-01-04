<template>
  <button :type="type" :disabled="disabled" :class="buttonClasses" @click="handleClick">
    <slot name="icon-left"></slot>
    <slot></slot>
    <slot name="icon-right"></slot>
  </button>
</template>

<script>
export default {
  name: 'CompButton',
  props: {
    // 按钮类型
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value),
    },
    // 按钮变体：default, secondary, tertiary, success, danger, warning, dark, ghost, outline-brand, outline-gray, outline-success, outline-danger, outline-warning
    variant: {
      type: String,
      default: 'default',
      validator: (value) =>
        [
          'default',
          'secondary',
          'tertiary',
          'success',
          'danger',
          'warning',
          'dark',
          'ghost',
          'outline-brand',
          'outline-gray',
          'outline-success',
          'outline-danger',
          'outline-warning',
        ].includes(value),
    },
    // 按钮尺寸：xs, sm, base, lg, xl
    size: {
      type: String,
      default: 'base',
      validator: (value) => ['xs', 'sm', 'base', 'lg', 'xl'].includes(value),
    },
    // 按钮形状：base (rounded), full (rounded-full)
    shape: {
      type: String,
      default: 'base',
      validator: (value) => ['base', 'full'].includes(value),
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否全宽
    block: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      const classes = [
        // 基础样式
        'inline-flex items-center justify-center',
        'box-border border',
        'font-medium leading-5',
        'transition-all duration-200',
        'focus:outline-none focus:ring-4',

        // 尺寸
        this.sizeClasses,

        // 形状
        this.shapeClasses,

        // 变体
        this.variantClasses,

        // 禁用状态
        this.disabled && 'opacity-50 cursor-not-allowed',

        // 全宽
        this.block && 'w-full',
      ]

      return classes.filter(Boolean).join(' ')
    },

    sizeClasses() {
      const sizeMap = {
        xs: 'text-xs px-3 py-1.5',
        sm: 'text-sm px-3 py-2',
        base: 'text-sm px-4 py-2.5',
        lg: 'text-base px-5 py-3',
        xl: 'text-base px-6 py-3.5',
      }
      return sizeMap[this.size]
    },

    shapeClasses() {
      const shapeMap = {
        base: 'rounded-lg',
        full: 'rounded-full',
      }
      return shapeMap[this.shape]
    },

    variantClasses() {
      const variantMap = {
        // 实心按钮
        default:
          'text-white bg-blue-600 border-transparent hover:bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-sm',

        secondary:
          'text-gray-700 bg-gray-100 border-gray-200 hover:bg-gray-200 hover:text-gray-900 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-700 shadow-sm',

        tertiary:
          'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 shadow-sm',

        success:
          'text-white bg-green-600 border-transparent hover:bg-green-700 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 shadow-sm',

        danger:
          'text-white bg-red-600 border-transparent hover:bg-red-700 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 shadow-sm',

        warning:
          'text-white bg-yellow-500 border-transparent hover:bg-yellow-600 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900 shadow-sm',

        dark: 'text-white bg-gray-800 border-transparent hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 shadow-sm',

        ghost:
          'text-gray-900 bg-transparent border-transparent hover:bg-gray-100 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700',

        // 描边按钮
        'outline-brand':
          'text-blue-600 bg-white border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-200 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-600 dark:hover:text-white',

        'outline-gray':
          'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white',

        'outline-success':
          'text-green-600 bg-white border-green-600 hover:bg-green-600 hover:text-white focus:ring-green-300 dark:bg-gray-800 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-600 dark:hover:text-white',

        'outline-danger':
          'text-red-600 bg-white border-red-600 hover:bg-red-600 hover:text-white focus:ring-red-300 dark:bg-gray-800 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-600 dark:hover:text-white',

        'outline-warning':
          'text-yellow-600 bg-white border-yellow-600 hover:bg-yellow-600 hover:text-white focus:ring-yellow-300 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-400 dark:hover:bg-yellow-600 dark:hover:text-white',
      }

      return variantMap[this.variant]
    },
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    },
  },
}
</script>

<style scoped>
/* 图标间距调整 */
button :deep(svg) {
  flex-shrink: 0;
}

button :deep(svg:first-child:not(:only-child)) {
  margin-right: 0.375rem;
  margin-left: -0.125rem;
}

button :deep(svg:last-child:not(:first-child)) {
  margin-left: 0.375rem;
  margin-right: -0.125rem;
}

button :deep(svg:only-child) {
  margin: 0;
}
</style>
