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
    <v-date-picker
      v-model="pickerValue"
      :mode="pickerMode"
      :masks="masks"
      :is-dark="isDark"
      :disabled="disabled"
      :is24hr="is24hrMode"
      :time-accuracy="timeAccuracy"
      :popover="popoverConfig"
      :is-range="props.range"
      @update:model-value="handleUpdate"
    >
      <template #default="{ inputValue, inputEvents }">
        <!-- 范围选择模式 -->
        <template v-if="props.range">
          <div class="flex flex-col sm:flex-row gap-2 items-center">
            <div class="relative flex-1 w-full">
              <!-- 图标 -->
              <div
                class="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
              >
                <svg
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
              <!-- 开始日期输入框 -->
              <input
                :id="`${inputId}-start`"
                :value="inputValue.start"
                :placeholder="rangePlaceholder.start"
                :disabled="disabled"
                :class="inputClasses"
                v-on="inputEvents.start"
                @blur="handleBlur"
              />
            </div>
            <span class="flex-shrink-0 text-gray-400 dark:text-gray-500">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
            <div class="relative flex-1 w-full">
              <!-- 图标 -->
              <div
                class="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
              >
                <svg
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
              <!-- 结束日期输入框 -->
              <input
                :id="`${inputId}-end`"
                :value="inputValue.end"
                :placeholder="rangePlaceholder.end"
                :disabled="disabled"
                :class="inputClasses"
                v-on="inputEvents.end"
                @blur="handleBlur"
              />
            </div>
            <!-- 清除按钮 -->
            <button
              v-if="clearable && pickerValue && !disabled"
              type="button"
              class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ml-2"
              @click.stop="handleClear"
              tabindex="-1"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </template>
        <!-- 单值选择模式 -->
        <template v-else>
          <div class="relative">
            <!-- 图标 -->
            <div
              class="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
            >
              <!-- 时间图标 -->
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
              <!-- 日期图标 -->
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
            <!-- 输入框 -->
            <input
              :id="inputId"
              :value="inputValue"
              :placeholder="defaultPlaceholder"
              :disabled="disabled"
              :class="inputClasses"
              v-on="inputEvents"
              @blur="handleBlur"
            />
            <!-- 清除按钮 -->
            <button
              v-if="clearable && pickerValue && !disabled"
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              @click.stop="handleClear"
              tabindex="-1"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </template>
      </template>
    </v-date-picker>
    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useThemeStore } from "@/stores/theme";

const props = defineProps({
  modelValue: {
    type: [Date, String, Number, Object],
    default: null,
  },
  label: String,
  mode: {
    type: String,
    default: "date", // 'date' | 'time' | 'dateTime'
    validator: (value) => ["date", "time", "dateTime"].includes(value),
  },
  format: String,
  placeholder: {
    type: String,
    default: null, // 会根据 mode 自动设置
  },
  disabled: Boolean,
  required: Boolean,
  error: String,
  hint: String,
  clearable: {
    type: Boolean,
    default: true,
  },
  range: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "blur", "change"]);

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

// 初始化 pickerValue，对于时间模式和日期时间模式需要初始化一个默认时间
const initPickerValue = () => {
  if (props.modelValue) {
    if (props.range) {
      // 范围选择模式
      if (
        typeof props.modelValue === "object" &&
        props.modelValue !== null &&
        props.modelValue.start &&
        props.modelValue.end
      ) {
        return {
          start: new Date(props.modelValue.start),
          end: new Date(props.modelValue.end),
        };
      }
      // 如果没有有效的范围值，返回null让用户选择
      return null;
    } else {
      return new Date(props.modelValue);
    }
  }
  // 时间选择模式和日期时间选择模式需要初始化一个默认时间（当前时间），否则无法选择
  if (!props.range && (props.mode === "time" || props.mode === "dateTime")) {
    return new Date();
  }
  return null;
};

const pickerValue = ref(initPickerValue());

const inputId = computed(
  () => `datepicker-${Math.random().toString(36).substr(2, 9)}`
);

// 时间选择模式使用24小时制
const is24hrMode = computed(() => {
  return props.mode === "time" || props.mode === "dateTime";
});

// 设置时间精度：1 = 小时，2 = 分钟，3 = 秒
const timeAccuracy = computed(() => {
  if (props.mode === "time" || props.mode === "dateTime") {
    return 3; // 启用秒选择
  }
  return undefined; // 日期模式不需要时间精度
});

// Popover 配置：所有模式都只允许点击触发，禁用hover触发
const popoverConfig = computed(() => {
  const config = {
    visibility: "click", // 只允许点击触发，禁用hover
  };

  // 日期时间模式下选择日期后保持打开状态，以便继续选择时间
  if (props.mode === "dateTime") {
    config.keepVisibleOnInput = true;
  }

  return config;
});

// 根据 mode 设置默认 placeholder
const defaultPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder;
  switch (props.mode) {
    case "time":
      return "选择时间";
    case "dateTime":
      return "选择日期时间";
    default:
      return "选择日期";
  }
});

// 范围选择模式的 placeholder
const rangePlaceholder = computed(() => {
  if (props.placeholder) {
    return {
      start: props.placeholder,
      end: props.placeholder,
    };
  }
  const basePlaceholder = defaultPlaceholder.value;
  return {
    start: `开始${basePlaceholder.replace("选择", "")}`,
    end: `结束${basePlaceholder.replace("选择", "")}`,
  };
});

// 根据 mode 确定 picker 的模式和 masks
const pickerMode = computed(() => {
  switch (props.mode) {
    case "time":
      return "time";
    case "dateTime":
      return "dateTime";
    default:
      return "date";
  }
});

const masks = computed(() => {
  if (props.format) {
    return {
      input: props.format,
    };
  }
  // 根据 mode 设置默认格式，确保时间格式包含秒
  switch (props.mode) {
    case "time":
      return {
        inputTime24hr: "HH:mm:ss",
        input: "HH:mm:ss",
      };
    case "dateTime":
      return {
        inputDateTime24hr: "YYYY-MM-DD HH:mm:ss",
        input: "YYYY-MM-DD HH:mm:ss",
      };
    default:
      return {
        input: "YYYY-MM-DD",
      };
  }
});

// 同步外部 modelValue 变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      if (props.range) {
        if (
          typeof newVal === "object" &&
          newVal !== null &&
          newVal.start &&
          newVal.end
        ) {
          pickerValue.value = {
            start: new Date(newVal.start),
            end: new Date(newVal.end),
          };
        } else {
          pickerValue.value = null;
        }
      } else {
        pickerValue.value = new Date(newVal);
      }
    } else {
      // 时间选择模式和日期时间选择模式需要保持一个时间值才能选择
      if (
        !props.range &&
        (props.mode === "time" || props.mode === "dateTime")
      ) {
        pickerValue.value = new Date();
      } else {
        pickerValue.value = null;
      }
    }
  }
);

const inputClasses = computed(() => {
  const baseClasses =
    "block w-full pl-10 pr-10 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0";
  const darkClasses = isDark.value
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400";

  if (props.error) {
    return `${baseClasses} ${darkClasses} border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-600 dark:text-red-400`;
  }

  return `${baseClasses} ${darkClasses} focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed`;
});

const handleUpdate = (value) => {
  emit("update:modelValue", value);
  emit("change", value);
};

const handleBlur = (event) => {
  emit("blur", event);
};

const handleClear = () => {
  if (props.range) {
    pickerValue.value = null;
  } else {
    // 时间选择模式和日期时间选择模式需要保持一个时间值才能选择
    if (props.mode === "time" || props.mode === "dateTime") {
      pickerValue.value = new Date();
    } else {
      pickerValue.value = null;
    }
  }
  handleUpdate(pickerValue.value);
};
</script>

<style scoped>
.date-picker-wrapper {
  width: 100%;
}
</style>

<style>
/* V-Calendar 主题样式覆盖 */
.vc-container {
  --vc-accent-50: #eff6ff;
  --vc-accent-100: #dbeafe;
  --vc-accent-200: #bfdbfe;
  --vc-accent-300: #93c5fd;
  --vc-accent-400: #60a5fa;
  --vc-accent-500: #3b82f6;
  --vc-accent-600: #2563eb;
  --vc-accent-700: #1d4ed8;
  --vc-accent-800: #1e40af;
  --vc-accent-900: #1e3a8a;
}

/* 浅色主题 */
.vc-light {
  --vc-font-family: inherit;
  --vc-border-color: var(--border-color, #e5e7eb);
  --vc-border-radius: var(--radius-base, 0.5rem);
  --vc-background: var(--bg-elevated, #ffffff);
  --vc-color: var(--text-primary, #111827);
}

/* 深色主题 */
.vc-dark {
  --vc-font-family: inherit;
  --vc-border-color: var(--border-color, #4b5563);
  --vc-border-radius: var(--radius-base, 0.5rem);
  --vc-background: var(--bg-elevated, #1f2937);
  --vc-color: var(--text-primary, #f9fafb);
}

/* 弹出层样式 */
.vc-container {
  border-radius: var(--radius-base, 0.5rem) !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  z-index: 9999 !important;
}
</style>
