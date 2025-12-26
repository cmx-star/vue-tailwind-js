<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t('nav.logManagement') }}
      </h1>
      <div class="flex gap-3">
        <button
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          导出日志
        </button>
        <button
          class="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
          style="background-color: var(--color-primary-600);"
          onmouseover="this.style.backgroundColor='var(--color-primary-700)'"
          onmouseout="this.style.backgroundColor='var(--color-primary-600)'"
        >
          清空日志
        </button>
      </div>
    </div>

    <!-- 日志筛选 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">日志级别</label>
          <select
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option>全部</option>
            <option>错误</option>
            <option>警告</option>
            <option>信息</option>
            <option>调试</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">时间范围</label>
          <select
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option>今天</option>
            <option>最近7天</option>
            <option>最近30天</option>
            <option>自定义</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">模块</label>
          <select
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option>全部模块</option>
            <option>用户管理</option>
            <option>系统配置</option>
            <option>网络管理</option>
            <option>VPN</option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            class="w-full px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
            style="background-color: var(--color-primary-600);"
            onmouseover="this.style.backgroundColor='var(--color-primary-700)'"
            onmouseout="this.style.backgroundColor='var(--color-primary-600)'"
          >
            搜索
          </button>
        </div>
      </div>
    </div>

    <!-- 日志列表 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div class="space-y-4">
        <div
          v-for="log in logs"
          :key="log.id"
          class="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div
            :class="[
              'w-2 h-2 rounded-full mt-2 flex-shrink-0',
              log.level === 'error' ? 'bg-red-500' :
              log.level === 'warning' ? 'bg-yellow-500' :
              log.level === 'info' ? 'bg-blue-500' : 'bg-gray-500'
            ]"
          ></div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 mb-1">
              <span
                :class="[
                  'px-2 py-0.5 text-xs font-medium rounded',
                  log.level === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                  log.level === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                  log.level === 'info' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                ]"
              >
                {{ log.level.toUpperCase() }}
              </span>
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ log.module }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 ml-auto">{{ log.time }}</span>
            </div>
            <p class="text-sm text-gray-700 dark:text-gray-300">{{ log.message }}</p>
            <p v-if="log.details" class="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">{{ log.details }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const logs = ref([
  {
    id: 1,
    level: 'info',
    module: '用户管理',
    message: '用户 admin 登录系统',
    time: '2025-12-26 15:40:33',
    details: 'IP: 192.168.1.100'
  },
  {
    id: 2,
    level: 'warning',
    module: '系统配置',
    message: '系统配置已更新，部分功能可能需要重启',
    time: '2025-12-26 15:35:22',
  },
  {
    id: 3,
    level: 'error',
    module: '网络管理',
    message: '网络连接失败: Connection timeout',
    time: '2025-12-26 15:30:15',
    details: 'Error: ETIMEDOUT at 192.168.1.1:8080'
  },
  {
    id: 4,
    level: 'info',
    module: 'VPN',
    message: 'VPN 连接已建立',
    time: '2025-12-26 15:25:10',
  },
  {
    id: 5,
    level: 'debug',
    module: '系统配置',
    message: '配置缓存已刷新',
    time: '2025-12-26 15:20:05',
  },
]);
</script>

