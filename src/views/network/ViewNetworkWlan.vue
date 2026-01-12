<template>
  <CompPageLayout class="ViewNetworkWlan">
    <CompPageHeader :title="$t('nav.networkWlan')" :description="$t('network.wlan.description')" />
  </CompPageLayout>
</template>

<script>
export default {
  name: 'ViewNetworkWlan',
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
      console.log('加载 WLAN 数据')
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS,最小化自定义样式 */
</style>
