<template>
  <div class="date-picker-wrapper">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative group">
      <!-- 图标显示 -->
      <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
        <svg
          v-if="mode === 'time'"
          class="w-5 h-5"
          :class="isDark ? 'text-gray-400' : 'text-gray-500'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5"
          :class="isDark ? 'text-gray-400' : 'text-gray-500'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <!-- Flatpickr Input -->
      <input
        :id="inputId"
        ref="datepicker"
        :placeholder="displayPlaceholder"
        :disabled="disabled"
        :class="inputClasses"
        autocomplete="off"
      />

      <!-- 清除按钮 -->
      <button
        v-if="clearable && value && !disabled"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        tabindex="-1"
        @click.stop="handleClear"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      {{ hint }}
    </p>
  </div>
</template>

<script>
import flatpickr from 'flatpickr'
import { Mandarin as Chinese } from 'flatpickr/dist/l10n/zh.js'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'CompDatePicker',
  props: {
    value: {
      type: [Date, String, Number, Object, Array],
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'date', // 'date' | 'time' | 'dateTime'
    },
    format: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: Boolean,
    required: Boolean,
    error: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    range: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fp: null,
      inputId: `fp-${Math.random().toString(36).substr(2, 9)}`,
    }
  },
  computed: {
    isDark() {
      return this.$store.state.theme.isDark
    },
    displayPlaceholder() {
      if (this.placeholder) return this.placeholder
      if (this.range) return '选择日期范围'
      switch (this.mode) {
        case 'time':
          return '选择时间'
        case 'dateTime':
          return '选择日期时间'
        default:
          return '选择日期'
      }
    },
    inputClasses() {
      const baseClasses =
        'block w-full pl-10 pr-10 py-2 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0'
      const darkClasses = this.isDark
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'

      if (this.error) {
        return `${baseClasses} ${darkClasses} border-red-500 focus:ring-red-500`
      }
      return `${baseClasses} ${darkClasses} focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`
    },
  },
  watch: {
    value(newVal) {
      if (this.fp && newVal !== this.fp.selectedDates) {
        this.fp.setDate(newVal, false)
      }
    },
    isDark() {
      // 当主题切换时，可能需要重新初始化或更新一些样式类
      // Flatpickr 容器可能需要通过 CSS 变量来适配。
    },
  },
  mounted() {
    this.initFlatpickr()
  },
  beforeUnmount() {
    if (this.fp) {
      this.fp.destroy()
    }
  },
  methods: {
    initFlatpickr() {
      const config = {
        locale: Chinese,
        mode: this.range ? 'range' : 'single',
        enableTime: this.mode === 'dateTime' || this.mode === 'time',
        enableSeconds: true, // 启用秒
        noCalendar: this.mode === 'time',
        dateFormat: this.getDateFormat(),
        defaultDate: this.value,
        disableMobile: true, // 强制使用桌面端样式以便统一样式
        onChange: (selectedDates, dateStr) => {
          this.$emit('input', this.range ? selectedDates : selectedDates[0] || null)
          this.$emit('change', dateStr)
        },
        onOpen: () => {
          // 定位与样式已由全局 CSS 变量处理
        },
      }

      this.fp = flatpickr(this.$refs.datepicker, config)
    },
    getDateFormat() {
      if (this.format) return this.format
      switch (this.mode) {
        case 'time':
          return 'H:i:S'
        case 'dateTime':
          return 'Y-m-d H:i:S'
        default:
          return 'Y-m-d'
      }
    },
    handleClear() {
      if (this.fp) {
        this.fp.clear()
        this.$emit('input', null)
      }
    },
  },
}
</script>

<style scoped>
.date-picker-wrapper {
  width: 100%;
}
</style>

<style>
/* 
  Flatpickr 的弹窗样式已迁移至 @/styles/index.css 使用 CSS 变量方案。
  该方案体积更小、优先级更高，且支持跨组件自动适配。
*/
</style>
