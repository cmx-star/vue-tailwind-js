/**
 * 本地存储工具
 */

const STORAGE_PREFIX = 'vue_admin_'

export const storage = {
  /**
   * 设置存储项
   */
  set(key, value) {
    try {
      const data = JSON.stringify(value)
      localStorage.setItem(STORAGE_PREFIX + key, data)
    } catch (error) {
      console.error('Storage set error:', error)
    }
  },

  /**
   * 获取存储项
   */
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(STORAGE_PREFIX + key)
      return data ? JSON.parse(data) : defaultValue
    } catch (error) {
      console.error('Storage get error:', error)
      return defaultValue
    }
  },

  /**
   * 移除存储项
   */
  remove(key) {
    localStorage.removeItem(STORAGE_PREFIX + key)
  },

  /**
   * 清空所有存储
   */
  clear() {
    const keys = Object.keys(localStorage)
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  },
}
