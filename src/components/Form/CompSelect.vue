<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div ref="referenceRef" class="relative">
      <button
        :id="inputId"
        type="button"
        :disabled="disabled"
        :class="buttonClasses"
        @click="toggleDropdown"
        @blur="handleBlur"
      >
        <span class="block truncate text-left">
          {{ displayValue }}
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon
            :class="[
              'h-5 w-5 transition-transform duration-200',
              isOpen ? 'rotate-180' : '',
              'text-gray-400',
            ]"
            aria-hidden="true"
          />
        </span>
      </button>

      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          ref="floatingRef"
          :style="floatingStyles"
          class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none custom-scrollbar"
        >
          <div v-if="searchable" class="p-2 border-b border-gray-200 dark:border-gray-700">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="actualSearchPlaceholder"
              class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              @click.stop
            />
          </div>
          <ul class="py-0.5" role="listbox">
            <li
              v-if="filteredOptions.length === 0"
              class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 text-center"
            >
              {{ actualNoOptionsText }}
            </li>
            <li
              v-for="(option, index) in filteredOptions"
              :key="getOptionValue(option, index)"
              :class="[
                'relative cursor-pointer select-none px-4 py-2 text-sm',
                isSelected(option)
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
              ]"
              role="option"
              :aria-selected="isSelected(option)"
              @click="selectOption(option)"
            >
              <span class="block truncate">
                {{ getOptionLabel(option) }}
              </span>
              <span
                v-if="isSelected(option)"
                class="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ul>
        </div>
      </Transition>
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
import { ref } from 'vue'
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/vue'
import { onClickOutside } from '@vueuse/core'
import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'CompSelect',
  components: {
    ChevronDownIcon,
    CheckIcon,
  },
  props: {
    modelValue: {
      type: [String, Number, Array, Object],
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '', // Handle default in computed or via i18n
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
    searchable: {
      type: Boolean,
      default: false,
    },
    searchPlaceholder: {
      type: String,
      default: '',
    },
    noOptionsText: {
      type: String,
      default: '',
    },
    optionLabel: {
      type: [String, Function],
      default: 'label',
    },
    optionValue: {
      type: [String, Function],
      default: 'value',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change', 'blur'],
  setup() {
    const referenceRef = ref(null)
    const floatingRef = ref(null)
    const isOpen = ref(false)

    const { floatingStyles } = useFloating(referenceRef, floatingRef, {
      placement: 'bottom-start',
      middleware: [offset(4), flip(), shift({ padding: 8 })],
      whileElementsMounted: autoUpdate,
    })

    onClickOutside(
      floatingRef,
      () => {
        isOpen.value = false
      },
      { ignore: [referenceRef] },
    )

    return {
      referenceRef,
      floatingRef,
      floatingStyles,
      isOpen,
    }
  },
  data() {
    return {
      searchQuery: '',
      inputId: `select-${Math.random().toString(36).substr(2, 9)}`,
    }
  },
  computed: {
    filteredOptions() {
      if (!this.searchable || !this.searchQuery) {
        return this.options
      }

      const query = this.searchQuery.toLowerCase()
      return this.options.filter((option) => {
        const label = this.getOptionLabel(option).toLowerCase()
        return label.includes(query)
      })
    },
    displayValue() {
      if (this.multiple) {
        if (!Array.isArray(this.modelValue) || this.modelValue.length === 0) {
          return this.placeholder || this.$t('common.pleaseSelect')
        }

        const selectedOptions = this.options.filter((option) => {
          const value = this.getOptionValue(option)
          return this.modelValue.includes(value)
        })

        if (selectedOptions.length === 0) {
          return this.placeholder || this.$t('common.pleaseSelect')
        }

        if (selectedOptions.length === 1) {
          return this.getOptionLabel(selectedOptions[0])
        }

        return `${this.$t('common.selected')} ${selectedOptions.length} ${this.$t('common.items')}`
      } else {
        if (this.modelValue === null || this.modelValue === undefined || this.modelValue === '') {
          return this.placeholder || this.$t('common.pleaseSelect')
        }

        const selectedOption = this.options.find((option) => {
          const value = this.getOptionValue(option)
          return this.modelValue === value
        })

        return selectedOption
          ? this.getOptionLabel(selectedOption)
          : this.placeholder || this.$t('common.pleaseSelect')
      }
    },
    actualSearchPlaceholder() {
      return this.searchPlaceholder || this.$t('common.search')
    },
    actualNoOptionsText() {
      return this.noOptionsText || this.$t('common.noOptions')
    },
    buttonClasses() {
      const baseClasses =
        'relative w-full cursor-pointer rounded-lg border py-2 pl-3 pr-10 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'

      if (this.error) {
        return `${baseClasses} border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-600 dark:text-red-400`
      }

      if (this.disabled) {
        return `${baseClasses} border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed`
      }

      return `${baseClasses} border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400`
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
  },
  methods: {
    handleKeydown(event) {
      if (event.key === 'Escape' && this.isOpen) {
        this.isOpen = false
      }
    },
    toggleDropdown() {
      if (!this.disabled) {
        this.isOpen = !this.isOpen
        if (this.isOpen) {
          this.searchQuery = ''
        }
      }
    },
    getOptionLabel(option) {
      if (typeof this.optionLabel === 'function') {
        return this.optionLabel(option)
      }
      if (typeof option === 'object' && option !== null) {
        return option[this.optionLabel] ?? String(option)
      }
      return String(option)
    },
    getOptionValue(option, index) {
      if (typeof this.optionValue === 'function') {
        return this.optionValue(option)
      }
      if (typeof option === 'object' && option !== null) {
        return option[this.optionValue] ?? index
      }
      return option ?? index
    },
    isSelected(option) {
      const value = this.getOptionValue(option)
      if (this.multiple) {
        return Array.isArray(this.modelValue) && this.modelValue.includes(value)
      }
      return this.modelValue === value
    },
    selectOption(option) {
      const value = this.getOptionValue(option)

      if (this.multiple) {
        const currentValue = Array.isArray(this.modelValue) ? [...this.modelValue] : []
        const index = currentValue.indexOf(value)

        if (index > -1) {
          currentValue.splice(index, 1)
        } else {
          currentValue.push(value)
        }

        this.$emit('update:modelValue', currentValue)
        this.$emit('change', currentValue)
      } else {
        this.$emit('update:modelValue', value)
        this.$emit('change', value)
        this.isOpen = false
      }
    },
    handleBlur(event) {
      this.$emit('blur', event)
    },
  },
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}
</style>
