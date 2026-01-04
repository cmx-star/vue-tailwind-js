<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    // 在创建时立即初始化主题，确保页面加载时就有正确的样式
    this.$store.dispatch('theme/initTheme')
  },
  mounted() {
    // 确保主题已应用
    this.$store.dispatch('theme/applyTheme')
  },
}
</script>

<style>
/* 路由切换动画 */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
