<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t('nav.vpnConfig') }}
      </h1>
    </div>

    <!-- VPN 配置卡片 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div class="space-y-6">
        <!-- 基本信息 -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">基本信息</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                VPN 名称
              </label>
              <input
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="请输入 VPN 名称"
                value="主 VPN 连接"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                服务器地址
              </label>
              <input
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="vpn.example.com"
                value="vpn.example.com"
              />
            </div>
            <CompSelect
              v-model="vpnConfig.protocol"
              :options="protocolOptions"
              label="协议类型"
              placeholder="请选择协议类型"
            />
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                端口
              </label>
              <input
                type="number"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="1194"
                value="1194"
              />
            </div>
          </div>
        </div>

        <!-- 认证信息 -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">认证信息</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                用户名
              </label>
              <input
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="请输入用户名"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                密码
              </label>
              <input
                type="password"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="请输入密码"
              />
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            取消
          </button>
          <button
            class="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
            style="background-color: var(--color-primary-600);"
            onmouseover="this.style.backgroundColor='var(--color-primary-700)'"
            onmouseout="this.style.backgroundColor='var(--color-primary-600)'"
          >
            保存配置
          </button>
        </div>
      </div>
    </div>

    <!-- 连接状态 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">连接状态</h2>
      <div class="flex items-center gap-3">
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
        <span class="text-sm text-gray-700 dark:text-gray-300">已连接</span>
        <span class="text-sm text-gray-500 dark:text-gray-400 ml-auto">连接时长: 2小时 35分钟</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CompSelect from '@/components/CompSelect/CompSelect.vue';

// VPN 配置数据
const vpnConfig = ref({
  name: '主 VPN 连接',
  server: 'vpn.example.com',
  protocol: 'openvpn',
  port: 1194,
  username: '',
  password: ''
});

// 协议选项
const protocolOptions = [
  { label: 'OpenVPN', value: 'openvpn' },
  { label: 'IPSec', value: 'ipsec' },
  { label: 'PPTP', value: 'pptp' }
];
</script>

