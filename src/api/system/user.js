/**
 * @desc 用户相关API
 * @author maanpeng
 */
import httpRequest from '@/utils/request'

/**
 * 用户登录
 */
export const login = (payload) => {
  return httpRequest.post('/api/user/login', payload)
}

/**
 * 获取用户信息
 */
export const getUserInfo = (payload) => {
  return httpRequest.get('/api/user/info', payload)
}

/**
 * 退出登录
 */
export const logout = (payload) => {
  return httpRequest.post('/api/user/logout', payload)
}

/**
 * 刷新token
 */
export const refreshToken = (payload) => {
  return httpRequest.get('/api/auth/refresh', payload)
}
