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
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            class="px-6 py-3 font-medium"
            :class="column.headerClass"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <!-- 表体 -->
      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="getRowKey(row, index)"
          :class="[
            'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
            index !== data.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : '',
          ]"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="[
              'px-6 py-4',
              column.cellClass,
              index === 0 && column.key === columns[0].key
                ? 'font-medium text-gray-900 dark:text-white whitespace-nowrap'
                : '',
            ]"
          >
            <!-- 自定义插槽 -->
            <slot
              v-if="$slots[`cell-${column.key}`]"
              :name="`cell-${column.key}`"
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
            :colspan="columns.length"
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
          class="animate-spin h-5 w-5 text-blue-600"
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
      // columns: [{ key: 'name', label: '姓名', headerClass: '', cellClass: '' }]
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
  computed: {
    displayEmptyText() {
      return this.emptyText || this.$t('common.noData')
    },
    displayLoadingText() {
      return this.loadingText || this.$t('common.loading')
    },
  },
  methods: {
    // 获取行的唯一标识
    getRowKey(row, index) {
      return row[this.rowKey] || index
    },
    // 获取单元格的值
    getCellValue(row, key) {
      // 支持嵌套属性，如 'user.name'
      return key.split('.').reduce((obj, k) => obj?.[k], row)
    },
  },
}
</script>
