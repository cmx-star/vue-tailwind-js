<template>
  <CompPageLayout>
    <CompPageHeader :title="$t('nav.edgeStatusApi') || 'Edge Status (API)'" />

    <!-- System Info -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('edge.statusApi.system')" class="mb-4" />
      <CompDescriptionList :data-list="systemInfoList" />
    </CompCard>

    <!-- Memory Info -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('edge.statusApi.memory')" class="mb-4" />
      <div class="space-y-4 px-4 py-2">
        <CompUsageBar v-for="(item, index) in memoryInfoList" :key="index" :item="item" />
      </div>
    </CompCard>

    <!-- Network Info -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('edge.statusApi.network')" class="mb-4" />
      <CompDescriptionList :data-list="networkInfoList" />
    </CompCard>

    <!-- Routing Table -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('edge.statusApi.routingTable')" class="mb-4" />
      <CompDataTable :columns="routeColumns" :data="routeData" />
    </CompCard>

    <!-- DHCP Distribution -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('edge.statusApi.dhcpDistribution')" class="mb-4" />
      <CompDataTable :columns="dhcpColumns" :data="dhcpData" />
    </CompCard>

    <!-- DHCPv6 Distribution -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('edge.statusApi.dhcpv6Distribution')" class="mb-4" />
      <CompDataTable
        :columns="dhcpv6Columns"
        :data="dhcpv6Data"
        :empty-text="$t('edge.statusApi.noLeases')"
      />
    </CompCard>

    <!-- Wireless Info -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('edge.statusApi.wireless')" class="mb-4" />
      <CompDescriptionList :data-list="wirelessInfoList" />
    </CompCard>
  </CompPageLayout>
</template>

<script>
import CompCard from '@/components/Layout/CompCard.vue'
import CompTitle from '@/components/Basic/CompTitle.vue'
import CompPageHeader from '@/components/Layout/CompPageHeader.vue'
import CompDescriptionList from '@/components/Basic/CompDescriptionList.vue'
import CompDataTable from '@/components/Data/CompDataTable.vue'
import CompUsageBar from '@/components/Basic/CompUsageBar.vue'
import CompPageLayout from '@/components/Layout/CompPageLayout.vue'
import request from '@/utils/request'

export default {
  name: 'ViewEdgeStatusApi',
  components: {
    CompCard,
    CompTitle,
    CompPageHeader,
    CompDescriptionList,
    CompDataTable,
    CompUsageBar,
    CompPageLayout,
  },
  data() {
    return {
      systemData: {},
      memoryData: {},
      networkData: {},
      routeData: [],
      dhcpData: [],
      dhcpv6Data: [],
      wirelessData: {},
    }
  },
  computed: {
    systemInfoList() {
      return [
        { label: this.$t('edge.statusApi.hostname'), value: this.systemData.hostname || '-' },
        {
          label: this.$t('edge.statusApi.firmwareVersion'),
          value: this.systemData.firmwareVersion || '-',
        },
        { label: this.$t('edge.statusApi.sn'), value: this.systemData.sn || '-' },
        { label: this.$t('edge.statusApi.imei'), value: this.systemData.imei || '-' },
        { label: this.$t('edge.statusApi.localTime'), value: this.systemData.localTime || '-' },
        { label: this.$t('edge.statusApi.uptime'), value: this.systemData.uptime || '-' },
        { label: this.$t('edge.statusApi.loadAverage'), value: this.systemData.loadAverage || '-' },
      ]
    },
    memoryInfoList() {
      if (!this.memoryData.total) return []
      const format = (key, labelKey) => {
        const val = this.memoryData[key] || 0
        const total = this.memoryData.total
        const percent = Math.round((val / total) * 100)
        return {
          label: this.$t(labelKey),
          value: `${val} kB`,
          total: `${total} kB`,
          percent,
          colorClass: 'bg-gray-400',
        }
      }
      return [
        format('available', 'edge.statusApi.available'),
        format('free', 'edge.statusApi.free'),
        format('cached', 'edge.statusApi.cached'),
        format('buffered', 'edge.statusApi.buffered'),
      ]
    },
    networkInfoList() {
      const ipv4 = this.networkData.ipv4 || {}
      const ipv6 = this.networkData.ipv6 || {}

      const ipv4Content = ipv4.type
        ? `${this.$t('edge.statusApi.type')}: ${ipv4.type}\n${this.$t('edge.statusApi.address')}: ${ipv4.address}\n${this.$t('edge.statusApi.subnetMask')}: ${ipv4.mask}\n${this.$t('edge.statusApi.gateway')}: ${ipv4.gateway}\n${this.$t('edge.statusApi.dns1')}: ${ipv4.dns1}\n${this.$t('edge.statusApi.connected')}: ${ipv4.connectedTime}`
        : this.$t('edge.statusApi.disconnected')

      const ipv6Content = ipv6.connected
        ? `${this.$t('edge.statusApi.address')}: ${ipv6.address}` // Simplified for mock
        : this.$t('edge.statusApi.disconnected')

      return [
        { label: this.$t('edge.statusApi.ipv4WanStatus'), value: ipv4Content },
        { label: this.$t('edge.statusApi.ipv6WanStatus'), value: ipv6Content },
      ]
    },
    wirelessInfoList() {
      if (!this.wirelessData.name) return []
      return [
        {
          label: this.wirelessData.name,
          value: `${this.$t('edge.statusApi.wifiName')}: ${this.wirelessData.ssid}\n${this.$t('edge.statusApi.mode')}: ${this.wirelessData.mode}\n${this.$t('edge.statusApi.channel')}: ${this.wirelessData.channel}\n${this.$t('edge.statusApi.rate')}: ${this.wirelessData.rate}\n${this.$t('edge.statusApi.bssid')}: ${this.wirelessData.bssid}`,
        },
      ]
    },
    routeColumns() {
      return [
        { label: this.$t('edge.statusApi.dst'), key: 'dst' },
        { label: this.$t('edge.statusApi.gateway'), key: 'gw' },
        { label: this.$t('edge.statusApi.mask'), key: 'mask' },
        { label: this.$t('edge.statusApi.flags'), key: 'flags' },
        { label: this.$t('edge.statusApi.metric'), key: 'metric' },
        { label: this.$t('edge.statusApi.ref'), key: 'ref' },
        { label: this.$t('edge.statusApi.use'), key: 'use' },
        { label: this.$t('edge.statusApi.interface'), key: 'iface' },
      ]
    },
    dhcpColumns() {
      return [
        { label: this.$t('edge.statusApi.host'), key: 'host' },
        { label: this.$t('edge.statusApi.ipv4Address'), key: 'ip' },
        { label: this.$t('edge.statusApi.macAddress'), key: 'mac' },
        { label: this.$t('edge.statusApi.leaseTime'), key: 'lease' },
      ]
    },
    dhcpv6Columns() {
      return [
        { label: this.$t('edge.statusApi.host'), key: 'host' },
        { label: this.$t('edge.statusApi.ipv6Address'), key: 'ip' },
        { label: this.$t('edge.statusApi.duid'), key: 'duid' },
        { label: this.$t('edge.statusApi.leaseTime'), key: 'lease' },
      ]
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const system = await request({ url: '/api/edge/status/system', method: 'get' })
        this.systemData = system.data || {}

        const memory = await request({ url: '/api/edge/status/memory', method: 'get' })
        this.memoryData = memory.data || {}

        const network = await request({ url: '/api/edge/status/network', method: 'get' })
        this.networkData = network.data || {}

        const routing = await request({ url: '/api/edge/status/routing', method: 'get' })
        this.routeData = routing.data || []

        const dhcp = await request({ url: '/api/edge/status/dhcp', method: 'get' })
        this.dhcpData = dhcp.data || []

        const dhcpv6 = await request({ url: '/api/edge/status/dhcpv6', method: 'get' })
        this.dhcpv6Data = dhcpv6.data || []

        const wireless = await request({ url: '/api/edge/status/wireless', method: 'get' })
        this.wirelessData = wireless.data || {}
      } catch (error) {
        console.error('Failed to fetch status data:', error)
      }
    },
  },
}
</script>
