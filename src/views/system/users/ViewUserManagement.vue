<template>
  <div class="p-6">
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ $t('userManagement') }}</h1>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">管理系统用户和角色分配</p>
    </div>

    <!-- 搜索和操作栏 -->
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex-1 max-w-md">
        <CompFormInput
          v-model="searchQuery"
          placeholder="搜索用户名或邮箱..."
          icon="magnifying-glass"
        />
      </div>
      <div class="flex gap-2">
        <CompButton icon="plus" @click="handleAdd">添加用户</CompButton>
        <CompButton icon="arrows-rotate" variant="secondary" @click="fetchUsers">刷新</CompButton>
      </div>
    </div>

    <!-- 用户列表表格 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <CompTable :columns="columns" :data="filteredUsers" :loading="loading">
        <!-- 状态列 -->
        <template #status="{ row }">
          <span
            class="px-2 py-1 text-xs font-medium rounded-full"
            :class="
              row.status === 1
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            "
          >
            {{ row.status === 1 ? '启用' : '禁用' }}
          </span>
        </template>

        <!-- 角色列 -->
        <template #roleName="{ row }">
          <span
            class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          >
            {{ row.roleName }}
          </span>
        </template>

        <!-- 操作列 -->
        <template #actions="{ row }">
          <div class="flex gap-2">
            <CompButton size="sm" variant="secondary" icon="pen" @click="handleEdit(row)"
              >编辑</CompButton
            >
            <CompButton
              size="sm"
              :variant="row.status === 1 ? 'danger' : 'success'"
              :icon="row.status === 1 ? 'ban' : 'check'"
              @click="handleToggleStatus(row)"
            >
              {{ row.status === 1 ? '禁用' : '启用' }}
            </CompButton>
          </div>
        </template>
      </CompTable>
    </div>

    <!-- 分页 -->
    <div class="mt-6 flex justify-center">
      <CompPagination :total="total" :page-size="pageSize" :current-page="currentPage" />
    </div>
  </div>
</template>

<script>
import { userListMock } from '@/api/mock'

export default {
  name: 'ViewUserManagement',
  data() {
    return {
      users: [],
      searchQuery: '',
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      columns: [
        { key: 'id', label: 'ID', width: '80px' },
        { key: 'username', label: '用户名' },
        { key: 'email', label: '邮箱' },
        { key: 'roleName', label: '角色', slot: true },
        { key: 'status', label: '状态', slot: true, width: '100px' },
        { key: 'lastLogin', label: '最后登录' },
        { key: 'actions', label: '操作', slot: true, width: '200px' },
      ],
    }
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) return this.users
      const query = this.searchQuery.toLowerCase()
      return this.users.filter(
        (user) =>
          user.username.toLowerCase().includes(query) || user.email.toLowerCase().includes(query),
      )
    },
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      this.loading = true
      try {
        // 使用 Mock 数据
        const res = userListMock
        this.users = res.data.users
        this.total = res.data.total
      } catch (error) {
        console.error('获取用户列表失败:', error)
        this.$toast.error('获取用户列表失败')
      } finally {
        this.loading = false
      }
    },
    handleAdd() {
      this.$toast.info('添加用户功能开发中...')
    },
    handleEdit(user) {
      this.$toast.info(`编辑用户: ${user.username}`)
    },
    handleToggleStatus(user) {
      const action = user.status === 1 ? '禁用' : '启用'
      this.$toast.success(`${action}用户: ${user.username}`)
      // 这里应该调用 API 更新状态
      user.status = user.status === 1 ? 0 : 1
    },
  },
}
</script>
