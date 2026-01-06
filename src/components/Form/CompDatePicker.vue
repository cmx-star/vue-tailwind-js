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

    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import flatpickr from 'flatpickr'
import { Mandarin as Chinese } from 'flatpickr/dist/l10n/zh.js'
import 'flatpickr/dist/flatpickr.css'
import { useThemeStore } from '@/stores/theme'

const props = defineProps({
  modelValue: {
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
})

const emit = defineEmits(['update:modelValue', 'change'])

const themeStore = useThemeStore()
const datepicker = ref(null)
const fp = ref(null)
const inputId = `fp-${Math.random().toString(36).substr(2, 9)}`

const isDark = computed(() => themeStore.isDark)

const displayPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder
  if (props.range) return '选择日期范围'
  switch (props.mode) {
    case 'time':
      return '选择时间'
    case 'dateTime':
      return '选择日期时间'
    default:
      return '选择日期'
  }
})

const inputClasses = computed(() => {
  const baseClasses =
    'block w-full pl-10 pr-10 py-2 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0'
  const darkClasses = isDark.value
    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'

  if (props.error) {
    return `${baseClasses} ${darkClasses} border-red-500 focus:ring-red-500`
  }
  return `${baseClasses} ${darkClasses} focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`
})

const getDateFormat = () => {
  if (props.format) return props.format
  switch (props.mode) {
    case 'time':
      return 'H:i:S'
    case 'dateTime':
      return 'Y-m-d H:i:S'
    default:
      return 'Y-m-d'
  }
}

const initFlatpickr = () => {
  let defaultDate = props.modelValue
  if (props.range && defaultDate && typeof defaultDate === 'object') {
    const dates = []
    if (defaultDate.start) dates.push(defaultDate.start)
    if (defaultDate.end) dates.push(defaultDate.end)
    defaultDate = dates
  }

  const config = {
    locale: Chinese,
    mode: props.range ? 'range' : 'single',
    enableTime: props.mode === 'dateTime' || props.mode === 'time',
    enableSeconds: true,
    noCalendar: props.mode === 'time',
    dateFormat: getDateFormat(),
    defaultDate: defaultDate,
    disableMobile: true,
    onChange: (selectedDates, dateStr) => {
      let value = null
      if (props.range) {
        if (selectedDates.length === 2) {
          value = { start: selectedDates[0], end: selectedDates[1] }
        } else if (selectedDates.length === 1) {
          value = { start: selectedDates[0], end: null }
        }
      } else {
        value = selectedDates[0] || null
      }
      emit('update:modelValue', value)
      emit('change', dateStr)
    },
  }

  fp.value = flatpickr(datepicker.value, config)
}

const handleClear = () => {
  if (fp.value) {
    fp.value.clear()
    emit('update:modelValue', null)
  }
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (!fp.value) return

    if (props.range && newVal && typeof newVal === 'object') {
      // 如果是对象格式 { start, end }，转换为数组传给 flatpickr
      const dates = []
      if (newVal.start) dates.push(newVal.start)
      if (newVal.end) dates.push(newVal.end)
      fp.value.setDate(dates, false)
    } else {
      fp.value.setDate(newVal, false)
    }
  },
)

onMounted(() => {
  initFlatpickr()
})

onBeforeUnmount(() => {
  if (fp.value) {
    fp.value.destroy()
  }
})
</script>

<style scoped>
.date-picker-wrapper {
  width: 100%;
}
</style>
