<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        系统设置
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        全局参数配置与系统优化
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <h2 class="text-lg font-medium text-gray-800 dark:text-gray-200">常规配置</h2>
          <p class="text-gray-600 dark:text-gray-400">系统标题、Logo 及域名映射设置...</p>
        </div>
        <div class="space-y-4">
          <h2 class="text-lg font-medium text-gray-800 dark:text-gray-200">安全选项</h2>
          <p class="text-gray-600 dark:text-gray-400">IP 白名单、访问控制及审计频率...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewSystemSettings",
};
</script>
