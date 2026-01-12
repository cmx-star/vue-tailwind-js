<template>
  <CompPageLayout class="ViewNetworkChange">
    <CompPageHeader
      :title="$t('nav.networkChange')"
      :description="$t('network.change.description')"
    />
  </CompPageLayout>
</template>

<script>
export default {
  name: 'ViewNetworkChange',
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
      console.log('加载模式切换数据')
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS,最小化自定义样式 */
</style>
