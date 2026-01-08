<template>
  <div class="CompCheckbox">
    <!-- Label -->
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <!-- Default variant (vertical) -->
    <div v-if="variant === 'default'" class="space-y-4">
      <div v-for="(option, index) in options" :key="index" class="flex items-center">
        <input
          :id="`${name}-${index}`"
          type="checkbox"
          :value="option.value"
          :checked="isChecked(option.value)"
          :disabled="disabled || option.disabled"
          class="w-4 h-4 border border-default-medium rounded-none bg-neutral-secondary-medium focus:ring-2 focus:ring-primary-500/50 appearance-none transition-all"
          :class="colorClass"
          @change="handleChange($event, option.value)"
        />
        <label
          :for="`${name}-${index}`"
          class="select-none ms-2 text-sm font-medium"
          :class="disabled || option.disabled ? 'text-fg-disabled' : 'text-heading'"
        >
          {{ option.label }}
        </label>
      </div>
    </div>

    <!-- Inline variant (horizontal) -->
    <div v-else-if="variant === 'inline'" class="flex flex-wrap gap-4">
      <div v-for="(option, index) in options" :key="index" class="flex items-center">
        <input
          :id="`${name}-${index}`"
          type="checkbox"
          :value="option.value"
          :checked="isChecked(option.value)"
          :disabled="disabled || option.disabled"
          class="w-4 h-4 border border-default-medium rounded-none bg-neutral-secondary-medium focus:ring-2 focus:ring-primary-500/50 appearance-none transition-all"
          :class="colorClass"
          @change="handleChange($event, option.value)"
        />
        <label
          :for="`${name}-${index}`"
          class="select-none ms-2 text-sm font-medium"
          :class="disabled || option.disabled ? 'text-fg-disabled' : 'text-heading'"
        >
          {{ option.label }}
        </label>
      </div>
    </div>

    <!-- Bordered variant -->
    <div v-else-if="variant === 'bordered'" class="space-y-2">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="flex items-center ps-4 bg-neutral-primary-soft border border-default rounded-base shadow-xs"
      >
        <input
          :id="`${name}-${index}`"
          type="checkbox"
          :value="option.value"
          :checked="isChecked(option.value)"
          :disabled="disabled || option.disabled"
          class="w-4 h-4 border border-default-medium rounded-none bg-neutral-secondary-medium focus:ring-2 focus:ring-primary-500/50 appearance-none transition-all"
          :class="colorClass"
          @change="handleChange($event, option.value)"
        />
        <label
          :for="`${name}-${index}`"
          class="select-none w-full py-4 ms-2 text-sm font-medium"
          :class="disabled || option.disabled ? 'text-fg-disabled' : 'text-heading'"
        >
          {{ option.label }}
        </label>
      </div>
    </div>

    <!-- List variant (vertical) -->
    <div v-else-if="variant === 'list'" class="w-full">
      <ul
        class="select-none text-sm font-medium text-heading bg-neutral-primary-soft border border-default rounded-base"
      >
        <li
          v-for="(option, index) in options"
          :key="index"
          class="w-full"
          :class="{
            'border-b border-default': index < options.length - 1,
            'rounded-t-lg': index === 0,
          }"
        >
          <div class="flex items-center ps-3">
            <input
              :id="`${name}-${index}`"
              type="checkbox"
              :value="option.value"
              :checked="isChecked(option.value)"
              :disabled="disabled || option.disabled"
              class="w-4 h-4 border border-default-medium rounded-none bg-neutral-secondary-medium focus:ring-2 focus:ring-primary-500/50 appearance-none transition-all"
              :class="colorClass"
              @change="handleChange($event, option.value)"
            />
            <label
              :for="`${name}-${index}`"
              class="w-full py-3 ms-2 text-sm font-medium"
              :class="disabled || option.disabled ? 'text-fg-disabled' : 'text-heading'"
            >
              {{ option.label }}
            </label>
          </div>
        </li>
      </ul>
    </div>

    <!-- List variant (horizontal) -->
    <div v-else-if="variant === 'list-horizontal'" class="w-full">
      <ul
        class="items-center select-none w-full text-sm font-medium text-heading bg-neutral-primary-soft border border-default rounded-base sm:flex"
      >
        <li
          v-for="(option, index) in options"
          :key="index"
          class="w-full"
          :class="{
            'border-b border-default sm:border-b-0 sm:border-r': index < options.length - 1,
          }"
        >
          <div class="flex items-center ps-3">
            <input
              :id="`${name}-${index}`"
              type="checkbox"
              :value="option.value"
              :checked="isChecked(option.value)"
              :disabled="disabled || option.disabled"
              class="w-4 h-4 border border-default-medium rounded-none bg-neutral-secondary-medium focus:ring-2 focus:ring-primary-500/50 appearance-none transition-all"
              :class="colorClass"
              @change="handleChange($event, option.value)"
            />
            <label
              :for="`${name}-${index}`"
              class="w-full py-3 ms-2 text-sm font-medium"
              :class="disabled || option.disabled ? 'text-fg-disabled' : 'text-heading'"
            >
              {{ option.label }}
            </label>
          </div>
        </li>
      </ul>
    </div>

    <!-- Error message -->
    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
    <!-- Hint message -->
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      {{ hint }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CompCheckbox',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      required: true,
      // options: [{ label: 'Label', value: 'value', disabled: false }]
    },
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) =>
        ['default', 'inline', 'bordered', 'list', 'list-horizontal'].includes(value),
    },
    color: {
      type: String,
      default: 'blue',
      validator: (value) =>
        ['blue', 'red', 'green', 'purple', 'teal', 'yellow', 'orange'].includes(value),
    },
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'change'],
  computed: {
    colorClass() {
      const colors = {
        blue: 'text-primary-600 focus:ring-primary-500/50 dark:focus:ring-primary-600/40',
        red: 'text-danger focus:ring-danger/50 dark:focus:ring-danger/40',
        green: 'text-success focus:ring-success/50 dark:focus:ring-success/40',
        purple: 'text-primary-600 focus:ring-primary-500/50 dark:focus:ring-primary-600/40',
        teal: 'text-primary-500 focus:ring-primary-400/50 dark:focus:ring-primary-500/40',
        yellow: 'text-warning focus:ring-warning/50 dark:focus:ring-warning/40',
        orange: 'text-warning focus:ring-warning/50 dark:focus:ring-warning/40',
      }
      return colors[this.color] || ''
    },
  },
  methods: {
    isChecked(value) {
      return this.modelValue.includes(value)
    },
    handleChange(event, value) {
      let newValue
      if (event.target.checked) {
        newValue = [...this.modelValue, value]
      } else {
        newValue = this.modelValue.filter((v) => v !== value)
      }
      this.$emit('update:modelValue', newValue)
      this.$emit('change', newValue)
    },
  },
}
</script>

<style scoped>
/* Custom checkbox styles */
input[type='checkbox'] {
  border-radius: 0 !important; /* 强制方块 */
  accent-color: var(--color-primary-600);
}

input[type='checkbox']:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: var(--color-primary-600) !important;
  border-color: var(--color-primary-600) !important;
}

input[type='checkbox']:focus {
  outline: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary-600), transparent 50%) !important;
}

input[type='checkbox']:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input[type='checkbox']:disabled + label {
  cursor: not-allowed;
}
</style>
