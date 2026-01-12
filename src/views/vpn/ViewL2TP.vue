<template>
  <CompPageLayout class="ViewL2TP">
    <CompPageHeader :title="$t('nav.l2tp')" :description="$t('vpn.l2tp.description')" />
  </CompPageLayout>
</template>

<script>
export default {
  name: 'ViewL2TP',
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
      console.log('加载 L2TP 数据')
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS,最小化自定义样式 */
</style>
