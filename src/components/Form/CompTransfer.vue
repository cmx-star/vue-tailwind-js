<template>
  <div class="CompTransfer w-full">
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <div class="flex items-center gap-4">
      <!-- Left list (Source) -->
      <div class="flex-1">
        <div
          class="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
        >
          <!-- Header -->
          <div
            class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-lg"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ titles[0] }}
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ leftChecked.length }}/{{ leftData.length }}
              </span>
            </div>
            <div v-if="searchable" class="mt-2">
              <input
                v-model="leftSearch"
                type="text"
                :placeholder="$t('common.searchPlaceholder')"
                class="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <!-- List -->
          <div class="max-h-60 overflow-auto custom-scrollbar">
            <div v-if="filteredLeftData.length === 0" class="px-4 py-8 text-center">
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('common.noData') }}</p>
            </div>
            <label
              v-for="item in filteredLeftData"
              :key="getKey(item)"
              class="flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                :value="getKey(item)"
                :checked="leftChecked.includes(getKey(item))"
                class="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded text-primary-600 focus:ring-2 focus:ring-primary-500"
                @change="handleLeftCheck($event, item)"
              />
              <span class="ml-3 text-sm text-gray-900 dark:text-white">
                {{ getLabel(item) }}
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- Transfer buttons -->
      <div class="flex flex-col gap-2">
        <button
          type="button"
          :disabled="leftChecked.length === 0"
          class="p-2 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :class="
            leftChecked.length > 0
              ? 'border-primary-500 bg-primary-500 text-white hover:bg-primary-600'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-400'
          "
          @click="moveToRight"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <button
          type="button"
          :disabled="rightChecked.length === 0"
          class="p-2 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :class="
            rightChecked.length > 0
              ? 'border-primary-500 bg-primary-500 text-white hover:bg-primary-600'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-400'
          "
          @click="moveToLeft"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <!-- Right list (Target) -->
      <div class="flex-1">
        <div
          class="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
        >
          <!-- Header -->
          <div
            class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-lg"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ titles[1] }}
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ rightChecked.length }}/{{ rightData.length }}
              </span>
            </div>
            <div v-if="searchable" class="mt-2">
              <input
                v-model="rightSearch"
                type="text"
                :placeholder="$t('common.searchPlaceholder')"
                class="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <!-- List -->
          <div class="max-h-60 overflow-auto custom-scrollbar">
            <div v-if="filteredRightData.length === 0" class="px-4 py-8 text-center">
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('common.noData') }}</p>
            </div>
            <label
              v-for="item in filteredRightData"
              :key="getKey(item)"
              class="flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                :value="getKey(item)"
                :checked="rightChecked.includes(getKey(item))"
                class="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded text-primary-600 focus:ring-2 focus:ring-primary-500"
                @change="handleRightCheck($event, item)"
              />
              <span class="ml-3 text-sm text-gray-900 dark:text-white">
                {{ getLabel(item) }}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <p v-if="error" class="mt-2 text-sm text-danger">
      {{ error }}
    </p>
    <p v-else-if="hint" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      {{ hint }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CompTransfer',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
      // data: [{ key: '1', label: 'Item 1' }]
    },
    titles: {
      type: Array,
      default: () => ['Source', 'Target'],
    },
    props: {
      type: Object,
      default: () => ({
        key: 'key',
        label: 'label',
      }),
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
    searchable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      leftChecked: [],
      rightChecked: [],
      leftSearch: '',
      rightSearch: '',
    }
  },
  computed: {
    leftData() {
      return this.data.filter((item) => !this.modelValue.includes(this.getKey(item)))
    },
    rightData() {
      return this.data.filter((item) => this.modelValue.includes(this.getKey(item)))
    },
    filteredLeftData() {
      if (!this.leftSearch) return this.leftData
      const search = this.leftSearch.toLowerCase()
      return this.leftData.filter((item) => this.getLabel(item).toLowerCase().includes(search))
    },
    filteredRightData() {
      if (!this.rightSearch) return this.rightData
      const search = this.rightSearch.toLowerCase()
      return this.rightData.filter((item) => this.getLabel(item).toLowerCase().includes(search))
    },
  },
  methods: {
    getKey(item) {
      return item[this.props.key]
    },
    getLabel(item) {
      return item[this.props.label]
    },
    handleLeftCheck(event, item) {
      const key = this.getKey(item)
      if (event.target.checked) {
        this.leftChecked.push(key)
      } else {
        this.leftChecked = this.leftChecked.filter((k) => k !== key)
      }
    },
    handleRightCheck(event, item) {
      const key = this.getKey(item)
      if (event.target.checked) {
        this.rightChecked.push(key)
      } else {
        this.rightChecked = this.rightChecked.filter((k) => k !== key)
      }
    },
    moveToRight() {
      const newValue = [...this.modelValue, ...this.leftChecked]
      this.$emit('update:modelValue', newValue)
      this.$emit('change', newValue)
      this.leftChecked = []
    },
    moveToLeft() {
      const newValue = this.modelValue.filter((key) => !this.rightChecked.includes(key))
      this.$emit('update:modelValue', newValue)
      this.$emit('change', newValue)
      this.rightChecked = []
    },
  },
}
</script>

<style scoped>
/* Custom scrollbar */
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
