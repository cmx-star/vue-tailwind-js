import { defineStore } from 'pinia'
import { login as loginApi, getUserInfo } from '@/api'
import { setToken, removeToken, getToken, getUserLogin } from '@/utils/auth'

import { useMenuStore } from './menu'

export const useUserStore = defineStore('user', {
  state: () => {
    const savedUserInfo = getUserLogin()
    const savedToken = getToken()
    return {
      userInfo: savedUserInfo && Object.keys(savedUserInfo).length > 0 ? savedUserInfo : null,
      token: savedToken || null,
    }
  },

  actions: {
    /**
     * 登录
     */
    async login(credentials) {
      try {
        const res = await loginApi(credentials)
        if (res.code === 200) {
          this.token = res.data.token
          this.userInfo = res.data.userInfo
          setToken(res.data.token)
          localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))

          // 清除菜单缓存
          const menuStore = useMenuStore()
          menuStore.clearMenuData()
          return res
        }
        throw new Error(res.message || '登录失败')
      } catch (error) {
        console.error('[UserStore] Login failed:', error)
        throw error
      }
    },

    /**
     * 获取用户信息
     */
    async fetchUserInfo() {
      try {
        const res = await getUserInfo()
        if (res.code === 200) {
          this.userInfo = res.data
          return res.data
        }
        throw new Error(res.message || '获取用户信息失败')
      } catch (error) {
        console.error('[UserStore] Fetch user info failed:', error)
        throw error
      }
    },

    /**
     * 登出
     */
    logout() {
      this.token = null
      this.userInfo = null
      removeToken()
      localStorage.removeItem('userInfo')

      // 清除菜单
      const menuStore = useMenuStore()
      menuStore.clearMenuData()
    },

    /**
     * 重置 Store
     */
    reset() {
      this.token = null
      this.userInfo = null
    },
  },
})
