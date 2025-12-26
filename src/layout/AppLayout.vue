<template>
  <Layout />
</template>

<script setup>
import Layout from './index.vue'
</script>

<style scoped>
.layout-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  width: 100%;
  min-height: 100vh;
  background-color: #f9fafb;
}

.dark .main-content {
  background-color: #111827;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0 !important;
  }
}
</style>
