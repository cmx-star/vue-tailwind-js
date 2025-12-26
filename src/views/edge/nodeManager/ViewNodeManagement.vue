<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t('nav.nodeManagement') }}
      </h1>
      <button
        class="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
        style="background-color: var(--color-primary-600);"
        onmouseover="this.style.backgroundColor='var(--color-primary-700)'"
        onmouseout="this.style.backgroundColor='var(--color-primary-600)'"
      >
        添加节点
      </button>
    </div>

    <!-- 节点统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">总节点数</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">12</p>
          </div>
          <div class="w-12 h-12 rounded-lg flex items-center justify-center" style="background-color: var(--color-primary-100);">
            <svg class="w-6 h-6" style="color: var(--color-primary-600);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">在线节点</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">10</p>
          </div>
          <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-green-100 dark:bg-green-900">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">离线节点</p>
            <p class="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">2</p>
          </div>
          <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-red-100 dark:bg-red-900">
            <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">CPU 使用率</p>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">45%</p>
          </div>
          <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 节点列表 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">节点列表</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">节点名称</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">IP 地址</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">状态</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">CPU</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">内存</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="node in nodes" :key="node.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">{{ node.name }}</td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{{ node.ip }}</td>
              <td class="px-4 py-3">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded',
                    node.status === 'online' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  ]"
                >
                  {{ node.status === 'online' ? '在线' : '离线' }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{{ node.cpu }}%</td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{{ node.memory }}%</td>
              <td class="px-4 py-3">
                <button class="text-sm text-primary-600 dark:text-primary-400 hover:underline">详情</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const nodes = ref([
  { id: 1, name: '边缘节点-01', ip: '192.168.1.101', status: 'online', cpu: 45, memory: 62 },
  { id: 2, name: '边缘节点-02', ip: '192.168.1.102', status: 'online', cpu: 32, memory: 48 },
  { id: 3, name: '边缘节点-03', ip: '192.168.1.103', status: 'offline', cpu: 0, memory: 0 },
  { id: 4, name: '边缘节点-04', ip: '192.168.1.104', status: 'online', cpu: 58, memory: 71 },
]);
</script>

