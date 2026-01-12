<template>
  <CompPageLayout class="ViewGRE">
    <CompPageHeader :title="$t('nav.gre')" :description="$t('vpn.gre.description')" />
  </CompPageLayout>
</template>

<script>
export default {
  name: 'ViewGRE',
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
      console.log('加载 GRE 数据')
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS,最小化自定义样式 */
</style>
