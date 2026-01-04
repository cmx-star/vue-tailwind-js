<template>
  <div class="p-6">
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <div class="flex items-center space-x-4 mb-6">
        <div
          class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center"
        >
          <CompIcon name="shield-halved" :size="24" class="text-red-600" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">防火墙设置</h1>
          <p class="text-gray-500 dark:text-gray-400">高级安全过滤规则与防攻击策略</p>
        </div>
      </div>

      <div
        class="p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl text-center"
      >
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-700 mb-4"
        >
          <CompIcon name="lock" :size="32" class="text-gray-400" />
        </div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">防火墙策略已启用</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">当前正在拦截所有非授权连接尝试</p>
        <button
          class="mt-6 px-6 py-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl font-medium"
        >
          查看规则列表
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewFirewallSettings',
  components: {},
}
</script>
