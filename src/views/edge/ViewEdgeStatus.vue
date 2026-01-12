<template>
  <CompPageLayout>
    <CompPageHeader :title="$t('nav.edgeStatus')" />

    <!-- System Info -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('edge.status.system')" class="mb-4" />
      <CompDescriptionList :data-list="systemInfo" />
    </CompCard>

    <!-- Memory Info -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('edge.status.memory')" class="mb-4" />
      <div class="space-y-4 px-4 py-2">
        <CompUsageBar v-for="(item, index) in memoryInfo" :key="index" :item="item" />
      </div>
    </CompCard>

    <!-- Network Info -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('edge.status.network')" class="mb-4" />
      <CompDescriptionList :data-list="networkInfo" />
    </CompCard>

    <!-- Routing Table -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('edge.status.routingTable')" class="mb-4" />
      <CompDataTable :columns="routeColumns" :data="routeData" />
    </CompCard>

    <!-- DHCP Distribution -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('edge.status.dhcpDistribution')" class="mb-4" />
      <CompDataTable :columns="dhcpColumns" :data="dhcpData" />
    </CompCard>

    <!-- DHCPv6 Distribution -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('edge.status.dhcpv6Distribution')" class="mb-4" />
      <CompDataTable
        :columns="dhcpv6Columns"
        :data="dhcpv6Data"
        :empty-text="$t('edge.status.noLeases')"
      />
    </CompCard>

    <!-- Wireless Info -->
    <CompCard class="mb-6">
      <CompTitle :title="$t('edge.status.wireless')" class="mb-4" />
      <CompDescriptionList :data-list="wirelessInfo" />
    </CompCard>
  </CompPageLayout>
</template>

<script>
export default {
  name: 'ViewEdgeStatus',
  components: {},
  data() {
    return {}
  },
  computed: {
    systemInfo() {
      return [
        { label: this.$t('edge.status.hostname'), value: 'USR-G806w' },
        { label: this.$t('edge.status.firmwareVersion'), value: 'V1.1.15' },
        { label: this.$t('edge.status.sn'), value: '01601224060700032834' },
        { label: this.$t('edge.status.imei'), value: '868517075929038' },
        { label: this.$t('edge.status.localTime'), value: 'Mon Jan 12 15:55:36 2026' },
        { label: this.$t('edge.status.uptime'), value: '11h 45m 12s' },
        { label: this.$t('edge.status.loadAverage'), value: '0.42, 0.74, 0.81' },
      ]
    },
    memoryInfo() {
      return [
        {
          label: this.$t('edge.status.available'),
          value: '84256 kB',
          total: '125024 kB',
          percent: 67,
          colorClass: 'bg-gray-400',
        },
        {
          label: this.$t('edge.status.free'),
          value: '51960 kB',
          total: '125024 kB',
          percent: 41,
          colorClass: 'bg-gray-400',
        },
        {
          label: this.$t('edge.status.cached'),
          value: '24628 kB',
          total: '125024 kB',
          percent: 19,
          colorClass: 'bg-gray-400',
        },
        {
          label: this.$t('edge.status.buffered'),
          value: '7668 kB',
          total: '125024 kB',
          percent: 6,
          colorClass: 'bg-gray-400',
        },
      ]
    },
    networkInfo() {
      return [
        {
          label: this.$t('edge.status.ipv4WanStatus'),
          value: `${this.$t('edge.status.type')}: dhcp\n${this.$t('edge.status.address')}: 192.168.31.14\n${this.$t('edge.status.subnetMask')}: 255.255.255.0\n${this.$t('edge.status.gateway')}: 192.168.31.1\n${this.$t('edge.status.dns1')}: 192.168.31.1\n${this.$t('edge.status.connected')}: 6h 16m 39s`,
        },
        {
          label: this.$t('edge.status.ipv6WanStatus'),
          value: this.$t('edge.status.disconnected'),
        },
      ]
    },
    routeColumns() {
      return [
        { label: this.$t('edge.status.dst'), key: 'dst' },
        { label: this.$t('edge.status.gateway'), key: 'gw' },
        { label: this.$t('edge.status.mask'), key: 'mask' },
        { label: this.$t('edge.status.flags'), key: 'flags' },
        { label: this.$t('edge.status.metric'), key: 'metric' },
        { label: this.$t('edge.status.ref'), key: 'ref' },
        { label: this.$t('edge.status.use'), key: 'use' },
        { label: this.$t('edge.status.interface'), key: 'iface' },
      ]
    },
    routeData() {
      return [
        {
          dst: '0.0.0.0',
          gw: '192.168.31.1',
          mask: '0.0.0.0',
          flags: 'UG',
          metric: 10,
          ref: 0,
          use: 0,
          iface: 'eth0',
        },
        {
          dst: '10.8.0.0',
          gw: '0.0.0.0',
          mask: '255.255.255.0',
          flags: 'U',
          metric: 0,
          ref: 0,
          use: 0,
          iface: 'tun_dcloud',
        },
        {
          dst: '10.20.215.1',
          gw: '0.0.0.0',
          mask: '255.255.255.255',
          flags: 'UH',
          metric: 0,
          ref: 0,
          use: 0,
          iface: 'usr_wg0',
        },
        {
          dst: '10.20.215.7',
          gw: '0.0.0.0',
          mask: '255.255.255.255',
          flags: 'UH',
          metric: 0,
          ref: 0,
          use: 0,
          iface: 'usr_wg0',
        },
        {
          dst: '192.168.1.0',
          gw: '0.0.0.0',
          mask: '255.255.255.0',
          flags: 'U',
          metric: 0,
          ref: 0,
          use: 0,
          iface: 'br-lan',
        },
        {
          dst: '192.168.31.0',
          gw: '0.0.0.0',
          mask: '255.255.255.0',
          flags: 'U',
          metric: 10,
          ref: 0,
          use: 0,
          iface: 'eth0',
        },
        {
          dst: '192.168.31.1',
          gw: '0.0.0.0',
          mask: '255.255.255.255',
          flags: 'UH',
          metric: 10,
          ref: 0,
          use: 0,
          iface: 'eth0',
        },
      ]
    },

    dhcpColumns() {
      return [
        { label: this.$t('edge.status.host'), key: 'host' },
        { label: this.$t('edge.status.ipv4Address'), key: 'ip' },
        { label: this.$t('edge.status.macAddress'), key: 'mac' },
        { label: this.$t('edge.status.leaseTime'), key: 'lease' },
      ]
    },
    dhcpData() {
      return [
        { host: 'iQOO-12', ip: '192.168.1.101', mac: 'd4:cb:cc:d7:6a:a1', lease: '10h 17m 43s' },
        { host: '?', ip: '192.168.1.115', mac: '9c:a5:25:b1:e0:a4', lease: '11h 59m 51s' },
      ]
    },
    dhcpv6Columns() {
      return [
        { label: this.$t('edge.status.host'), key: 'host' },
        { label: this.$t('edge.status.ipv6Address'), key: 'ip' },
        { label: this.$t('edge.status.duid'), key: 'duid' },
        { label: this.$t('edge.status.leaseTime'), key: 'lease' },
      ]
    },
    dhcpv6Data() {
      return []
    },
    wirelessInfo() {
      return [
        {
          label: 'Generic 802.11bgn Wireless Controller (wifi0)',
          value: `${this.$t('edge.status.wifiName')}: USR-G806w-3AFE\n${this.$t('edge.status.mode')}: Master\n${this.$t('edge.status.channel')}: 11 (2.462 GHz)\n${this.$t('edge.status.rate')}: 144 Mbit/s\n${this.$t('edge.status.bssid')}: D4:AD:20:97:3B:01`,
        },
      ]
    },
  },
}
</script>
