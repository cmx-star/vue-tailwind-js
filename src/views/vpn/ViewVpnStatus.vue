<template>
  <CompPageLayout class="ViewVpnStatus">
    <!-- 页面标题 -->
    <CompPageHeader :title="$t('nav.vpnStatus')" :description="$t('vpn.status.description')" />

    <!-- OpenVPN Clients 表格 -->
    <CompCard class="mb-6">
      <CompSectionHeader :title="$t('vpn.status.openVpnClients')" />
      <CompDataTable :data="openVpnData" :columns="openVpnColumns" :loading="loading" />
    </CompCard>

    <!-- VPN 连接表格 -->
    <CompCard>
      <CompSectionHeader :title="$t('vpn.status.vpnConnections')" />
      <CompDataTable
        :data="vpnConnectionsData"
        :columns="vpnConnectionsColumns"
        :loading="loading"
      />
    </CompCard>
  </CompPageLayout>
</template>

<script>
/**
 * @desc: VPN 状态 - 显示 OpenVPN 客户端和 VPN 连接状态
 * @author: Antigravity
 */

export default {
  name: 'ViewVpnStatus',
  components: {},
  data() {
    return {
      loading: false,

      // OpenVPN Clients 数据
      openVpnData: [
        {
          id: 1,
          name: 'VPN客户端',
          commonName: 'client1',
          realAddress: '192.168.1.100',
          bytesReceived: '1.2 MB',
          bytesSent: '2.3 MB',
          connectedSince: '2024-01-12 10:00:00',
        },
      ],

      openVpnColumns: [
        {
          label: this.$t('vpn.status.name'),
          key: 'name',
        },
        {
          label: this.$t('vpn.status.commonName'),
          key: 'commonName',
        },
        {
          label: this.$t('vpn.status.realAddress'),
          key: 'realAddress',
        },
        {
          label: this.$t('vpn.status.bytesReceived'),
          key: 'bytesReceived',
        },
        {
          label: this.$t('vpn.status.bytesSent'),
          key: 'bytesSent',
        },
        {
          label: this.$t('vpn.status.connectedSince'),
          key: 'connectedSince',
        },
      ],

      // VPN 连接数据
      vpnConnectionsData: [
        {
          id: 1,
          vpnType: 'L2TP',
          status: '已连接',
          remoteAddress: '10.0.0.1',
          localAddress: '10.0.0.2',
        },
      ],

      vpnConnectionsColumns: [
        {
          label: this.$t('vpn.status.vpnType'),
          key: 'vpnType',
        },
        {
          label: this.$t('vpn.status.status'),
          key: 'status',
        },
        {
          label: this.$t('vpn.status.remoteAddress'),
          key: 'remoteAddress',
        },
        {
          label: this.$t('vpn.status.localAddress'),
          key: 'localAddress',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 300)
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS,最小化自定义样式 */
</style>
