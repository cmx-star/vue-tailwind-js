<template>
  <nav class="h-full px-4 flex items-center justify-between">
    <!-- 左侧：Logo 和 汉堡按钮 -->
    <div class="flex items-center gap-4">
      <Logo class="hidden md:block" />
      <button
        @click="toggleSidebar"
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
      >
        <i class="fas fa-bars text-lg"></i>
      </button>
    </div>

    <!-- 中间：顶部主菜单 (所有设备显示，小屏幕可横向滚动) -->
    <div class="flex items-center gap-1 flex-1 justify-center max-w-3xl px-2 sm:px-4 lg:px-8 overflow-x-auto scrollbar-hide">
      <button
        v-for="nav in topNavList"
        :key="nav.key"
        @click="handleTopNavClick(nav)"
        class="flex flex-col items-center justify-center px-2 sm:px-3 lg:px-4 py-1.5 rounded-xl transition-all duration-300 relative group overflow-hidden flex-shrink-0"
        :class="
          activeTopNav === nav.key
            ? 'text-blue-600 dark:text-blue-400 font-bold'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
        "
      >
        <!-- 背景高亮 -->
        <div v-if="activeTopNav === nav.key" class="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 -z-10"></div>
        <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" :class="{ 'scale-x-100': activeTopNav === nav.key }"></div>
        
        <i :class="['fas', `fa-${nav.icon}`, 'text-base sm:text-lg', 'mb-0.5']"></i>
        <span class="text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold whitespace-nowrap">{{ nav.label }}</span>
      </button>
    </div>

    <!-- 右侧：全局操作 -->
    <div class="flex items-center gap-2">
      <LanguageSwitcher class="hidden md:block" />
      <ThemeSwitcher class="hidden md:block" />
      <div class="w-px h-6 bg-gray-200 dark:border-gray-700 mx-2 hidden sm:block"></div>
      <UserAction />
    </div>
  </nav>
</template>

<script>
import Logo from "./Logo.vue";
import UserAction from "./UserAction.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { mapState } from "vuex";

export default {
  name: "Navbar",
  components: {
    Logo,
    UserAction,
    ThemeSwitcher,
    LanguageSwitcher,
  },
  computed: {
    ...mapState("app", ["activeTopNav", "topNavList", "menuList"]),
  },
  methods: {
    toggleSidebar() {
      this.$store.commit("app/TOGGLE_SIDEBAR");
    },
    handleTopNavClick(nav) {
      this.$store.commit("app/SET_ACTIVE_TOP_NAV", nav.key);
      
      // 找到该 topNav 下的第一个有效菜单进行跳转
      if (nav.uri && nav.key === 0) {
        this.$router.push(nav.uri).catch(() => {});
        return;
      }

      const topMenus = this.menuList.filter(m => m.topNav === nav.key);
      if (topMenus.length > 0) {
        const firstMenu = topMenus[0];
        let targetUri = firstMenu.uri;
        if (firstMenu.subMenu && firstMenu.subMenu.length > 0) {
           targetUri = `${firstMenu.uri}/${firstMenu.subMenu[0].uri}`;
        }
        this.$router.push(targetUri).catch(() => {});
      } else if (nav.uri) {
        this.$router.push(nav.uri).catch(() => {});
      }
    },
  },
  watch: {
    "$route.meta.topNav": {
      immediate: true,
      handler(val) {
        if (val !== undefined && val !== null) {
          this.$store.commit("app/SET_ACTIVE_TOP_NAV", val);
        }
      },
    },
  },
};
</script>

<style scoped>
/* 隐藏滚动条但保持滚动功能 */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}
</style>
