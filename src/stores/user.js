import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as loginApi, getUserInfo } from '@/api'
import { setToken, removeToken, getToken, getUserLogin } from '@/utils/auth'
import { useAppStore } from './app'
import { useMenuStore } from './menu'

export const useUserStore = defineStore('user', () => {
  // 从 localStorage 恢复数据
  const savedUserInfo = getUserLogin()
  const savedToken = getToken()

  const userInfo = ref(
    savedUserInfo && Object.keys(savedUserInfo).length > 0 ? savedUserInfo : null,
  )
  const token = ref(savedToken || null)

  /**
   * 登录
   */
  const login = async (credentials) => {
    try {
      const res = await loginApi(credentials)
      if (res.code === 200) {
        token.value = res.data.token
        userInfo.value = res.data.userInfo
        setToken(res.data.token)

        // 保存 userInfo 到 localStorage
        localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))

        // 清除菜单缓存，确保使用新用户的菜单数据
        const menuStore = useMenuStore()
        menuStore.clearMenuData()

        return res
      }
      throw new Error(res.message || '登录失败')
    } catch (error) {
      console.error('[UserStore] Login failed:', error)
      throw error
    }
  }

  /**
   * 获取用户信息
   */
  const fetchUserInfo = async () => {
    try {
      const res = await getUserInfo()
      if (res.code === 200) {
        userInfo.value = res.data
        return res.data
      }
      throw new Error(res.message || '获取用户信息失败')
    } catch (error) {
      console.error('[UserStore] Fetch user info failed:', error)
      throw error
    }
  }

  /**
   * 登出
   */
  const logout = () => {
    token.value = null
    userInfo.value = null
    removeToken()
    localStorage.removeItem('userInfo')

    // 清除菜单
    const appStore = useAppStore()
    appStore.setMenuList([])
    appStore.setTopNavList([])
  }

  /**
   * 重置 Store
   */
  const reset = () => {
    token.value = null
    userInfo.value = null
  }

  return {
    userInfo,
    token,
    login,
    fetchUserInfo,
    logout,
    reset,
  }
})
