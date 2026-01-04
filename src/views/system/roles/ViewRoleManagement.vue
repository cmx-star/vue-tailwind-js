<template>
  <div class="p-6">
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ $t('roleManagement') }}</h1>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">管理系统角色和权限配置</p>
    </div>

    <!-- 操作栏 -->
    <div class="mb-6 flex justify-end gap-2">
      <CompButton icon="plus" @click="handleAdd">添加角色</CompButton>
      <CompButton icon="arrows-rotate" variant="secondary" @click="fetchRoles">刷新</CompButton>
    </div>

    <!-- 角色列表表格 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <CompTable :columns="columns" :data="roles" :loading="loading">
        <!-- 角色名称列 -->
        <template #name="{ row }">
          <div>
            <div class="font-medium text-gray-900 dark:text-white">{{ row.name }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ row.code }}</div>
          </div>
        </template>

        <!-- 权限列 -->
        <template #permissions="{ row }">
          <div class="flex flex-wrap gap-1">
            <span
              v-for="(perm, index) in row.permissions.slice(0, 3)"
              :key="index"
              class="px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
            >
              {{ perm }}
            </span>
            <span
              v-if="row.permissions.length > 3"
              class="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              +{{ row.permissions.length - 3 }}
            </span>
          </div>
        </template>

        <!-- 用户数量列 -->
        <template #userCount="{ row }">
          <span class="text-gray-900 dark:text-white font-medium">{{ row.userCount }}</span>
        </template>

        <!-- 操作列 -->
        <template #actions="{ row }">
          <div class="flex gap-2">
            <CompButton size="sm" variant="secondary" icon="pen" @click="handleEdit(row)"
              >编辑</CompButton
            >
            <CompButton size="sm" variant="secondary" icon="key" @click="handlePermissions(row)"
              >权限</CompButton
            >
            <CompButton
              v-if="row.id > 1"
              size="sm"
              variant="danger"
              icon="trash"
              @click="handleDelete(row)"
              >删除</CompButton
            >
          </div>
        </template>
      </CompTable>
    </div>

    <!-- 权限列表 -->
    <div class="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">系统权限列表</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="perm in permissions"
          :key="perm.id"
          class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="font-medium text-gray-900 dark:text-white">{{ perm.name }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ perm.code }}</div>
            </div>
            <span
              class="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {{ perm.module }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { roleMock } from '@/api/mock'

export default {
  name: 'ViewRoleManagement',
  data() {
    return {
      roles: [],
      permissions: [],
      loading: false,
      columns: [
        { key: 'id', label: 'ID', width: '80px' },
        { key: 'name', label: '角色名称', slot: true },
        { key: 'description', label: '描述' },
        { key: 'permissions', label: '权限', slot: true },
        { key: 'userCount', label: '用户数', slot: true, width: '100px' },
        { key: 'createdAt', label: '创建时间' },
        { key: 'actions', label: '操作', slot: true, width: '250px' },
      ],
    }
  },
  mounted() {
    this.fetchRoles()
  },
  methods: {
    async fetchRoles() {
      this.loading = true
      try {
        // 使用 Mock 数据
        const res = roleMock
        this.roles = res.data.roles
        this.permissions = res.data.permissions
      } catch (error) {
        console.error('获取角色列表失败:', error)
        this.$toast.error('获取角色列表失败')
      } finally {
        this.loading = false
      }
    },
    handleAdd() {
      this.$toast.info('添加角色功能开发中...')
    },
    handleEdit(role) {
      this.$toast.info(`编辑角色: ${role.name}`)
    },
    handlePermissions(role) {
      this.$toast.info(`配置权限: ${role.name}`)
    },
    handleDelete(role) {
      if (confirm(`确定要删除角色"${role.name}"吗?`)) {
        this.$toast.success(`删除角色: ${role.name}`)
        // 这里应该调用 API 删除角色
      }
    },
  },
}
</script>
