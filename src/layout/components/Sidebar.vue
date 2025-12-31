<template>
  <div class="h-full flex flex-col bg-white dark:bg-gray-800 transition-colors duration-300">
    <!-- 菜单滚动区 -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-4">
      <nav class="px-2">
        <ul class="space-y-1">
          <SidebarItem
            v-for="item in displayMenus"
            :key="item.id"
            :item="item"
            :collapsed="collapsed"
            :parent-path="''"
          />
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SidebarItem from "./SidebarItem.vue";

export default {
  name: "Sidebar",
  components: {
    SidebarItem,
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState("app", ["menuList", "activeTopNav"]),
    displayMenus() {
      if (!this.menuList) return [];
      // 根据当前激活的顶层导航筛选菜单
      return this.menuList.filter((menu) => menu.topNav === this.activeTopNav);
    },
  },
};
</script>

<style scoped>
@reference "@/styles/index.css";
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-200 dark:bg-gray-700 rounded-full;
}
</style>
