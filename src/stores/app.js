import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storage } from '@/utils/storage'

export const useAppStore = defineStore('app', () => {
  // 侧边栏折叠状态
  const sidebarCollapsed = ref(storage.get('sidebarCollapsed', false))
  const sidebarCollapse = ref(storage.get('sidebarCollapsed', false))

  // 移动端侧边栏显示状态
  const mobileSidebarOpen = ref(false)

  // 全局加载状态
  const loading = ref(false)

  // 菜单列表
  const menuList = ref([])

  // 顶部导航列表
  const topNavList = ref([])

  // 当前激活的顶部导航
  const activeTopNav = ref(storage.get('activeTopNav', 0))

  /**
   * 切换侧边栏
   */
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
    sidebarCollapse.value = sidebarCollapsed.value
    storage.set('sidebarCollapsed', sidebarCollapsed.value)
  }

  /**
   * 设置侧边栏状态
   */
  const setSidebarCollapsed = (collapsed) => {
    sidebarCollapsed.value = collapsed
    sidebarCollapse.value = collapsed
    storage.set('sidebarCollapsed', collapsed)
  }

  /**
   * 设置侧边栏状态（兼容命名）
   */
  const setSidebarCollapse = (collapsed) => {
    setSidebarCollapsed(collapsed)
  }

  /**
   * 切换移动端侧边栏
   */
  const toggleMobileSidebar = () => {
    mobileSidebarOpen.value = !mobileSidebarOpen.value
  }

  /**
   * 设置移动端侧边栏状态
   */
  const setMobileSidebarOpen = (open) => {
    mobileSidebarOpen.value = open
  }

  /**
   * 设置加载状态
   */
  const setLoading = (value) => {
    loading.value = value
  }

  /**
   * 设置菜单列表
   */
  const setMenuList = (list) => {
    menuList.value = list
  }

  /**
   * 设置顶部导航列表
   */
  const setTopNavList = (list) => {
    topNavList.value = list
  }

  /**
   * 设置当前激活的顶部导航
   */
  const setActiveTopNav = (index) => {
    activeTopNav.value = index
    storage.set('activeTopNav', index)
  }

  /**
   * 根据菜单数据生成顶部导航列表
   * 这是核心功能：根据返回的路由值动态显示顶部导航
   */
  const generateTopNavList = (menuList) => {
    // 顶部导航配置（6个导航项）
    const topNavConfig = [
      {
        key: 0,
        labelKey: 'menu.topNav.overview',
        uri: '/dashboard',
        icon: 'house',
      },
      {
        key: 1,
        labelKey: 'menu.topNav.network',
        uri: '/network/overview',
        icon: 'network-wired',
      },
      {
        key: 2,
        labelKey: 'menu.topNav.vpn',
        uri: '/vpn',
        icon: 'shield-virus',
      },
      { key: 3, labelKey: 'menu.topNav.edge', uri: '/edge', icon: 'microchip' },
      {
        key: 4,
        labelKey: 'menu.topNav.wizard',
        uri: '/wizard',
        icon: 'wand-magic-sparkles',
      },
      { key: 5, labelKey: 'menu.topNav.system', uri: '/system', icon: 'gears' },
    ]

    // 统计每个 topNav 对应的菜单数量
    const topNavCounts = {}
    menuList.forEach((menu) => {
      const topNav = menu.topNav
      if (topNav !== undefined) {
        topNavCounts[topNav] = (topNavCounts[topNav] || 0) + 1

        // 递归统计子菜单
        if (menu.subMenu && menu.subMenu.length > 0) {
          menu.subMenu.forEach((sub) => {
            if (sub.topNav !== undefined) {
              topNavCounts[sub.topNav] = (topNavCounts[sub.topNav] || 0) + 1
            }
          })
        }
      }
    })

    // 过滤出有菜单的顶部导航项
    const filteredTopNavList = topNavConfig.filter((nav) => {
      return topNavCounts[nav.key] > 0
    })

    setTopNavList(filteredTopNavList)

    // 如果当前激活的导航不在列表中，设置为第一个
    if (filteredTopNavList.length > 0) {
      const hasActive = filteredTopNavList.some((nav) => nav.key === activeTopNav.value)
      if (!hasActive) {
        setActiveTopNav(filteredTopNavList[0].key)
      }
    }
  }

  /**
   * 根据当前激活的顶部导航过滤菜单
   */
  const filteredMenuList = computed(() => {
    if (!menuList.value || menuList.value.length === 0) {
      return []
    }

    return menuList.value.filter((menu) => {
      return menu.topNav === activeTopNav.value
    })
  })

  return {
    // State
    sidebarCollapsed,
    sidebarCollapse,
    mobileSidebarOpen,
    loading,
    menuList,
    topNavList,
    activeTopNav,

    // Computed
    filteredMenuList,

    // Actions
    toggleSidebar,
    setSidebarCollapsed,
    setSidebarCollapse,
    toggleMobileSidebar,
    setMobileSidebarOpen,
    setLoading,
    setMenuList,
    setTopNavList,
    setActiveTopNav,
    generateTopNavList,
  }
})
