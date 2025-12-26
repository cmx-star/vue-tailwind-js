import { defineStore } from "pinia";
import { ref } from "vue";
import { storage } from "@/utils/storage";

export const useAppStore = defineStore("app", () => {
  // 侧边栏折叠状态（兼容两种命名）
  const sidebarCollapsed = ref(storage.get("sidebarCollapsed", false));
  const sidebarCollapse = ref(storage.get("sidebarCollapsed", false));

  // 移动端侧边栏显示状态
  const mobileSidebarOpen = ref(false);

  // 全局加载状态
  const loading = ref(false);

  /**
   * 切换侧边栏
   */
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
    sidebarCollapse.value = sidebarCollapsed.value;
    storage.set("sidebarCollapsed", sidebarCollapsed.value);
  };

  /**
   * 设置侧边栏状态
   */
  const setSidebarCollapsed = (collapsed) => {
    sidebarCollapsed.value = collapsed;
    sidebarCollapse.value = collapsed;
    storage.set("sidebarCollapsed", collapsed);
  };

  /**
   * 设置侧边栏状态（兼容 vue-next-admin 的命名）
   */
  const setSidebarCollapse = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  /**
   * 切换移动端侧边栏
   */
  const toggleMobileSidebar = () => {
    mobileSidebarOpen.value = !mobileSidebarOpen.value;
  };

  /**
   * 设置移动端侧边栏状态
   */
  const setMobileSidebarOpen = (open) => {
    mobileSidebarOpen.value = open;
  };

  /**
   * 设置加载状态
   */
  const setLoading = (value) => {
    loading.value = value;
  };

  return {
    sidebarCollapsed,
    sidebarCollapse, // 兼容 vue-next-admin 的命名
    mobileSidebarOpen,
    loading,
    toggleSidebar,
    setSidebarCollapsed,
    setSidebarCollapse, // 兼容 vue-next-admin 的命名
    toggleMobileSidebar,
    setMobileSidebarOpen,
    setLoading,
  };
});
