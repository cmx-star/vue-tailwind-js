<template>
  <div class="h-full flex flex-col bg-white dark:bg-gray-800">
    <!-- 导航菜单 -->
    <nav class="flex-1 overflow-y-auto p-4 custom-scrollbar">
      <ul class="space-y-1">
        <SidebarItem
          v-for="item in currentTopNavMenus"
          :key="item.path || item.name"
          :item="item"
          :collapsed="appStore.sidebarCollapse"
        />
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { useMenuStore } from '@/stores/menu'
import SidebarItem from './SidebarItem.vue'

const appStore = useAppStore()
const menuStore = useMenuStore()

// 获取当前顶部导航对应的菜单列表
const currentTopNavMenus = computed(() => {
  const activeTopNav = menuStore.activeTopNav
  if (activeTopNav === undefined || activeTopNav === null) return []

  // 过滤出当前 topNav 对应的菜单
  const menus = menuStore.menuList.filter((menu) => menu.meta?.topNav === activeTopNav)

  // 如果菜单列表为空，返回默认菜单（用于开发阶段）
  if (menus.length === 0) {
    return [
      {
        title: 'nav.dashboard',
        path: '/dashboard',
        name: 'Dashboard',
      },
    ]
  }
  return menus
})
</script>

<style scoped>
/* 暗黑模式下的 Logo 文字颜色 */
.dark h1 {
  color: var(--color-primary-400) !important;
}
</style>
