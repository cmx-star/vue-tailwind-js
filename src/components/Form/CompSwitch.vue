<template>
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
      class="relative w-9 h-5 rounded-full peer transition-colors peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"
      :class="backgroundClass"
    ></div>
    <span
      v-if="label || activeText || inactiveText"
      class="select-none ms-3 text-sm font-medium"
      :class="disabled ? 'text-fg-disabled' : 'text-heading'"
    >
      {{ displayText }}
    </span>
  </label>
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
      default: '#3B82F6',
    },
    inactiveColor: {
      type: String,
      default: '#D1D5DB',
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
/* Additional switch styles if needed */
</style>
