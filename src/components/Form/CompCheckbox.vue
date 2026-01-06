<template>
  <div class="CompCheckbox">
    <!-- Default variant (vertical) -->
    <div v-if="variant === 'default'" class="space-y-4">
      <div v-for="(option, index) in options" :key="index" class="flex items-center">
        <input
          :id="`${name}-${index}`"
          type="checkbox"
          :value="option.value"
          :checked="isChecked(option.value)"
          :disabled="disabled || option.disabled"
          class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
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
          class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
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
          class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
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
              class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
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
              class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
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
  },
  emits: ['update:modelValue', 'change'],
  computed: {
    colorClass() {
      const colors = {
        blue: '',
        red: 'text-red-600 focus:ring-red-500 dark:focus:ring-red-600',
        green: 'text-green-600 focus:ring-green-500 dark:focus:ring-green-600',
        purple: 'text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-600',
        teal: 'text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600',
        yellow: 'text-yellow-400 focus:ring-yellow-500 dark:focus:ring-yellow-600',
        orange: 'text-orange-500 focus:ring-orange-500 dark:focus:ring-orange-600',
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
input[type='checkbox']:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: currentColor;
  border-color: currentColor;
}

input[type='checkbox']:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input[type='checkbox']:disabled + label {
  cursor: not-allowed;
}
</style>
