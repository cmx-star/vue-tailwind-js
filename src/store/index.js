import Vue from 'vue'
import Vuex from 'vuex'
import { storage } from '@/utils/storage'

Vue.use(Vuex)

// 应用模块
const appModule = {
  namespaced: true,
  state: {
    sidebarCollapsed: false,
    menuList: [],
    activeTopNav: 0,
    topNavList: [], // 动态生成,初始为空
  },
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    SET_SIDEBAR_COLLAPSE(state, collapse) {
      state.sidebarCollapsed = collapse
    },
    SET_MENU_LIST(state, list) {
      state.menuList = list
    },
    SET_ACTIVE_TOP_NAV(state, key) {
      state.activeTopNav = key
    },
    SET_TOP_NAV_LIST(state, list) {
      state.topNavList = list
    },
  },
  actions: {
    // 根据菜单数据动态生成顶部导航列表
    generateTopNavList({ commit }, menuList) {
      // 定义顶部导航的基础配置 (label 使用 i18n key)
      const topNavConfig = [
        { key: 0, labelKey: 'menu.topNav.overview', uri: '/dashboard', icon: 'house' },
        {
          key: 1,
          labelKey: 'menu.topNav.network',
          uri: '/network/overview',
          icon: 'network-wired',
        },
        { key: 2, labelKey: 'menu.topNav.vpn', uri: '/vpn/users', icon: 'shield-halved' },
        { key: 3, labelKey: 'menu.topNav.edge', uri: '/edge/node', icon: 'microchip' },
        {
          key: 4,
          labelKey: 'menu.topNav.wizard',
          uri: '/wizard/quick',
          icon: 'wand-magic-sparkles',
        },
        { key: 5, labelKey: 'menu.topNav.system', uri: '/system/logs', icon: 'gears' },
      ]

      // 统计每个 topNav 下有多少菜单项
      const topNavCounts = {}
      menuList.forEach((menu) => {
        const topNav = menu.topNav
        if (topNav !== undefined && topNav !== null) {
          topNavCounts[topNav] = (topNavCounts[topNav] || 0) + 1
        }
      })

      // 只保留有菜单项的顶部导航
      const filteredTopNavList = topNavConfig.filter((nav) => {
        return topNavCounts[nav.key] > 0
      })

      commit('SET_TOP_NAV_LIST', filteredTopNavList)
    },
  },
}

// 主题模块
const themeModule = {
  namespaced: true,
  state: () => ({
    themeStyle: storage.get('themeStyle', 'default'),
    isDark: (() => {
      const stored = storage.get('isDark')
      if (stored !== null && stored !== undefined) {
        if (typeof stored === 'string') {
          return stored === 'true'
        }
        return Boolean(stored)
      }
      // 默认使用明亮模式
      return false
    })(),
  }),
  mutations: {
    SET_THEME_STYLE(state, style) {
      state.themeStyle = style
      storage.set('themeStyle', style)
    },
    SET_IS_DARK(state, dark) {
      state.isDark = dark
      storage.set('isDark', dark)
    },
  },
  actions: {
    setThemeStyle({ commit, dispatch }, style) {
      commit('SET_THEME_STYLE', style)
      dispatch('applyTheme')
    },
    toggleDark({ commit, state, dispatch }) {
      const newValue = !state.isDark
      commit('SET_IS_DARK', newValue)
      dispatch('applyTheme')
    },
    setDark({ commit, dispatch }, dark) {
      commit('SET_IS_DARK', dark)
      dispatch('applyTheme')
    },
    applyTheme({ state }) {
      const html = document.documentElement

      // 应用暗色模式
      if (state.isDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }

      // 应用主题样式（六套主题：minimal, enterprise, playful, mono, default, modern）
      // default 主题使用全局默认值，不需要设置 data-theme 属性
      if (state.themeStyle === 'default') {
        html.removeAttribute('data-theme')
      } else {
        html.setAttribute('data-theme', state.themeStyle)
      }
    },
    initTheme({ dispatch, state }) {
      const getIsDarkValue = () => {
        const stored = storage.get('isDark')
        if (stored !== null && stored !== undefined) {
          if (typeof stored === 'string') {
            return stored === 'true'
          }
          return Boolean(stored)
        }
        if (typeof window !== 'undefined' && window.matchMedia) {
          return window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        return false
      }
      const currentValue = getIsDarkValue()
      if (state.isDark !== currentValue) {
        dispatch('setDark', currentValue)
      } else {
        dispatch('applyTheme')
      }
      if (typeof window !== 'undefined' && window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e) => {
          const stored = storage.get('isDark')
          if (stored === null || stored === undefined) {
            dispatch('setDark', e.matches)
          }
        }
        if (mediaQuery.addEventListener) {
          mediaQuery.addEventListener('change', handleChange)
        } else {
          mediaQuery.addListener(handleChange)
        }
      }
    },
  },
}

export default new Vuex.Store({
  modules: {
    app: appModule,
    theme: themeModule,
  },
})
