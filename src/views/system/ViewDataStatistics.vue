<template>
  <CompPageLayout class="ViewDataStatistics">
    <!-- 页面标题 -->
    <CompPageHeader
      :title="$t('nav.dataStatistics')"
      :description="$t('system.statistics.description')"
    />

    <!-- ARP 表 -->
    <CompCard class="mb-6">
      <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('system.statistics.arpTable') }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ $t('system.statistics.arpTableDesc') }}
        </p>
      </div>
      <CompDataTable :data="arpTableData" :columns="arpColumns" :loading="arpLoading" />
    </CompCard>

    <!-- 活动的IP分片 链接 -->
    <CompCard class="mb-6">
      <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('system.statistics.activeConnections') }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ $t('system.statistics.activeConnectionsDesc') }}
        </p>
      </div>
      <CompDataTable
        :data="activeConnectionsData"
        :columns="activeConnectionsColumns"
        :loading="connectionsLoading"
      />
    </CompCard>

    <!-- 活动的IP分片 链接 (LAN) -->
    <CompCard class="mb-6">
      <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('system.statistics.activeConnectionsLAN') }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ $t('system.statistics.activeConnectionsLANDesc') }}
        </p>
      </div>
      <CompDataTable
        :data="activeConnectionsLANData"
        :columns="activeConnectionsLANColumns"
        :loading="connectionsLANLoading"
      />
    </CompCard>

    <!-- IPv6 列表 -->
    <CompCard class="mb-6">
      <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('system.statistics.ipv6List') }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ $t('system.statistics.ipv6ListDesc') }}
        </p>
      </div>
      <CompDataTable :data="ipv6ListData" :columns="ipv6Columns" :loading="ipv6Loading" />
    </CompCard>
  </CompPageLayout>
</template>

<script>
/**
 * @desc: 数据统计 - 系统及网络数据统计信息展示
 * @author: Antigravity
 * 1. 保持template、script、style这个顺序
 * 2. 保持template最外层元素的 class 与组件名称一致
 */

export default {
  // 组件名称
  name: 'ViewDataStatistics',
  // 子组件
  components: {},
  // 动态属性
  data() {
    return {
      // ARP 表数据
      arpTableData: [
        {
          id: 1,
          ipAddress: '192.168.31.1',
          macAddress: 'ac:1a:3e:91:89:c3',
          port: 'eth0',
        },
      ],
      arpColumns: [
        {
          label: this.$t('system.statistics.ipAddress'),
          key: 'ipAddress',
        },
        {
          label: this.$t('system.statistics.macAddress'),
          key: 'macAddress',
        },
        {
          label: this.$t('system.statistics.port'),
          key: 'port',
        },
      ],
      arpLoading: false,

      // 活动的IP分片 链接数据
      activeConnectionsData: [
        {
          id: 1,
          name: 'wan_vxnet',
          intranet: '0.0.0.0:0',
          remoteAddress: '192.168.31.1',
          originalAddress: '10',
          remark: 'main',
        },
        {
          id: 2,
          name: 'lan_cloud',
          intranet: '10.8.0.6:616',
          remoteAddress: '0',
          originalAddress: '0',
          remark: 'main',
        },
        {
          id: 3,
          name: 'lan_vxg0',
          intranet: '10.30.219.1',
          remoteAddress: '0',
          originalAddress: '0',
          remark: 'main',
        },
        {
          id: 4,
          name: 'lan_vxg0',
          intranet: '10.30.219.7',
          remoteAddress: '0',
          originalAddress: '0',
          remark: 'main',
        },
        {
          id: 5,
          name: 'wan_vxnet',
          intranet: '192.168.1.0/24',
          remoteAddress: '0',
          originalAddress: '0',
          remark: 'main',
        },
        {
          id: 6,
          name: 'wan_vxnet',
          intranet: '192.168.31.0/24',
          remoteAddress: '10',
          originalAddress: '10',
          remark: 'main',
        },
        {
          id: 7,
          name: 'wan_vxnet',
          intranet: '192.168.31.1',
          remoteAddress: '10',
          originalAddress: '10',
          remark: 'main',
        },
      ],
      activeConnectionsColumns: [
        {
          label: this.$t('system.statistics.name'),
          key: 'name',
        },
        {
          label: this.$t('system.statistics.intranet'),
          key: 'intranet',
        },
        {
          label: this.$t('system.statistics.remoteAddress'),
          key: 'remoteAddress',
        },
        {
          label: this.$t('system.statistics.originalAddress'),
          key: 'originalAddress',
        },
        {
          label: this.$t('system.statistics.remark'),
          key: 'remark',
        },
      ],
      connectionsLoading: false,

      // 活动的IP分片 链接 (LAN) 数据
      activeConnectionsLANData: [
        {
          id: 1,
          name: 'lan',
          sourceAddress: 'PPP0::a',
          originalAddress: '2105',
          remark: 'local',
        },
        {
          id: 2,
          name: 'lan',
          sourceAddress: 'PPP0::a',
          originalAddress: '2105',
          remark: 'local',
        },
        {
          id: 3,
          name: 'lan',
          sourceAddress: 'PPP0::a',
          originalAddress: '2105',
          remark: 'local',
        },
        {
          id: 4,
          name: 'lan',
          sourceAddress: 'PPP0::a',
          originalAddress: '2105',
          remark: 'local',
        },
      ],
      activeConnectionsLANColumns: [
        {
          label: this.$t('system.statistics.name'),
          key: 'name',
        },
        {
          label: this.$t('system.statistics.sourceAddress'),
          key: 'sourceAddress',
        },
        {
          label: this.$t('system.statistics.originalAddress'),
          key: 'originalAddress',
        },
        {
          label: this.$t('system.statistics.remark'),
          key: 'remark',
        },
      ],
      connectionsLANLoading: false,

      // IPv6 列表数据
      ipv6ListData: [
        {
          id: 1,
          ipv6Address: 'lan',
          macAddress: 'PPP0::a',
          remark: '',
        },
      ],
      ipv6Columns: [
        {
          label: this.$t('system.statistics.ipv6Address'),
          key: 'ipv6Address',
        },
        {
          label: this.$t('system.statistics.macAddress'),
          key: 'macAddress',
        },
        {
          label: this.$t('system.statistics.remark'),
          key: 'remark',
        },
      ],
      ipv6Loading: false,
    }
  },
  // 计算属性
  computed: {},
  // 侦听属性
  watch: {},
  // vue实例挂载到dom之后
  mounted() {
    this.loadData()
  },
  // vue实例数据变化更新DOM之后
  updated() {},
  // vue实例销毁之后
  unmounted() {},
  // 绑定方法
  methods: {
    loadData() {
      // 模拟数据加载
      this.arpLoading = true
      this.connectionsLoading = true
      this.connectionsLANLoading = true
      this.ipv6Loading = true

      setTimeout(() => {
        this.arpLoading = false
        this.connectionsLoading = false
        this.connectionsLANLoading = false
        this.ipv6Loading = false
      }, 500)
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS,最小化自定义样式 */
</style>
