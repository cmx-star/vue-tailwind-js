<template>
  <CompPageLayout class="ViewIPsec">
    <CompPageHeader :title="$t('nav.ipsec')" :description="$t('vpn.ipsec.description')" />
  </CompPageLayout>
</template>

<script>
export default {
  name: 'ViewIPsec',
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
      console.log('加载 IPsec 数据')
    },
  },
}
</script>

<style scoped>
/* 使用 Tailwind CSS,最小化自定义样式 */
</style>
