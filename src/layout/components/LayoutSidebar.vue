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

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '@/stores/app'
import { useMenuStore } from '@/stores/menu'
import SidebarItem from './LayoutSidebarItem.vue'

export default {
  name: 'LayoutSidebar',
  components: {
    SidebarItem,
  },
  computed: {
    ...mapStores(useAppStore, useMenuStore),
    currentTopNavMenus() {
      // 使用 appStore 的 filteredMenuList getter
      const filtered = this.appStore.filteredMenuList

      // 如果没有菜单,返回默认的 Dashboard
      if (!filtered || filtered.length === 0) {
        return [
          {
            title: 'nav.dashboard',
            path: '/dashboard',
            name: 'Dashboard',
          },
        ]
      }
      return filtered
    },
  },
}
</script>

<style scoped>
/* 暗黑模式下的 Logo 文字颜色 */
.dark h1 {
  color: var(--color-primary-400) !important;
}
</style>
