import { defineStore } from 'pinia'

/**
 * 菜单状态管理
 * 管理应用的菜单列表、首页路径和动态路由
 */
/**
 * 获取第一个有效菜单路径
 */
const getFirstMenuPath = (list) => {
  for (const item of list) {
    if (item.meta?.isHide) continue
    if (item.children && item.children.length > 0) {
      const childPath = getFirstMenuPath(item.children)
      if (childPath) return childPath
    }
    if (item.component || item.path) return item.path
  }
  return null
}

export const useMenuStore = defineStore('menu', {
  state: () => ({
    /** 菜单列表 */
    menuList: [],
    /** 顶部导航列表 */
    topNavList: [],
    /** 当前选中的顶部导航 */
    activeTopNav: '',
    /** 首页路径 */
    homePath: '/dashboard',
    /** 存储路由移除函数的数组 */
    removeRouteFns: [],
  }),

  getters: {
    /**
     * 获取当前顶部导航的菜单列表
     */
    getCurrentTopNavMenus: (state) => {
      if (state.activeTopNav === undefined || state.activeTopNav === null) return []
      return state.menuList.filter((menu) => menu.meta?.topNav === state.activeTopNav)
    },
  },

  actions: {
    /**
     * 设置顶部导航列表
     */
    setTopNavList(list) {
      this.topNavList = list
      if (list.length > 0 && !this.activeTopNav) {
        this.activeTopNav = list[0].key
      }
    },

    /**
     * 设置当前激活的顶部导航
     */
    setActiveTopNav(key) {
      this.activeTopNav = key
    },

    /**
     * 设置菜单列表
     */
    setMenuList(list) {
      this.menuList = list
      if (list.length > 0) {
        const firstMenu = getFirstMenuPath(list)
        if (firstMenu) {
          this.homePath = firstMenu
        }
      }
    },

    /**
     * 获取首页路径
     */
    getHomePath() {
      return this.homePath
    },

    /**
     * 设置主页路径
     */
    setHomePath(path) {
      this.homePath = path
    },

    /**
     * 添加路由移除函数
     */
    addRemoveRouteFns(fns) {
      this.removeRouteFns.push(...fns)
    },

    /**
     * 移除所有动态路由
     */
    removeAllDynamicRoutes() {
      this.removeRouteFns.forEach((fn) => fn())
      this.removeRouteFns = []
    },

    /**
     * 清空路由移除函数数组
     */
    clearRemoveRouteFns() {
      this.removeRouteFns = []
    },

    /**
     * 获取当前菜单层级结构
     */
    getMenuHierarchy() {
      return this.menuList.map((item) => {
        const menuItem = { ...item, children: [] }
        if (item.children && item.children.length > 0) {
          menuItem.children = item.children.map((child) => {
            let childPath = child.path
            if (!child.path.startsWith('/')) {
              const parentPath = item.path.startsWith('/') ? item.path.slice(1) : item.path
              childPath = `/${parentPath}/${child.path}`
            }
            return { ...child, path: childPath }
          })
        }
        return menuItem
      })
    },

    /**
     * 根据路径查找菜单项
     */
    findMenuItemByPath(path) {
      const findInMenu = (items, targetPath) => {
        for (const item of items) {
          if (item.path === targetPath) return item
          if (item.children && item.children.length > 0) {
            const found = findInMenu(item.children, targetPath)
            if (found) return found
          }
        }
        return null
      }
      return findInMenu(this.menuList, path)
    },

    /**
     * 获取面包屑导航数据
     */
    getBreadcrumbData(currentPath) {
      const breadcrumbs = []
      const findPath = (items, targetPath, pathNodes = []) => {
        for (const item of items) {
          const currentNodes = [...pathNodes, item]
          if (item.path === targetPath) return currentNodes
          if (item.children && item.children.length > 0) {
            const found = findPath(item.children, targetPath, currentNodes)
            if (found) return found
          }
        }
        return null
      }

      const pathNodes = findPath(this.menuList, currentPath)
      if (pathNodes && pathNodes.length > 0) {
        pathNodes.forEach((node) => {
          const title = node.meta?.title || node.name
          const titleKey = node.meta?.titleKey
          if (
            breadcrumbs.length > 0 &&
            (breadcrumbs[breadcrumbs.length - 1].title === title ||
              (titleKey && breadcrumbs[breadcrumbs.length - 1].titleKey === titleKey))
          ) {
            return
          }
          breadcrumbs.push({ title, titleKey, path: node.path })
        })
      }
      return breadcrumbs.length > 1 ? breadcrumbs : []
    },

    /**
     * 清除菜单数据
     */
    clearMenuData() {
      this.menuList = []
      this.topNavList = []
      this.activeTopNav = ''
      this.homePath = '/dashboard'
      this.removeAllDynamicRoutes()
    },
  },
})
