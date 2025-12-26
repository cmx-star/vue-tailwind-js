<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ $t('nav.networkManager') }}</h1>
    </div>

    <!-- 使用封装的 DataTable 组件 -->
    <DataTable
      :columns="columns"
      :data="users"
      :loading="loading"
      :empty-text="$t('common.noData')"
      :loading-text="$t('common.loading')"
    >
      <!-- 自定义状态列 -->
      <template #cell-status="{ row }">
        <span
          :class="[
            'px-2.5 py-0.5 text-xs font-medium rounded',
            row.statusType === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
            row.statusType === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          ]"
        >
          {{ $t(`table.${row.status}`) }}
        </span>
      </template>

      <!-- 自定义操作列 -->
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-2">
          <button
            @click="handleEdit(row)"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {{ $t('common.edit') }}
          </button>
          <button
            @click="handleDelete(row)"
            class="font-medium text-red-600 dark:text-red-500 hover:underline"
          >
            {{ $t('common.delete') }}
          </button>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import DataTable from '@/components/CompDataTable/CompDataTable.vue'

const { t } = useI18n()

// 表格列配置
const columns = computed(() => [
  { key: 'name', label: t('table.name') },
  { key: 'email', label: t('table.email') },
  { key: 'role', label: t('table.role') },
  { key: 'status', label: t('table.status') },
  { key: 'createdAt', label: t('table.createdAt') },
  { key: 'actions', label: t('table.actions') }
])

// 加载状态
const loading = ref(false)

// 表格数据
const users = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: t('table.admin'),
    status: 'active',
    statusType: 'green',
    createdAt: '2025-12-26'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: t('table.user'),
    status: 'active',
    statusType: 'green',
    createdAt: '2025-12-25'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: t('table.user'),
    status: 'inactive',
    statusType: 'gray',
    createdAt: '2025-12-24'
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: t('table.guest'),
    status: 'active',
    statusType: 'green',
    createdAt: '2025-12-23'
  }
])

// 编辑操作
const handleEdit = (row) => {
  console.log('Edit:', row)
  // 这里可以打开编辑对话框或跳转到编辑页面
}

// 删除操作
const handleDelete = (row) => {
  console.log('Delete:', row)
  // 这里可以显示确认对话框
}
</script>
