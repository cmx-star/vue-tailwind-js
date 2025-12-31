<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // 在创建时立即初始化主题，确保页面加载时就有正确的样式
    this.$store.dispatch("theme/initTheme");
  },
  mounted() {
    // 确保主题已应用
    this.$store.dispatch("theme/applyTheme");
  },
};
</script>
