<template>
  <div class="CompSwitch">
    <label
      class="inline-flex items-center cursor-pointer"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
    >
      <input
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        class="sr-only peer"
        @change="toggle"
      />
      <div
        class="relative w-9 h-5 rounded-full peer transition-colors peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/50 dark:peer-focus:ring-primary-600/40 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"
        :class="backgroundClass"
      ></div>
      <span
        v-if="label || activeText || inactiveText"
        class="select-none ms-3 text-sm font-medium"
        :class="disabled ? 'text-fg-disabled' : 'text-heading'"
      >
        {{ displayText }}
        <span v-if="required" class="text-danger">*</span>
      </span>
    </label>

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
  name: 'CompSwitch',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    activeText: {
      type: String,
      default: '',
    },
    inactiveText: {
      type: String,
      default: '',
    },
    activeColor: {
      type: String,
      default: '',
    },
    inactiveColor: {
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
    backgroundClass() {
      if (this.disabled) {
        return 'bg-neutral-tertiary'
      }
      return 'bg-neutral-quaternary'
    },
    displayText() {
      if (this.label) {
        return this.label
      }
      if (this.activeText && this.inactiveText) {
        return this.modelValue ? this.activeText : this.inactiveText
      }
      return ''
    },
  },
  methods: {
    toggle(event) {
      if (!this.disabled) {
        const newValue = event.target.checked
        this.$emit('update:modelValue', newValue)
        this.$emit('change', newValue)
      }
    },
  },
}
</script>

<style scoped>
/* Additional switch styles */
.peer:checked ~ div {
  background-color: var(--color-primary-600) !important;
}

.peer:focus ~ div {
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary-600), transparent 60%) !important;
}
</style>
