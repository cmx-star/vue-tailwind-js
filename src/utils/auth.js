/**
 * 权限验证与存储工具
 * 包含 Token 管理和通用 localStorage 操作
 */

// Token 相关的 Key
const TokenKey = 'token'
const LangKey = 'lang'

/**
 * 获取 Token
 */
export function getToken() {
  return localStorage.getItem(TokenKey)
}

/**
 * 设置 Token
 */
export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

/**
 * 移除 Token
 */
export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

/**
 * 获取语言
 */
export function getLang() {
  return localStorage.getItem(LangKey) || 'cn'
}

/**
 * 获取当前登录用户信息
 */
export function getUserLogin() {
  try {
    return JSON.parse(localStorage.getItem('userInfo') || '{}')
  } catch {
    return {}
  }
}

/**
 * 通用 Storage 工具
 * 兼容原 storage.js 的接口
 */
export const storage = {
  get(key) {
    return localStorage.getItem(key)
  },
  set(key, value) {
    localStorage.setItem(key, String(value))
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
}

// 默认导出 storage 对象，兼容原有引用
export default storage
