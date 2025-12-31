<template>
  <div class="p-6">
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
      <div class="flex items-center space-x-4 mb-6">
        <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
          <Icon name="ethernet" :size="24" class="text-green-600" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">接口配置</h1>
          <p class="text-gray-500 dark:text-gray-400">配置 WAN/LAN 接口协议与速率</p>
        </div>
      </div>
      
      <div class="space-y-4">
        <div v-for="name in ['WAN', 'LAN1', 'LAN2']" :key="name" class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-bold">{{ name[0] }}</div>
            <span class="ml-3 font-medium text-gray-700 dark:text-gray-200">{{ name }} 接口</span>
          </div>
          <button class="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">编辑</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon/Icon.vue";

export default {
  name: "ViewInterfaceConfig",
  components: {
    Icon,
  },
};
</script>
