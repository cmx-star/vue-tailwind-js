<template>
  <div class="w-full">
    <div ref="referenceRef" class="relative">
      <button
        :id="inputId"
        type="button"
        :disabled="disabled"
        :class="buttonClasses"
        @click="toggleDropdown"
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
          class="absolute z-50 mt-1 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none"
        >
          <div class="flex">
            <!-- Level 1 -->
            <ul
              v-if="currentOptions.length > 0"
              class="py-1 min-w-[150px] max-h-60 overflow-auto border-r border-gray-200 dark:border-gray-700"
            >
              <li
                v-for="(option, index) in currentOptions"
                :key="index"
                :class="[
                  'relative cursor-pointer select-none px-4 py-2 text-sm flex items-center justify-between',
                  isLevelSelected(option, 0)
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
                ]"
                @click="selectLevel(option, 0)"
              >
                <span class="block truncate">{{ getLabel(option) }}</span>
                <ChevronRightIcon v-if="hasChildren(option)" class="h-4 w-4 ml-2 flex-shrink-0" />
              </li>
            </ul>

            <!-- Level 2 -->
            <ul
              v-if="level1Children.length > 0"
              class="py-1 min-w-[150px] max-h-60 overflow-auto border-r border-gray-200 dark:border-gray-700"
            >
              <li
                v-for="(option, index) in level1Children"
                :key="index"
                :class="[
                  'relative cursor-pointer select-none px-4 py-2 text-sm flex items-center justify-between',
                  isLevelSelected(option, 1)
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
                ]"
                @click="selectLevel(option, 1)"
              >
                <span class="block truncate">{{ getLabel(option) }}</span>
                <ChevronRightIcon v-if="hasChildren(option)" class="h-4 w-4 ml-2 flex-shrink-0" />
              </li>
            </ul>

            <!-- Level 3 -->
            <ul v-if="level2Children.length > 0" class="py-1 min-w-[150px] max-h-60 overflow-auto">
              <li
                v-for="(option, index) in level2Children"
                :key="index"
                :class="[
                  'relative cursor-pointer select-none px-4 py-2 text-sm',
                  isLevelSelected(option, 2)
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
                ]"
                @click="selectLevel(option, 2)"
              >
                <span class="block truncate">{{ getLabel(option) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'CompCascader',
  components: {
    ChevronDownIcon,
    ChevronRightIcon,
  },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Please select',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    separator: {
      type: String,
      default: ' / ',
    },
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      isOpen: false,
      selectedPath: [],
      inputId: `cascader-${Math.random().toString(36).substr(2, 9)}`,
    }
  },
  computed: {
    buttonClasses() {
      return [
        'relative w-full cursor-pointer rounded-lg border bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-sm transition-colors',
        this.error
          ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500',
        this.disabled
          ? 'cursor-not-allowed bg-gray-50 dark:bg-gray-900 text-gray-500'
          : 'hover:border-gray-400 dark:hover:border-gray-500',
        'focus:outline-none focus:ring-2',
      ]
    },
    displayValue() {
      if (this.selectedPath.length === 0) {
        return this.placeholder
      }
      return this.selectedPath.map((item) => this.getLabel(item)).join(this.separator)
    },
    currentOptions() {
      return this.options
    },
    level1Children() {
      if (this.selectedPath.length > 0 && this.hasChildren(this.selectedPath[0])) {
        return this.selectedPath[0].children || []
      }
      return []
    },
    level2Children() {
      if (this.selectedPath.length > 1 && this.hasChildren(this.selectedPath[1])) {
        return this.selectedPath[1].children || []
      }
      return []
    },
  },
  watch: {
    modelValue: {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.buildSelectedPath(newVal)
        } else {
          this.selectedPath = []
        }
      },
      immediate: true,
    },
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    handleOutsideClick(event) {
      if (!this.isOpen) return
      const referenceEl = this.$refs.referenceRef
      const floatingEl = this.$refs.floatingRef
      if (
        referenceEl &&
        !referenceEl.contains(event.target) &&
        floatingEl &&
        !floatingEl.contains(event.target)
      ) {
        this.isOpen = false
      }
    },
    toggleDropdown() {
      if (!this.disabled) {
        this.isOpen = !this.isOpen
      }
    },
    getLabel(option) {
      return option.label || option.name || option.value || ''
    },
    getValue(option) {
      return option.value || option.id || option.label
    },
    hasChildren(option) {
      return option.children && option.children.length > 0
    },
    isLevelSelected(option, level) {
      return this.selectedPath[level] === option
    },
    selectLevel(option, level) {
      this.selectedPath = this.selectedPath.slice(0, level)
      this.selectedPath.push(option)
      if (!this.hasChildren(option)) {
        const values = this.selectedPath.map((item) => this.getValue(item))
        this.$emit('update:modelValue', values)
        this.$emit('change', values)
        this.isOpen = false
      }
    },
    buildSelectedPath(values) {
      this.selectedPath = []
      let currentOptions = this.options
      for (const value of values) {
        const found = currentOptions.find((opt) => this.getValue(opt) === value)
        if (found) {
          this.selectedPath.push(found)
          if (found.children) currentOptions = found.children
          else break
        } else {
          break
        }
      }
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
  background: var(--color-scrollbar-thumb);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--color-scrollbar-thumb-hover);
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-scrollbar-thumb-dark);
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--color-scrollbar-thumb-hover-dark);
}
</style>
