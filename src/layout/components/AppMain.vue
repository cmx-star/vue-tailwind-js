<template>
  <div class="p-6">
    <!-- 面包屑导航 -->
    <Breadcrumb class="mb-4" />

    <!-- 页面内容 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Breadcrumb from './Breadcrumb.vue'

const route = useRoute()
</script>

<style scoped>
/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
