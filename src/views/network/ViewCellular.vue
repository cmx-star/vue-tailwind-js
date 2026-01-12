<template>
  <CompPageLayout class="ViewCellular">
    <CompPageHeader
      :title="$t('nav.networkCellular')"
      :description="$t('network.cellular.description')"
    />
  </CompPageLayout>
</template>

<script>
export default {
  name: 'ViewCellular',
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
      console.log('加载蜂窝网络数据')
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS,最小化自定义样式 */
</style>
