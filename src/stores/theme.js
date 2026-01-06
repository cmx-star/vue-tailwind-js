import { defineStore } from 'pinia'
import { storage } from '@/utils/storage'

const getIsDarkValue = () => {
  const stored = storage.get('isDark')
  if (stored !== null && stored !== undefined) {
    if (typeof stored === 'string') return stored === 'true'
    return Boolean(stored)
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return false
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    // 六套主题样式 (minimal, enterprise, playful, mono, default, modern)
    themeStyle: storage.get('themeStyle', 'default'),
    // 暗色模式
    isDark: getIsDarkValue(),
  }),

  actions: {
    /**
     * 设置主题样式
     */
    setThemeStyle(style) {
      this.themeStyle = style
      storage.set('themeStyle', style)
      this.applyTheme()
    },

    /**
     * 切换暗色模式
     */
    toggleDark() {
      this.isDark = !this.isDark
      storage.set('isDark', this.isDark)
      this.applyTheme()
    },

    /**
     * 设置暗色模式
     */
    setDark(dark) {
      this.isDark = dark
      storage.set('isDark', dark)
      this.applyTheme()
    },

    /**
     * 应用主题
     */
    applyTheme() {
      const html = document.documentElement
      if (this.isDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }

      if (this.themeStyle === 'default') {
        html.removeAttribute('data-theme')
      } else {
        html.setAttribute('data-theme', this.themeStyle)
      }
    },

    /**
     * 初始化主题
     */
    initTheme() {
      const currentValue = getIsDarkValue()
      if (this.isDark !== currentValue) {
        this.isDark = currentValue
      }
      this.applyTheme()

      if (typeof window !== 'undefined' && window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e) => {
          const stored = storage.get('isDark')
          if (stored === null || stored === undefined) {
            this.isDark = e.matches
            this.applyTheme()
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
})
