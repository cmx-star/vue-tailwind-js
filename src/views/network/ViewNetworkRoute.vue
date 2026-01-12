<template>
  <CompPageLayout class="ViewNetworkRoute">
    <CompPageHeader
      :title="$t('nav.networkRoute')"
      :description="$t('network.route.description')"
    />
  </CompPageLayout>
</template>

<script>
export default {
  name: 'ViewNetworkRoute',
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
      console.log('加载路由数据')
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS,最小化自定义样式 */
</style>
