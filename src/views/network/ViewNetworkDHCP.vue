<template>
  <CompPageLayout class="ViewNetworkDHCP">
    <CompPageHeader :title="$t('nav.networkDHCP')" :description="$t('network.dhcp.description')" />
  </CompPageLayout>
</template>

<script>
export default {
  name: 'ViewNetworkDHCP',
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      console.log('加载 DHCP 数据')
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS,最小化自定义样式 */
</style>
