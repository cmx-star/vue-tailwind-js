import { defineStore } from 'pinia'
import { storage } from '@/utils/storage'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 侧边栏折叠状态
    sidebarCollapsed: storage.get('sidebarCollapsed', false),
    sidebarCollapse: storage.get('sidebarCollapsed', false),
    // 移动端侧边栏显示状态
    mobileSidebarOpen: false,
    // 全局加载状态
    loading: false,
    // 菜单列表
    menuList: [],
    // 顶部导航列表
    topNavList: [],
    // 当前激活的顶部导航
    activeTopNav: storage.get('activeTopNav', 0),
  }),

  getters: {
    /**
     * 根据当前激活的顶部导航过滤菜单
     */
    filteredMenuList: (state) => {
      if (!state.menuList || state.menuList.length === 0) {
        return []
      }
      return state.menuList.filter((menu) => {
        return menu.topNav === state.activeTopNav
      })
    },
  },

  actions: {
    /**
     * 切换侧边栏
     */
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
      this.sidebarCollapse = this.sidebarCollapsed
      storage.set('sidebarCollapsed', this.sidebarCollapsed)
    },

    /**
     * 设置侧边栏状态
     */
    setSidebarCollapsed(collapsed) {
      this.sidebarCollapsed = collapsed
      this.sidebarCollapse = collapsed
      storage.set('sidebarCollapsed', collapsed)
    },

    /**
     * 设置侧边栏状态（兼容命名）
     */
    setSidebarCollapse(collapsed) {
      this.setSidebarCollapsed(collapsed)
    },

    /**
     * 切换移动端侧边栏
     */
    toggleMobileSidebar() {
      this.mobileSidebarOpen = !this.mobileSidebarOpen
    },

    /**
     * 设置移动端侧边栏状态
     */
    setMobileSidebarOpen(open) {
      this.mobileSidebarOpen = open
    },

    /**
     * 设置加载状态
     */
    setLoading(value) {
      this.loading = value
    },

    /**
     * 设置菜单列表
     */
    setMenuList(list) {
      this.menuList = list
    },

    /**
     * 设置顶部导航列表
     */
    setTopNavList(list) {
      this.topNavList = list
    },

    /**
     * 设置当前激活的顶部导航
     */
    setActiveTopNav(index) {
      this.activeTopNav = index
      storage.set('activeTopNav', index)
    },

    /**
     * 根据菜单数据生成顶部导航列表
     */
    generateTopNavList(menuList) {
      const topNavConfig = [
        { key: 0, labelKey: 'menu.topNav.overview', uri: '/dashboard', icon: 'house' },
        {
          key: 1,
          labelKey: 'menu.topNav.network',
          uri: '/network/overview',
          icon: 'network-wired',
        },
        { key: 2, labelKey: 'menu.topNav.vpn', uri: '/vpn', icon: 'shield-virus' },
        { key: 3, labelKey: 'menu.topNav.edge', uri: '/edge', icon: 'microchip' },
        { key: 4, labelKey: 'menu.topNav.wizard', uri: '/wizard', icon: 'wand-magic-sparkles' },
        { key: 5, labelKey: 'menu.topNav.system', uri: '/system', icon: 'gears' },
      ]

      const topNavCounts = {}
      menuList.forEach((menu) => {
        const topNav = menu.topNav
        if (topNav !== undefined) {
          topNavCounts[topNav] = (topNavCounts[topNav] || 0) + 1
          if (menu.subMenu && menu.subMenu.length > 0) {
            menu.subMenu.forEach((sub) => {
              if (sub.topNav !== undefined) {
                topNavCounts[sub.topNav] = (topNavCounts[sub.topNav] || 0) + 1
              }
            })
          }
        }
      })

      const filteredTopNavList = topNavConfig.filter((nav) => topNavCounts[nav.key] > 0)
      this.setTopNavList(filteredTopNavList)

      if (filteredTopNavList.length > 0) {
        const hasActive = filteredTopNavList.some((nav) => nav.key === this.activeTopNav)
        if (!hasActive) {
          this.setActiveTopNav(filteredTopNavList[0].key)
        }
      }
    },
  },
})
