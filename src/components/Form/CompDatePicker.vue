<template>
  <div class="date-picker-wrapper">
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
        v-if="clearable && modelValue && !disabled"
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
  </div>
</template>

<script>
import flatpickr from 'flatpickr'
import { Mandarin as Chinese } from 'flatpickr/dist/l10n/zh.js'
import 'flatpickr/dist/flatpickr.css'
import { mapStores } from 'pinia'
import { useThemeStore } from '@/stores/theme'

export default {
  name: 'CompDatePicker',
  props: {
    modelValue: {
      type: [Date, String, Number, Object, Array],
      default: null,
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
    clearable: {
      type: Boolean,
      default: true,
    },
    range: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      fp: null,
      inputId: `fp-${Math.random().toString(36).substr(2, 9)}`,
    }
  },
  computed: {
    ...mapStores(useThemeStore),
    isDark() {
      return this.themeStore.isDark
    },
    displayPlaceholder() {
      if (this.placeholder) return this.placeholder
      if (this.range) return this.$t('common.date.range')
      switch (this.mode) {
        case 'time':
          return this.$t('common.date.time')
        case 'dateTime':
          return this.$t('common.date.dateTime')
        default:
          return this.$t('common.date.date')
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
      return `${baseClasses} ${darkClasses} focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed`
    },
  },
  watch: {
    modelValue: {
      handler(newVal) {
        if (!this.fp) return

        if (this.range && newVal && typeof newVal === 'object') {
          // 如果是对象格式 { start, end }，转换为数组传给 flatpickr
          const dates = []
          if (newVal.start) dates.push(newVal.start)
          if (newVal.end) dates.push(newVal.end)
          this.fp.setDate(dates, false)
        } else {
          this.fp.setDate(newVal, false)
        }
      },
      deep: true,
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
    initFlatpickr() {
      let defaultDate = this.modelValue
      if (this.range && defaultDate && typeof defaultDate === 'object') {
        const dates = []
        if (defaultDate.start) dates.push(defaultDate.start)
        if (defaultDate.end) dates.push(defaultDate.end)
        defaultDate = dates
      }

      const config = {
        locale: Chinese,
        mode: this.range ? 'range' : 'single',
        enableTime: this.mode === 'dateTime' || this.mode === 'time',
        enableSeconds: true,
        noCalendar: this.mode === 'time',
        dateFormat: this.getDateFormat(),
        defaultDate: defaultDate,
        disableMobile: true,
        onChange: (selectedDates, dateStr) => {
          let value = null
          if (this.range) {
            if (selectedDates.length === 2) {
              value = { start: selectedDates[0], end: selectedDates[1] }
            } else if (selectedDates.length === 1) {
              value = { start: selectedDates[0], end: null }
            }
          } else {
            value = selectedDates[0] || null
          }
          this.$emit('update:modelValue', value)
          this.$emit('change', dateStr)
        },
      }

      this.fp = flatpickr(this.$refs.datepicker, config)
    },
    handleClear() {
      if (this.fp) {
        this.fp.clear()
        this.$emit('update:modelValue', null)
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
