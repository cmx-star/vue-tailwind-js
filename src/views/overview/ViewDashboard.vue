<template>
  <div class="space-y-6">
    <!-- Welcome Card -->
    <div class="card p-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {{ $t('dashboard.welcome') }}, {{ userInfo?.username }}!
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        {{ currentTime }}
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ $t(stat.label) }}</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ stat.value }}</p>
          </div>
          <div :class="`p-3 rounded-lg ${stat.bgColor}`">
            <component :is="stat.icon" class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Orders Table -->
    <div class="card p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {{ $t('dashboard.recentOrders') }}
      </h2>
      
      <!-- 使用 DataTable 组件 -->
      <DataTable
        :columns="orderColumns"
        :data="recentOrders"
        :loading="loading"
        :empty-text="$t('common.noData')"
      >
        <!-- 自定义金额列 -->
        <template #cell-amount="{ row }">
          <span class="font-medium text-gray-900 dark:text-white">
            ${{ row.amount }}
          </span>
        </template>

        <!-- 自定义状态列 -->
        <template #cell-status="{ row }">
          <span :class="`px-2.5 py-0.5 text-xs font-medium rounded-full ${row.statusClass}`">
            {{ row.status }}
          </span>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { formatDate } from '@/utils/dayjs'
import DataTable from '@/components/CompDataTable/CompDataTable.vue'
import {
  UsersIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline'

const { t } = useI18n()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const currentTime = ref(formatDate(new Date()))
const loading = ref(false)

// 表格列配置
const orderColumns = computed(() => [
  { key: 'orderNumber', label: t('dashboard.orderNumber') },
  { key: 'customer', label: t('dashboard.customer') },
  { key: 'amount', label: t('dashboard.amount') },
  { key: 'status', label: t('dashboard.status') },
  { key: 'date', label: t('dashboard.date') }
])

// 统计数据
const stats = [
  { label: 'dashboard.totalUsers', value: '1,234', icon: UsersIcon, bgColor: 'bg-blue-500' },
  { label: 'dashboard.totalOrders', value: '567', icon: ShoppingCartIcon, bgColor: 'bg-green-500' },
  { label: 'dashboard.totalRevenue', value: '$12,345', icon: CurrencyDollarIcon, bgColor: 'bg-purple-500' },
  { label: 'dashboard.activeUsers', value: '89', icon: ChartBarIcon, bgColor: 'bg-orange-500' }
]

// 最近订单
const recentOrders = ref([
  {
    id: 1,
    orderNumber: '#ORD-001',
    customer: 'John Doe',
    amount: 299,
    status: 'Completed',
    statusClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    date: formatDate(new Date(), 'YYYY-MM-DD')
  },
  {
    id: 2,
    orderNumber: '#ORD-002',
    customer: 'Jane Smith',
    amount: 499,
    status: 'Pending',
    statusClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    date: formatDate(new Date(), 'YYYY-MM-DD')
  },
  {
    id: 3,
    orderNumber: '#ORD-003',
    customer: 'Bob Johnson',
    amount: 199,
    status: 'Completed',
    statusClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    date: formatDate(new Date(), 'YYYY-MM-DD')
  },
  {
    id: 4,
    orderNumber: '#ORD-004',
    customer: 'Alice Williams',
    amount: 599,
    status: 'Processing',
    statusClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    date: formatDate(new Date(), 'YYYY-MM-DD')
  }
])

let timeInterval = null

onMounted(() => {
  // 更新时间
  timeInterval = setInterval(() => {
    currentTime.value = formatDate(new Date())
  }, 1000)
})

onUnmounted(() => {
  // 清理定时器
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>
