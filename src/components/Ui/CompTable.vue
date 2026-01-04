<template>
  <div
    class="relative overflow-x-auto bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700"
    :style="maxHeight ? `max-height: ${maxHeight}; overflow-y: auto;` : ''"
  >
    <table class="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
      <thead
        class="text-sm text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 sticky top-0 z-10"
      >
        <tr>
          <!-- Checkbox Column Header -->
          <th v-if="selectable" scope="col" class="p-4">
            <div class="flex items-center">
              <input
                type="checkbox"
                :checked="isAllSelected"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                @change="toggleSelectAll"
              />
              <label class="sr-only">Select all</label>
            </div>
          </th>

          <th v-for="column in columns" :key="column.key" scope="col" class="px-6 py-3 font-medium">
            <div
              v-if="column.sortable"
              class="flex items-center cursor-pointer"
              @click="handleSort(column.key)"
            >
              <span v-if="column.srOnly" class="sr-only">{{ column.label }}</span>
              <span v-else>{{ column.label }}</span>
              <a href="#" @click.prevent>
                <svg
                  class="w-4 h-4 ms-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m8 15 4 4 4-4m0-6-4-4-4 4"
                  />
                </svg>
              </a>
            </div>
            <div v-else>
              <span v-if="column.srOnly" class="sr-only">{{ column.label }}</span>
              <span v-else>{{ column.label }}</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in sortedData" :key="index" :class="rowClasses(index)">
          <!-- Checkbox Column -->
          <td v-if="selectable" class="w-4 p-4">
            <div class="flex items-center">
              <input
                type="checkbox"
                :checked="isRowSelected(row)"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                @change="toggleRowSelection(row)"
              />
              <label class="sr-only">Select row</label>
            </div>
          </td>

          <template v-for="column in columns">
            <th
              v-if="column.key === columns[0].key"
              :key="column.key"
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </th>
            <td
              v-else
              :key="column.key"
              :class="column.align === 'right' ? 'px-6 py-4 text-right' : 'px-6 py-4'"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CompTable',
  props: {
    columns: {
      type: Array,
      required: true,
      validator: (columns) => columns.every((col) => col.key && col.label),
    },
    data: {
      type: Array,
      required: true,
    },
    striped: {
      type: Boolean,
      default: false,
    },
    hoverable: {
      type: Boolean,
      default: true,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      sortKey: '',
      sortOrder: 'asc',
      selectedRows: [],
    }
  },
  computed: {
    sortedData() {
      if (!this.sortKey) {
        return this.data
      }

      return [...this.data].sort((a, b) => {
        let aVal = a[this.sortKey]
        let bVal = b[this.sortKey]

        // 处理价格字符串（如 $2999）
        if (typeof aVal === 'string' && aVal.startsWith('$')) {
          aVal = parseFloat(aVal.replace('$', ''))
          bVal = parseFloat(bVal.replace('$', ''))
        }

        if (this.sortOrder === 'asc') {
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
        } else {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0
        }
      })
    },
    isAllSelected() {
      return this.data.length > 0 && this.selectedRows.length === this.data.length
    },
  },
  methods: {
    rowClasses(_index) {
      const baseClasses = 'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'
      const hoverClass = this.hoverable
        ? 'hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'
        : ''

      if (this.striped) {
        return `${baseClasses} ${hoverClass} odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700`
      }
      return `${baseClasses} ${hoverClass}`
    },
    handleSort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortKey = key
        this.sortOrder = 'asc'
      }

      this.$emit('sort', { key, order: this.sortOrder })
    },
    isRowSelected(row) {
      return this.selectedRows.some((r) => JSON.stringify(r) === JSON.stringify(row))
    },
    toggleRowSelection(row) {
      const index = this.selectedRows.findIndex((r) => JSON.stringify(r) === JSON.stringify(row))
      if (index > -1) {
        this.selectedRows.splice(index, 1)
      } else {
        this.selectedRows.push(row)
      }
      this.$emit('selection-change', this.selectedRows)
    },
    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selectedRows = []
      } else {
        this.selectedRows = [...this.data]
      }
      this.$emit('selection-change', this.selectedRows)
    },
  },
}
</script>
