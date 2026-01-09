<template>
  <div class="CompRadio">
    <!-- Radio group wrapper -->
    <div v-if="variant === 'default'" class="space-y-4">
      <div v-for="(option, index) in options" :key="index" class="flex items-center">
        <input
          :id="`${name}-${index}`"
          type="radio"
          :name="name"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="disabled || option.disabled"
          class="w-4 h-4 text-primary-600 border-default-medium bg-neutral-secondary-medium rounded-full focus:ring-2 focus:outline-none focus:ring-primary-500/50 border border-default appearance-none transition-all"
          @change="handleChange(option.value)"
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
        class="flex items-center ps-4 border border-default bg-neutral-primary-soft rounded-base"
      >
        <input
          :id="`${name}-${index}`"
          type="radio"
          :name="name"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="disabled || option.disabled"
          class="w-4 h-4 text-primary-600 border-default-medium bg-neutral-secondary-medium rounded-full focus:ring-2 focus:outline-none focus:ring-primary-500/50 border border-default appearance-none transition-all"
          @change="handleChange(option.value)"
        />
        <label
          :for="`${name}-${index}`"
          class="w-full py-4 select-none ms-2 text-sm font-medium"
          :class="disabled || option.disabled ? 'text-fg-disabled' : 'text-heading'"
        >
          {{ option.label }}
        </label>
      </div>
    </div>

    <!-- List variant (vertical) -->
    <div
      v-else-if="variant === 'list'"
      class="w-full bg-neutral-primary-soft border border-default rounded-base"
    >
      <ul>
        <li
          v-for="(option, index) in options"
          :key="index"
          class="w-full"
          :class="{ 'border-b border-default': index < options.length - 1 }"
        >
          <div class="flex items-center ps-3">
            <input
              :id="`${name}-${index}`"
              type="radio"
              :name="name"
              :value="option.value"
              :checked="modelValue === option.value"
              :disabled="disabled || option.disabled"
              class="w-4 h-4 text-primary-600 border-default-medium bg-neutral-secondary-medium rounded-full focus:ring-2 focus:outline-none focus:ring-primary-500/50 border border-default appearance-none transition-all"
              @change="handleChange(option.value)"
            />
            <label
              :for="`${name}-${index}`"
              class="w-full py-3 select-none ms-2 text-sm font-medium"
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
        class="items-center w-full text-sm font-medium text-heading bg-neutral-primary-soft border border-default rounded-lg sm:flex"
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
              type="radio"
              :name="name"
              :value="option.value"
              :checked="modelValue === option.value"
              :disabled="disabled || option.disabled"
              class="w-4 h-4 text-primary-600 border-default-medium bg-neutral-secondary-medium rounded-full focus:ring-2 focus:outline-none focus:ring-primary-500/50 border border-default appearance-none transition-all"
              @change="handleChange(option.value)"
            />
            <label
              :for="`${name}-${index}`"
              class="w-full py-3 select-none ms-2 text-sm font-medium"
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
  name: 'CompRadio',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: null,
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
      validator: (value) => ['default', 'bordered', 'list', 'list-horizontal'].includes(value),
    },
  },
  emits: ['update:modelValue', 'change'],
  methods: {
    handleChange(value) {
      this.$emit('update:modelValue', value)
      this.$emit('change', value)
    },
  },
}
</script>

<style scoped>
/* Custom radio button styles */
input[type='radio']:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: var(--color-primary-600) !important;
  border-color: var(--color-primary-600) !important;
}

input[type='radio']:focus {
  outline: none;
  border-color: var(--color-primary-600) !important;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary-600), transparent 50%) !important;
}

/* 兼容性处理：强制去除默认蓝色 */
input[type='radio'] {
  accent-color: var(--color-primary-600);
}

input[type='radio']:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input[type='radio']:disabled + label {
  cursor: not-allowed;
}
input[type='radio']:checked:before,
input[type='radio']:disabled:checked:before {
  background-color: var(--color-primary-600);
}
</style>
