<template>
  <div class="h-full flex items-center justify-between px-2 md:px-4">
    <!-- 左侧：Logo、侧边栏切换按钮、六个导航选项 -->
    <div class="flex items-center gap-1 md:gap-4 flex-1">
      <!-- Logo 区域 - 宽度与侧边栏保持一致,移动端隐藏 -->
      <div
        v-if="isAside"
        class="hidden md:flex items-center gap-3 shrink-0"
        :style="{ width: appStore.sidebarCollapse ? '4rem' : '16rem' }"
      >
        <div
          class="w-10 h-10 flex items-center justify-center rounded-lg text-white text-lg font-bold shrink-0"
          style="background-color: var(--color-primary-600)"
        >
          {{ $t('layout.appNameShort') }}
        </div>
        <h1
          v-if="!appStore.sidebarCollapse"
          class="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap"
        >
          {{ $t('layout.appName') }}
        </h1>
      </div>

      <!-- 无侧边栏时的 Logo,移动端隐藏 -->
      <div v-if="!isAside" class="hidden md:flex items-center gap-3">
        <div
          class="w-10 h-10 flex items-center justify-center rounded-lg text-white text-lg font-bold shrink-0"
          style="background-color: var(--color-primary-600)"
        >
          {{ $t('layout.appNameShort') }}
        </div>
        <h1 class="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
          {{ $t('layout.appName') }}
        </h1>
      </div>

      <!-- 侧边栏切换按钮（如果有左侧导航）- 移动端隐藏 -->
      <button
        v-if="isAside"
        class="hidden md:flex p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0 w-8 h-8 md:w-auto md:h-auto items-center justify-center"
        @click="handleSidebarToggle"
      >
        <Bars3Icon class="w-4 h-4 md:w-5 md:h-5 text-gray-700 dark:text-gray-300" />
      </button>

      <!-- 六个顶部导航选项 - 使用图标显示,移动端更紧凑 -->
      <div class="flex items-center gap-0.5 md:gap-1">
        <button
          v-for="nav in topNavList"
          :key="nav.key"
          :class="[
            'p-2 md:p-2 rounded-lg transition-colors relative group',
            activeTopNav === nav.key
              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
          ]"
          @click="handleTopNavClick(nav)"
        >
          <component :is="getNavIcon(nav.key)" class="w-5 h-5" />
          <!-- 悬停提示 -->
          <span
            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-900 dark:bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          >
            {{ $t(nav.name) }}
          </span>
        </button>
      </div>
    </div>

    <!-- 右侧：语言切换、主题切换、用户操作按钮 -->
    <div class="flex items-center gap-1 md:gap-2 shrink-0">
      <!-- 语言切换 -->
      <div ref="langDropdownRef" class="relative">
        <button
          ref="langTriggerRef"
          class="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-8 h-8 md:w-auto md:h-auto flex items-center justify-center md:gap-2 text-gray-700 dark:text-gray-300"
          @click="toggleLangDropdown"
        >
          <LanguageIcon class="w-4 h-4 md:w-5 md:h-5" />
          <span class="hidden md:inline text-sm">{{
            currentLocale === 'zh-CN' ? '中文' : 'English'
          }}</span>
        </button>
        <div
          v-show="showLangDropdown"
          class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
        >
          <button
            class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white"
            :class="currentLocale === 'zh-CN' ? 'active' : ''"
            @click="changeLanguage('zh-CN')"
          >
            中文
          </button>
          <button
            class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white"
            :class="currentLocale === 'en-US' ? 'active' : ''"
            @click="changeLanguage('en-US')"
          >
            English
          </button>
        </div>
      </div>

      <!-- 主题切换 -->
      <div ref="themeDropdownRef" class="relative">
        <button
          ref="themeTriggerRef"
          class="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-8 h-8 md:w-auto md:h-auto flex items-center justify-center"
          @click="toggleThemeDropdown"
        >
          <SunIcon v-if="!isDark" class="w-4 h-4 md:w-5 md:h-5 text-gray-700 dark:text-gray-300" />
          <MoonIcon v-else class="w-4 h-4 md:w-5 md:h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <div
          v-show="showThemeDropdown"
          class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
        >
          <!-- 明暗模式切换 -->
          <button
            class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white"
            @click="toggleDark"
          >
            {{ isDark ? $t('layout.lightMode') : $t('layout.darkMode') }}
          </button>
          <!-- 分隔线 -->
          <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>
          <!-- 六套主题样式切换 -->
          <div>
            <div class="text-xs text-gray-500 dark:text-gray-300 px-2 py-1 mb-1">
              {{ $t('layout.themeStyle') }}
            </div>
            <div class="space-y-0.5">
              <button
                v-for="style in themeStyleOptions"
                :key="style.value"
                class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white"
                :class="[themeStyle === style.value ? 'active' : '']"
                @click="setThemeStyle(style.value)"
              >
                {{ $t(`layout.themeStyles.${style.value}`) }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 用户操作 -->
      <UserAction />
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '@/stores/app'
import { useMenuStore } from '@/stores/menu'
import { useThemeStore } from '@/stores/theme'
import { storage } from '@/utils/storage'
import {
  Bars3Icon,
  LanguageIcon,
  SunIcon,
  MoonIcon,
  HomeIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CloudIcon,
  CpuChipIcon,
  Cog6ToothIcon,
} from '@heroicons/vue/24/outline'
import UserAction from './LayoutUserAction.vue'

export default {
  name: 'LayoutNavbar',
  components: {
    Bars3Icon,
    LanguageIcon,
    SunIcon,
    MoonIcon,
    UserAction,
    HomeIcon,
    GlobeAltIcon,
    ShieldCheckIcon,
    CloudIcon,
    CpuChipIcon,
    Cog6ToothIcon,
  },
  data() {
    return {
      showLangDropdown: false,
      showThemeDropdown: false,
    }
  },
  computed: {
    ...mapStores(useAppStore, useMenuStore, useThemeStore),
    topNavList() {
      return this.menuStore.topNavList
    },
    activeTopNav() {
      return this.menuStore.activeTopNav
    },
    isAside() {
      return this.$route.meta && (this.$route.meta.aside === '1' || this.$route.meta.aside === 1)
    },
    isDark() {
      return this.themeStore.isDark
    },
    themeStyle() {
      return this.themeStore.themeStyle
    },
    currentLocale() {
      return this.$i18n.locale
    },
    themeStyleOptions() {
      return [
        { value: 'default' },
        { value: 'minimal' },
        { value: 'enterprise' },
        { value: 'playful' },
        { value: 'mono' },
        { value: 'modern' },
      ]
    },
    navIconMap() {
      return {
        0: HomeIcon,
        1: GlobeAltIcon,
        2: ShieldCheckIcon,
        3: CloudIcon,
        4: CpuChipIcon,
        5: Cog6ToothIcon,
      }
    },
  },
  watch: {
    // 监听路由变化，同步顶部导航状态
    $route() {
      this.updateActiveTopNav()
    },
  },
  mounted() {
    this.updateActiveTopNav()
    document.addEventListener('click', this.handleOutsideClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    handleOutsideClick(event) {
      if (
        this.showLangDropdown &&
        this.$refs.langDropdownRef &&
        !this.$refs.langDropdownRef.contains(event.target)
      ) {
        this.showLangDropdown = false
      }
      if (
        this.showThemeDropdown &&
        this.$refs.themeDropdownRef &&
        !this.$refs.themeDropdownRef.contains(event.target)
      ) {
        this.showThemeDropdown = false
      }
    },
    getNavIcon(navKey) {
      return this.navIconMap[navKey] || HomeIcon
    },
    handleSidebarToggle() {
      this.appStore.toggleSidebar()
    },
    handleTopNavClick(nav) {
      this.menuStore.setActiveTopNav(nav.key)
      if (nav.key === 0) {
        this.$router.push('/dashboard')
        return
      }
      const menus = this.menuStore.menuList.filter((menu) => menu.meta?.topNav === nav.key)
      if (menus.length > 0) {
        const firstPath = this.findFirstPath(menus)
        if (firstPath) {
          this.$router.push(firstPath).catch((err) => {
            console.error('路由跳转失败:', firstPath, err)
            if (nav.uri) this.$router.push(nav.uri)
          })
        } else if (nav.uri) {
          this.$router.push(nav.uri)
        }
      } else if (nav.uri) {
        this.$router.push(nav.uri)
      }
    },
    findFirstPath(items) {
      for (const item of items) {
        if (item.children && item.children.length > 0) {
          const childPath = this.findFirstPath(item.children)
          if (childPath) return childPath
        }
        if (item.path && item.path !== '/' && item.path.startsWith('/')) {
          return item.path
        }
      }
      return null
    },
    toggleLangDropdown() {
      this.showLangDropdown = !this.showLangDropdown
      this.showThemeDropdown = false
    },
    toggleThemeDropdown() {
      this.showThemeDropdown = !this.showThemeDropdown
      this.showLangDropdown = false
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang
      // 保存语言设置
      storage.set('locale', lang)
      this.showLangDropdown = false
      // 刷新页面以更新所有翻译
      window.location.reload()
    },
    toggleDark() {
      this.themeStore.toggleDark()
    },
    setThemeStyle(style) {
      this.themeStore.setThemeStyle(style)
    },
    updateActiveTopNav() {
      const currentTopNav = this.$route.meta?.topNav
      // 如果没有 topNav 元信息，但路径是 dashboard，默认为 0
      const targetNav =
        currentTopNav !== undefined && currentTopNav !== null
          ? currentTopNav
          : this.$route.path === '/dashboard' || this.$route.path === '/'
            ? 0
            : null

      if (targetNav !== null && targetNav !== this.activeTopNav) {
        this.menuStore.setActiveTopNav(targetNav)
      }
    },
  },
}
</script>

<style scoped>
button.active {
  color: var(--color-primary-600);
}
.dark button.active {
  color: var(--color-primary-400);
}
</style>
