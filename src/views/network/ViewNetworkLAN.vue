<template>
  <CompPageLayout class="ViewNetworkLAN">
    <CompPageHeader :title="$t('nav.networkLAN')" :description="$t('network.lan.description')" />
  </CompPageLayout>
</template>

<script>
export default {
  name: 'ViewNetworkLAN',
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
      console.log('加载 LAN 数据')
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS,最小化自定义样式 */
</style>
