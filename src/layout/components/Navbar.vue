<template>
  <div class="h-full flex items-center justify-between px-2 md:px-4">
    <!-- 左侧：Logo、侧边栏切换按钮、六个导航选项 -->
    <div class="flex items-center gap-1 md:gap-4 flex-1">
      <!-- Logo 区域 - 宽度与侧边栏保持一致,移动端隐藏 -->
      <div
        v-if="isAside"
        class="hidden md:flex items-center gap-3 flex-shrink-0 transition-all duration-300"
        :style="{
          width: appStore.sidebarCollapse ? '4rem' : '16rem',
        }"
      >
        <div
          class="w-10 h-10 flex items-center justify-center rounded-lg text-white text-lg font-bold flex-shrink-0"
          style="background-color: var(--color-primary-600)"
        >
          后
        </div>
        <h1
          v-if="!appStore.sidebarCollapse"
          class="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap overflow-hidden"
        >
          后台管理
        </h1>
      </div>

      <!-- 无侧边栏时的 Logo,移动端隐藏 -->
      <div v-else class="hidden md:flex items-center gap-3 flex-shrink-0">
        <div
          class="w-10 h-10 flex items-center justify-center rounded-lg text-white text-lg font-bold"
          style="background-color: var(--color-primary-600)"
        >
          后
        </div>
        <h1 class="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">后台管理</h1>
      </div>

      <!-- 侧边栏切换按钮（如果有左侧导航）- 移动端隐藏 -->
      <button
        v-if="isAside"
        class="hidden md:flex p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0 w-8 h-8 md:w-auto md:h-auto items-center justify-center"
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
            'w-10 h-10 md:w-auto md:h-auto flex items-center justify-center',
            activeTopNav === nav.key
              ? 'bg-primary-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
          ]"
          :title="$t(nav.name)"
          @click="handleTopNavClick(nav)"
        >
          <component :is="getNavIcon(nav.key)" class="w-6 h-6 md:w-5 md:h-5" />
          <!-- 悬停提示 -->
          <span
            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs whitespace-nowrap bg-gray-900 dark:bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          >
            {{ $t(nav.name) }}
          </span>
        </button>
      </div>
    </div>

    <!-- 右侧：语言切换、主题切换、用户操作按钮 -->
    <div class="flex items-center gap-1 md:gap-2 flex-shrink-0">
      <!-- 语言切换 -->
      <div ref="langDropdownRef" class="relative">
        <button
          ref="langTriggerRef"
          class="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-8 h-8 md:w-auto md:h-auto flex items-center justify-center md:gap-2 text-gray-700 dark:text-gray-300"
          @click="toggleLangDropdown"
        >
          <LanguageIcon class="w-4 h-4 md:w-5 md:h-5 text-gray-700 dark:text-gray-300" />
          <span class="hidden md:inline text-sm text-gray-700 dark:text-gray-300">{{
            currentLocale === 'zh-CN' ? '中文' : 'English'
          }}</span>
        </button>
        <div
          v-show="showLangDropdown"
          ref="langDropdownContentRef"
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

      <!-- 主题切换（明暗模式 + 六套主题样式） -->
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
          ref="themeDropdownContentRef"
          class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
        >
          <!-- 明暗模式切换 -->
          <button
            class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white"
            @click="toggleDark"
          >
            {{ isDark ? '☀️ 浅色模式' : '🌙 暗色模式' }}
          </button>

          <!-- 分隔线 -->
          <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>

          <!-- 六套主题样式切换 -->
          <div class="px-2 py-1">
            <div class="text-xs text-gray-500 dark:text-gray-300 px-2 py-1 mb-1">主题样式</div>
            <div class="space-y-1">
              <button
                v-for="style in themeStyles"
                :key="style.value"
                :class="[
                  'w-full px-3 py-2 text-left text-sm rounded transition-colors',
                  themeStyle === style.value
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white',
                ]"
                @click="setThemeStyle(style.value)"
              >
                {{ style.label }}
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

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useMenuStore } from '@/stores/menu'
import { useThemeStore } from '@/stores/theme'
import { useI18n } from 'vue-i18n'
import { onClickOutside } from '@vueuse/core'
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
import UserAction from './UserAction.vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const menuStore = useMenuStore()
const themeStore = useThemeStore()
const { locale } = useI18n()

const topNavList = computed(() => menuStore.topNavList)
const activeTopNav = computed(() => menuStore.activeTopNav)

const isAside = computed(() => {
  return route.meta && (route.meta.aside === '1' || route.meta.aside === 1)
})

// 主题状态 - 直接从 store 获取响应式值
const isDark = computed(() => {
  return themeStore.isDark
})
const themeStyle = computed(() => themeStore.themeStyle)
const currentLocale = computed(() => locale.value)

// 顶部导航图标映射 (根据 topNav key: 0-5)
const navIconMap = {
  0: HomeIcon, // 概览
  1: GlobeAltIcon, // 网络
  2: ShieldCheckIcon, // VPN
  3: CloudIcon, // 边缘计算
  4: CpuChipIcon, // 向导
  5: Cog6ToothIcon, // 系统
}

// 获取导航图标
const getNavIcon = (navKey) => {
  return navIconMap[navKey] || HomeIcon
}

// 六套主题样式选项
const themeStyles = [
  { value: 'default', label: '默认' },
  { value: 'minimal', label: '极简' },
  { value: 'enterprise', label: '企业' },
  { value: 'playful', label: '活泼' },
  { value: 'mono', label: '单色' },
  { value: 'modern', label: '现代' },
]

// Dropdown 状态
const showLangDropdown = ref(false)
const showThemeDropdown = ref(false)
const langDropdownRef = ref(null)
const themeDropdownRef = ref(null)
const langTriggerRef = ref(null)
const langDropdownContentRef = ref(null)
const themeTriggerRef = ref(null)
const themeDropdownContentRef = ref(null)

const handleSidebarToggle = () => {
  appStore.toggleSidebar()
}

const handleTopNavClick = (nav) => {
  menuStore.setActiveTopNav(nav.key)

  // 如果是概览（topNav === 0），跳转到仪表盘
  if (nav.key === 0) {
    router.push('/dashboard')
    return
  }

  // 其他选项：找到该 topNav 对应的第一个菜单并跳转
  const menus = menuStore.menuList.filter((menu) => menu.meta?.topNav === nav.key)
  if (menus.length > 0) {
    // 找到第一个有效路径（优先查找子菜单的第一项）
    const findFirstPath = (items) => {
      for (const item of items) {
        // 如果有子菜单，优先返回第一个子菜单的路径
        if (item.children && item.children.length > 0) {
          const childPath = findFirstPath(item.children)
          if (childPath) return childPath
        }
        // 如果没有子菜单，且路径有效，返回该路径
        // 路径应该是完整的绝对路径
        if (item.path && item.path !== '/' && item.path.startsWith('/')) {
          return item.path
        }
      }
      return null
    }

    const firstPath = findFirstPath(menus)

    if (firstPath) {
      // 直接跳转，如果路由存在就会成功，不存在会跳转到 404
      router
        .push(firstPath)
        .then(() => {})
        .catch((err) => {
          console.error('路由跳转失败:', firstPath, err)
          // 如果路由不存在，尝试使用 nav.uri
          if (nav.uri) {
            router.push(nav.uri).catch((e) => {
              console.error('使用 nav.uri 跳转也失败:', nav.uri, e)
            })
          }
        })
    } else if (nav.uri) {
      router.push(nav.uri).catch((err) => {
        console.error('使用 nav.uri 跳转失败:', nav.uri, err)
      })
    }
  } else if (nav.uri) {
    router.push(nav.uri).catch((err) => {
      console.error('使用 nav.uri 跳转失败:', nav.uri, err)
    })
  }
}

const toggleLangDropdown = () => {
  showLangDropdown.value = !showLangDropdown.value
  showThemeDropdown.value = false
}

const toggleThemeDropdown = () => {
  showThemeDropdown.value = !showThemeDropdown.value
  showLangDropdown.value = false
}

const changeLanguage = (lang) => {
  locale.value = lang
  showLangDropdown.value = false
}

const toggleDark = () => {
  themeStore.toggleDark()
  // 不关闭下拉菜单，方便继续切换主题色
}

const setThemeStyle = (style) => {
  themeStore.setThemeStyle(style)
  // 不关闭下拉菜单，方便继续切换
}

// 使用 @vueuse/core 的 onClickOutside 优化点击外部关闭逻辑
onClickOutside(
  langDropdownContentRef,
  () => {
    showLangDropdown.value = false
  },
  {
    ignore: [langTriggerRef],
  },
)

onClickOutside(
  themeDropdownContentRef,
  () => {
    showThemeDropdown.value = false
  },
  {
    ignore: [themeTriggerRef],
  },
)

// 监听路由变化，更新激活的顶部导航
const updateActiveTopNav = () => {
  const currentTopNav = route.meta?.topNav
  if (
    currentTopNav !== undefined &&
    currentTopNav !== null &&
    currentTopNav !== activeTopNav.value
  ) {
    menuStore.setActiveTopNav(currentTopNav)
  }
}

onMounted(() => {
  updateActiveTopNav()
})
</script>

<style scoped>
/* 激活状态的下拉菜单项 */
button.active {
  color: var(--color-primary-600);
}

.dark button.active {
  color: var(--color-primary-400);
}
</style>
