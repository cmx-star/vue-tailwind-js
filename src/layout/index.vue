<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 顶部导航栏 -->
    <header
      class="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 shadow-sm"
    >
      <Navbar />
    </header>

    <!-- 侧边栏 -->
    <aside
      v-if="isAside"
      class="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transition-all duration-300 overflow-hidden"
      :class="[isMobile ? 'hidden' : '', appStore.sidebarCollapse ? 'w-16' : 'w-64']"
    >
      <Sidebar />
    </aside>

    <!-- 移动端遮罩 -->
    <div
      v-if="isMobile && isAside && mobileSidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-30"
      @click="appStore.toggleMobileSidebar"
    ></div>

    <!-- 移动端侧边栏 -->
    <aside
      v-if="isMobile && isAside"
      class="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transform transition-transform duration-300"
      :class="mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <Sidebar />
    </aside>

    <!-- 主内容区 -->
    <main
      class="pt-16 min-h-screen"
      :style="{
        marginLeft: isMobile || !isAside ? '0' : appStore.sidebarCollapse ? '4rem' : '16rem',
        transition: 'margin-left 0.3s ease',
      }"
    >
      <AppMain />
    </main>

    <!-- 移动端悬浮菜单按钮 -->
    <FloatingMenuButton />
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '@/stores/app'
import { useResizeHandler } from './composables/useResizeHandler'
import Navbar from './components/LayoutNavbar.vue'
import Sidebar from './components/LayoutSidebar.vue'
import AppMain from './components/LayoutMain.vue'
import FloatingMenuButton from './components/LayoutFloatingMenuButton.vue'

export default {
  name: 'AppLayout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    FloatingMenuButton,
  },
  setup() {
    const { isMobile, mobileSidebarOpen } = useResizeHandler()

    return {
      isMobile,
      mobileSidebarOpen,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    isAside() {
      if (this.$route.meta && this.$route.meta.aside !== undefined) {
        return this.$route.meta.aside === '1' || this.$route.meta.aside === 1
      }
      return this.$route.path !== '/login' && this.$route.path !== '/404'
    },
  },
}
</script>
