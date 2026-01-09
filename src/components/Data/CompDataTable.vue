<template>
  <div
    class="relative overflow-x-auto bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700"
  >
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <!-- 表头 -->
      <thead
        class="text-sm text-gray-700 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
      >
        <tr>
          <!-- 全选 -->
          <th v-if="selectable" scope="col" class="px-6 py-3 w-10">
            <div class="flex items-center">
              <input
                type="checkbox"
                class="w-4 h-4 border border-default-medium rounded-none bg-neutral-secondary-medium focus:ring-2 focus:ring-primary-500/50 appearance-none transition-all cursor-pointer"
                :checked="isAllSelected"
                :indeterminate="isIndeterminate"
                @change="toggleSelectAll"
              />
            </div>
          </th>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            class="px-6 py-3 font-medium text-nowrap"
            :class="column.headerClass"
            :style="{ width: column.width }"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <!-- 表体 -->
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tr
          v-for="(row, index) in data"
          :key="getRowKey(row, index)"
          :class="[
            'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
            selectedRowKeys.includes(getRowKey(row, index))
              ? 'bg-primary-50/50 dark:bg-primary-900/20'
              : '',
          ]"
        >
          <!-- 单选 -->
          <td v-if="selectable" class="px-6 py-4 w-10">
            <div class="flex items-center">
              <input
                type="checkbox"
                class="w-4 h-4 border border-default-medium rounded-none bg-neutral-secondary-medium focus:ring-2 focus:ring-primary-500/50 appearance-none transition-all cursor-pointer"
                :checked="selectedRowKeys.includes(getRowKey(row, index))"
                @change="toggleSelectRow(row, index)"
              />
            </div>
          </td>
          <td
            v-for="column in columns"
            :key="column.key"
            :class="[
              'px-6 py-4',
              column.cellClass,
              index === 0 && column.key === columns[0].key && !selectable
                ? 'font-medium text-gray-900 dark:text-white whitespace-nowrap'
                : '',
            ]"
          >
            <!-- 自定义插槽 -->
            <slot
              v-if="$slots[column.key]"
              :name="column.key"
              :row="row"
              :column="column"
              :index="index"
            />
            <!-- 默认渲染 -->
            <template v-else>
              {{ getCellValue(row, column.key) }}
            </template>
          </td>
        </tr>

        <!-- 空状态 -->
        <tr v-if="!data || data.length === 0">
          <td
            :colspan="selectable ? columns.length + 1 : columns.length"
            class="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
          >
            <slot name="empty">
              <div class="flex flex-col items-center justify-center">
                <svg
                  class="w-12 h-12 mb-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p>{{ displayEmptyText }}</p>
              </div>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 加载状态 -->
    <div
      v-if="loading"
      class="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center"
    >
      <div class="flex items-center space-x-2">
        <svg
          class="animate-spin h-5 w-5 text-primary-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span class="text-sm text-gray-600 dark:text-gray-400">{{ displayLoadingText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompDataTable',
  props: {
    // 列配置
    columns: {
      type: Array,
      required: true,
    },
    // 数据
    data: {
      type: Array,
      default: () => [],
    },
    // 行唯一标识字段
    rowKey: {
      type: String,
      default: 'id',
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 是否支持选择
    selectable: {
      type: Boolean,
      default: false,
    },
    // 空状态文本
    emptyText: {
      type: String,
      default: '',
    },
    // 加载文本
    loadingText: {
      type: String,
      default: '',
    },
  },
  emits: ['selection-change'],
  data() {
    return {
      selectedRowKeys: [],
    }
  },
  computed: {
    displayEmptyText() {
      return this.emptyText || this.$t('common.noData')
    },
    displayLoadingText() {
      return this.loadingText || this.$t('common.loading')
    },
    isAllSelected() {
      if (this.data.length === 0) return false
      return this.data.every((row, index) =>
        this.selectedRowKeys.includes(this.getRowKey(row, index)),
      )
    },
    isIndeterminate() {
      if (this.data.length === 0) return false
      const selectedCount = this.data.filter((row, index) =>
        this.selectedRowKeys.includes(this.getRowKey(row, index)),
      ).length
      return selectedCount > 0 && selectedCount < this.data.length
    },
  },
  watch: {
    // 数据改变时清空选择，或至少根据新数据过滤
    data: {
      handler() {
        this.selectedRowKeys = this.selectedRowKeys.filter((key) =>
          this.data.some((row, index) => this.getRowKey(row, index) === key),
        )
        this.emitSelection()
      },
      deep: true,
    },
  },
  methods: {
    // 获取行的唯一标识
    getRowKey(row, index) {
      return row[this.rowKey] || index
    },
    // 获取单元格的值
    getCellValue(row, key) {
      return key.split('.').reduce((obj, k) => obj?.[k], row)
    },
    // 切换全选
    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selectedRowKeys = []
      } else {
        this.selectedRowKeys = this.data.map((row, index) => this.getRowKey(row, index))
      }
      this.emitSelection()
    },
    // 切换单行选择
    toggleSelectRow(row, index) {
      const key = this.getRowKey(row, index)
      const keyIndex = this.selectedRowKeys.indexOf(key)
      if (keyIndex > -1) {
        this.selectedRowKeys.splice(keyIndex, 1)
      } else {
        this.selectedRowKeys.push(key)
      }
      this.emitSelection()
    },
    // 发送选择变化事件
    emitSelection() {
      const selectedRows = this.data.filter((row, index) =>
        this.selectedRowKeys.includes(this.getRowKey(row, index)),
      )
      this.$emit('selection-change', selectedRows)
    },
  },
}
</script>

<style scoped>
input[type='checkbox'] {
  border-radius: 0 !important;
  appearance: none;
  background-color: #fff;
  border: 1px solid #d1d5db;
  user-select: none;
  flex-shrink: 0;
  transition: all 0.2s;
}

.dark input[type='checkbox'] {
  background-color: #374151; /* gray-700 */
  border-color: #4b5563; /* gray-600 */
}

input[type='checkbox']:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: var(--color-primary-600, #2563eb) !important;
  border-color: var(--color-primary-600, #2563eb) !important;
}

input[type='checkbox']:indeterminate {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: var(--color-primary-600, #2563eb) !important;
  border-color: var(--color-primary-600, #2563eb) !important;
}

input[type='checkbox']:focus {
  outline: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary-600, #2563eb), transparent 50%) !important;
}
</style>
