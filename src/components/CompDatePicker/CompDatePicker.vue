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
    <VueDatePicker
      v-model="pickerValue"
      :dark="isDark"
      :placeholder="placeholder"
      :time-picker="timePicker"
      :enable-time-picker="enableTimePicker"
      :formats="format ? { input: format } : undefined"
      :auto-apply="autoApply"
      :clearable="clearable"
      :disabled="disabled"
      @update:model-value="handleUpdate"
      @blur="handleBlur"
    />
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
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useThemeStore } from "@/stores/theme";

const props = defineProps({
  modelValue: {
    type: [Date, String, Number, Array, Object],
    default: null,
  },
  label: String,
  timePicker: {
    type: Boolean,
    default: false,
  },
  enableTimePicker: {
    type: Boolean,
    default: false,
  },
  format: String,
  placeholder: {
    type: String,
    default: "选择日期",
  },
  disabled: Boolean,
  required: Boolean,
  error: String,
  hint: String,
  clearable: {
    type: Boolean,
    default: true,
  },
  autoApply: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "blur", "change"]);

const themeStore = useThemeStore();

const pickerValue = ref(props.modelValue);
const isDark = computed(() => themeStore.isDark);

const inputId = computed(
  () => `datepicker-${Math.random().toString(36).substr(2, 9)}`
);

// 同步外部 modelValue 变化
watch(
  () => props.modelValue,
  (newVal) => {
    pickerValue.value = newVal;
  }
);

const handleUpdate = (value) => {
  emit("update:modelValue", value);
  emit("change", value);
};

const handleBlur = (event) => {
  emit("blur", event);
};
</script>

<style scoped>
.date-picker-wrapper {
  width: 100%;
}

:deep(.dp__input_wrap) {
  width: 100%;
}

:deep(.dp__input) {
  width: 100%;
  padding: 0.625rem 2.5rem 0.625rem 2.75rem;
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: var(--radius-base, 0.5rem) !important;
  background: var(--bg-base, #ffffff);
  color: var(--text-primary, #111827);
  font-size: 0.875rem;
}

/* 暗色模式适配 */
:deep(.dark .dp__input),
:deep(.dp__theme_dark .dp__input) {
  background: var(--bg-base, #374151) !important;
  border-color: var(--border-color, #4b5563) !important;
  color: var(--text-primary, #ffffff) !important;
}

/* 错误状态 */
.date-picker-wrapper:has(+ p.text-red-600) :deep(.dp__input),
:deep(.dp__input_error .dp__input) {
  border-color: var(--color-error, #ef4444);
}

/* 确保图标位置正确 */
:deep(.dp__input_icon) {
  left: 0.75rem;
  z-index: 1;
  pointer-events: none;
}

/* 当有图标时，确保输入框有足够的左侧 padding */
:deep(.dp__input_wrap:has(.dp__input_icon) .dp__input),
:deep(.dp__input_icon_pad) {
  padding-left: 2.75rem !important;
  padding-inline-start: 2.75rem !important;
}

/* 确保清除按钮位置正确 */
:deep(.dp--clear-btn) {
  right: 0.75rem;
  z-index: 1;
}

:deep(.dp__input:focus) {
  outline: none;
  border-color: var(--color-primary-500, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

:deep(.dp__input:disabled) {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

<style>
/* 全局样式 - 确保日期选择器弹出层正确显示 */
.dp__menu {
  z-index: 9999 !important;
  border-radius: var(--radius-base, 0.5rem) !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
}

/* 统一所有 datepicker 元素的圆角 - 使用主题变量 */
.dp__calendar,
.dp__calendar_header,
.dp__cell_inner,
.dp__button,
.dp__time_input,
.dp__time_col,
.dp__time_col_value {
  border-radius: var(--radius-base, 0.5rem) !important;
}

/* 小元素使用较小的圆角 */
.dp__inner_nav,
.dp__clear_icon {
  border-radius: var(--radius, 0.375rem) !important;
}

/* 浅色主题样式 */
.dp__theme_light {
  --dp-background-color: var(--bg-elevated, #f9fafb);
  --dp-text-color: var(--text-primary, #111827);
  --dp-hover-color: var(--bg-overlay, #f3f4f6);
  --dp-hover-text-color: var(--text-primary, #111827);
  --dp-hover-icon-color: var(--text-primary, #111827);
  --dp-primary-color: var(--color-primary-500, #3b82f6);
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: var(--text-secondary, #6b7280);
  --dp-border-color: var(--border-color, #e5e7eb);
  --dp-menu-border-color: var(--border-color, #e5e7eb);
  --dp-border-color-hover: var(--color-primary-500, #3b82f6);
  --dp-disabled-color: var(--text-tertiary, #9ca3af);
  --dp-scroll-bar-background: var(--bg-overlay, #f3f4f6);
  --dp-scroll-bar-color: var(--text-tertiary, #9ca3af);
  --dp-success-color: var(--color-success, #10b981);
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: var(--text-secondary, #6b7280);
  --dp-danger-color: var(--color-error, #ef4444);
  --dp-highlight-color: var(--color-primary-100, #dbeafe);
}

/* 深色主题样式 */
.dp__theme_dark {
  --dp-background-color: var(--bg-elevated, #1e293b);
  --dp-text-color: var(--text-primary, #f1f5f9);
  --dp-hover-color: var(--bg-overlay, #334155);
  --dp-hover-text-color: var(--text-primary, #f1f5f9);
  --dp-hover-icon-color: var(--text-primary, #f1f5f9);
  --dp-primary-color: var(--color-primary-500, #3b82f6);
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: var(--text-secondary, #cbd5e1);
  --dp-border-color: var(--border-color, #334155);
  --dp-menu-border-color: var(--border-color, #334155);
  --dp-border-color-hover: var(--color-primary-500, #3b82f6);
  --dp-disabled-color: var(--text-tertiary, #94a3b8);
  --dp-scroll-bar-background: var(--bg-overlay, #334155);
  --dp-scroll-bar-color: var(--text-tertiary, #94a3b8);
  --dp-success-color: var(--color-success, #10b981);
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: var(--text-secondary, #cbd5e1);
  --dp-danger-color: var(--color-error, #ef4444);
  --dp-highlight-color: var(--color-primary-900, #1e3a8a);
}

/* 确保输入框在暗色模式下使用正确的背景色 */
.dark .dp__input,
.dp__theme_dark .dp__input {
  background-color: var(--dp-background-color, #374151) !important;
  border-color: var(--dp-border-color, #4b5563) !important;
  color: var(--dp-text-color, #ffffff) !important;
}
</style>
