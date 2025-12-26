<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t('nav.tupoManager') }}
      </h1>
    </div>

    <!-- 拓扑管理内容 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div class="space-y-6">
        <!-- 拓扑图区域 -->
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900 min-h-[400px] flex items-center justify-center">
          <div class="text-center">
            <svg class="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p class="text-gray-600 dark:text-gray-400 text-lg">拓扑图展示区域</p>
            <p class="text-gray-500 dark:text-gray-500 text-sm mt-2">网络拓扑可视化将在此处显示</p>
          </div>
        </div>

        <!-- 网络节点列表 -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">网络节点</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="node in nodes"
              :key="node.id"
              class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-medium text-gray-900 dark:text-white">{{ node.name }}</h3>
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded',
                    node.status === 'online' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  ]"
                >
                  {{ node.status === 'online' ? '在线' : '离线' }}
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">IP: {{ node.ip }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">类型: {{ node.type }}</p>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            刷新拓扑
          </button>
          <button
            class="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
            style="background-color: var(--color-primary-600);"
            onmouseover="this.style.backgroundColor='var(--color-primary-700)'"
            onmouseout="this.style.backgroundColor='var(--color-primary-600)'"
          >
            添加节点
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const nodes = ref([
  { id: 1, name: '核心交换机-01', ip: '192.168.1.1', type: '核心交换机', status: 'online' },
  { id: 2, name: '接入交换机-02', ip: '192.168.1.2', type: '接入交换机', status: 'online' },
  { id: 3, name: '路由器-01', ip: '192.168.1.3', type: '路由器', status: 'offline' },
  { id: 4, name: '防火墙-01', ip: '192.168.1.4', type: '防火墙', status: 'online' },
]);
</script>
