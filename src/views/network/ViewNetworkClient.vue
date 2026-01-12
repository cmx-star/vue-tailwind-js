<template>
  <CompPageLayout class="ViewNetworkClient">
    <CompPageHeader
      :title="$t('nav.networkClient')"
      :description="$t('network.client.description')"
    />
  </CompPageLayout>
</template>

<script>
export default {
  name: 'ViewNetworkClient',
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
      console.log('加载客户端列表数据')
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS,最小化自定义样式 */
</style>
