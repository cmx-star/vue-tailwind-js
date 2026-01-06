<template>
  <router-view />

  <!-- Toast 通知 -->
  <Toast ref="toastRef" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import Toast from '@/components/CompToast/CompToast.vue'
import { setToastInstance } from '@/composables/useToast'

const themeStore = useThemeStore()
const toastRef = ref(null)

onMounted(() => {
  // 初始化主题
  themeStore.initTheme()

  // Flowbite 按需加载：只在需要时初始化
  // 如果项目中没有使用 Flowbite 的 JavaScript 功能（data-* 属性），可以移除
  // 如果需要，可以改为动态导入：
  // import('flowbite').then(({ initFlowbite }) => initFlowbite())

  // 设置 Toast 实例
  setToastInstance(toastRef.value)
})
</script>
