<template>
  <CompPageLayout class="ViewWizard">
    <CompPageHeader
      :title="$t('nav.deploymentWizard')"
      :description="$t('wizard.quick.description')"
    />
  </CompPageLayout>
</template>

<script>
/**
 * @desc: 配置向导 - 快速配置单页面
 * @author: Antigravity
 */

export default {
  // 组件名称
  name: 'ViewWizard',
  // 子组件
  components: {},
  // 动态属性
  data() {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听属性
  watch: {},
  // vue实例挂载到dom之后
  mounted() {
    this.loadData()
  },
  // 绑定方法
  methods: {
    loadData() {
      console.log('加载配置向导数据')
    },
  },
}
</script>

<style scoped></style>
