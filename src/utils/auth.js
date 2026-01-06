/**
 * 权限验证与存储工具
 * 包含 Token 管理和通用 localStorage 操作
 */
import { storage } from './storage'

// Token 相关的 Key
const TokenKey = 'token'
const LangKey = 'lang'

/**
 * 获取 Token
 */
export function getToken() {
  return storage.get(TokenKey)
}

/**
 * 设置 Token
 */
export function setToken(token) {
  return storage.set(TokenKey, token)
}

/**
 * 移除 Token
 */
export function removeToken() {
  return storage.remove(TokenKey)
}

/**
 * 获取语言
 */
export function getLang() {
  return storage.get(LangKey, 'cn')
}

/**
 * 获取当前登录用户信息
 */
export function getUserLogin() {
  return storage.get('userInfo', {})
}

// 重新导出 storage 以保持兼容性
export { storage }
export default storage
