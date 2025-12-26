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
      :class="[
        isMobile ? 'hidden' : '',
        appStore.sidebarCollapse ? 'w-16' : 'w-64',
      ]"
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
        marginLeft:
          isMobile || !isAside
            ? '0'
            : appStore.sidebarCollapse
            ? '4rem'
            : '16rem',
        transition: 'margin-left 0.3s ease',
      }"
    >
      <AppMain />
    </main>

    <!-- 移动端悬浮菜单按钮 -->
    <FloatingMenuButton />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "@/stores/app";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar/index.vue";
import AppMain from "./components/AppMain.vue";
import FloatingMenuButton from "./components/FloatingMenuButton.vue";

const route = useRoute();
const appStore = useAppStore();
const isMobile = ref(false);

const mobileSidebarOpen = computed(() => appStore.mobileSidebarOpen);

// 根据路由 meta.aside 判断是否显示侧边栏，如果没有设置则默认显示
const isAside = computed(() => {
  if (route.meta && route.meta.aside !== undefined) {
    return route.meta.aside === "1" || route.meta.aside === 1;
  }
  // 默认显示侧边栏（除了登录和404页）
  return route.path !== "/login" && route.path !== "/404";
});

const MOBILE_BREAKPOINT = 768;

const checkMobile = () => {
  const width = window.innerWidth;
  const wasMobile = isMobile.value;
  isMobile.value = width < MOBILE_BREAKPOINT;

  if (isMobile.value) {
    appStore.setSidebarCollapse(true);
  } else {
    if (wasMobile) {
      appStore.setSidebarCollapse(false);
    }
  }
};

let resizeTimer = null;

const handleResize = () => {
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }
  resizeTimer = setTimeout(() => {
    checkMobile();
  }, 150);
};

watch(
  () => appStore.sidebarCollapse,
  (collapse) => {
    if (isMobile.value) {
      appStore.setMobileSidebarOpen(!collapse);
    }
  }
);

watch(mobileSidebarOpen, (visible) => {
  if (!visible && isMobile.value) {
    appStore.setSidebarCollapse(true);
  }
});

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }
});
</script>
