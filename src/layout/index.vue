<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
    <!-- 顶部固定的导航栏 -->
    <header class="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 shadow-sm transition-colors duration-300">
      <Navbar />
    </header>

    <!-- 主布局容器 -->
    <div class="flex pt-16 h-screen overflow-hidden">
      <!-- 侧边栏 (根据 isAside 判断是否显示) -->
      <aside
        v-if="isAside"
        class="fixed lg:static inset-y-0 left-0 z-40 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 transform"
        :class="[
          sidebarCollapsed ? 'w-16' : 'w-64',
          isMobile && !sidebarCollapsed ? 'translate-x-0' : (isMobile ? '-translate-x-full' : 'translate-x-0')
        ]"
      >
        <Sidebar :collapsed="sidebarCollapsed" />
      </aside>

      <!-- 移动端遮罩层 -->
      <div
        v-if="isMobile && isAside && !sidebarCollapsed"
        class="fixed inset-0 bg-black/50 z-30 transition-opacity"
        @click="closeSidebar"
      ></div>

      <!-- 内容主体区域 -->
      <main 
        class="flex-1 overflow-y-auto custom-scrollbar transition-all duration-300 relative"
      >
        <AppMain />
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import AppMain from "./components/AppMain.vue";
import { mapState } from "vuex";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  data() {
    return {
      isMobile: false,
    };
  },
  computed: {
    ...mapState("app", ["sidebarCollapsed"]),
    isAside() {
      // 检查当前路由元信息，是否需要侧边栏
      // 同时如果当前顶层导航没有子树，也可以选择隐藏
      if (this.$route.meta && this.$route.meta.aside !== undefined) {
        return !!this.$route.meta.aside;
      }
      return true;
    },
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 1024;
      if (this.isMobile) {
        this.$store.commit("app/SET_SIDEBAR_COLLAPSE", true);
      }
    },
    closeSidebar() {
      this.$store.commit("app/SET_SIDEBAR_COLLAPSE", true);
    }
  },
  mounted() {
    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkMobile);
  },
};
</script>

<style scoped>
@reference "@/styles/index.css";

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-200 dark:bg-gray-700 rounded-full;
}
</style>
