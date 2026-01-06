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
              :placeholder="searchPlaceholder"
              class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              @click.stop
            />
          </div>
          <ul class="py-0.5" role="listbox">
            <li
              v-if="filteredOptions.length === 0"
              class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 text-center"
            >
              {{ noOptionsText }}
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

<script setup>
import { ref, computed } from 'vue'
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/vue'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
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
    default: '请选择...',
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
    default: '搜索...',
  },
  noOptionsText: {
    type: String,
    default: '无选项',
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
})

const emit = defineEmits(['update:modelValue', 'change', 'blur'])

const inputId = computed(() => `select-${Math.random().toString(36).substr(2, 9)}`)

const isOpen = ref(false)
const searchQuery = ref('')
const referenceRef = ref(null)
const floatingRef = ref(null)

const { floatingStyles } = useFloating(referenceRef, floatingRef, {
  placement: 'bottom-start',
  middleware: [offset(4), flip(), shift({ padding: 8 })],
  whileElementsMounted: autoUpdate,
})

// 点击外部关闭
onClickOutside(
  floatingRef,
  () => {
    isOpen.value = false
  },
  {
    ignore: [referenceRef],
  },
)

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      searchQuery.value = ''
    }
  }
}

const getOptionLabel = (option) => {
  if (typeof props.optionLabel === 'function') {
    return props.optionLabel(option)
  }
  if (typeof option === 'object' && option !== null) {
    return option[props.optionLabel] ?? String(option)
  }
  return String(option)
}

const getOptionValue = (option, index) => {
  if (typeof props.optionValue === 'function') {
    return props.optionValue(option)
  }
  if (typeof option === 'object' && option !== null) {
    return option[props.optionValue] ?? index
  }
  return option ?? index
}

const isSelected = (option) => {
  const value = getOptionValue(option)
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(value)
  }
  return props.modelValue === value
}

const selectOption = (option) => {
  const value = getOptionValue(option)

  if (props.multiple) {
    const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = currentValue.indexOf(value)

    if (index > -1) {
      currentValue.splice(index, 1)
    } else {
      currentValue.push(value)
    }

    emit('update:modelValue', currentValue)
    emit('change', currentValue)
  } else {
    emit('update:modelValue', value)
    emit('change', value)
    isOpen.value = false
  }
}

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }

  const query = searchQuery.value.toLowerCase()
  return props.options.filter((option) => {
    const label = getOptionLabel(option).toLowerCase()
    return label.includes(query)
  })
})

const displayValue = computed(() => {
  if (props.multiple) {
    if (!Array.isArray(props.modelValue) || props.modelValue.length === 0) {
      return props.placeholder
    }

    const selectedOptions = props.options.filter((option) => {
      const value = getOptionValue(option)
      return props.modelValue.includes(value)
    })

    if (selectedOptions.length === 0) {
      return props.placeholder
    }

    if (selectedOptions.length === 1) {
      return getOptionLabel(selectedOptions[0])
    }

    return `已选择 ${selectedOptions.length} 项`
  } else {
    if (props.modelValue === null || props.modelValue === undefined || props.modelValue === '') {
      return props.placeholder
    }

    const selectedOption = props.options.find((option) => {
      const value = getOptionValue(option)
      return props.modelValue === value
    })

    return selectedOption ? getOptionLabel(selectedOption) : props.placeholder
  }
})

const buttonClasses = computed(() => {
  const baseClasses =
    'relative w-full cursor-pointer rounded-lg border py-2 pl-3 pr-10 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'

  if (props.error) {
    return `${baseClasses} border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-600 dark:text-red-400`
  }

  if (props.disabled) {
    return `${baseClasses} border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed`
  }

  return `${baseClasses} border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400`
})

const handleBlur = (event) => {
  emit('blur', event)
}

// 监听 ESC 键关闭
useEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
})
</script>
