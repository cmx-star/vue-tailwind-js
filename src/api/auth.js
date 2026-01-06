import httpRequest from '@/utils/request'
import { menuMock } from './mock'
import { useUserStore } from '@/stores/user'

// 存储当前登录的用户名，用于返回对应的菜单（作为fallback）
let currentUser = 'admin'

/**
 * 登录接口
 */
export const login = (data) => {
  // 保存当前用户
  currentUser = data.username || 'admin'

  return httpRequest.post('/api/login', data, {
    mockResponse: {
      code: 200,
      data: {
        token: `mock-token-${currentUser}-${Date.now()}`,
        userInfo: {
          username: currentUser,
          role: getUserRole(currentUser),
          nickname: getUserNickname(currentUser),
          email: `${currentUser}@example.com`,
        },
      },
      message: 'success',
    },
  })
}

/**
 * 获取菜单列表
 */
export const getMenuList = () => {
  // 从 userStore 读取当前用户（支持刷新后恢复）
  const userStore = useUserStore()
  const currentUsername = userStore.userInfo?.username || currentUser || 'admin'

  // 根据当前用户返回不同的菜单
  const menuData = getMenuByUser(currentUsername)

  return httpRequest.get(
    '/api/menu/list',
    {},
    {
      mockResponse: menuData,
    },
  )
}
/**
 * 根据用户名获取角色
 */
function getUserRole(username) {
  const roleMap = {
    admin: 'admin',
    network_admin: 'network_admin',
    system_admin: 'system_admin',
    user: 'user',
    guest: 'guest',
  }
  return roleMap[username] || 'user'
}

/**
 * 根据用户名获取昵称
 */
function getUserNickname(username) {
  const nicknameMap = {
    admin: '超级管理员',
    network_admin: '网络管理员',
    system_admin: '系统管理员',
    user: '普通用户',
    guest: '访客',
  }
  return nicknameMap[username] || '用户'
}

function getMenuByUser(username) {
  const allMenus = menuMock.data

  // 定义不同用户的权限配置
  const userPermissions = {
    // 超级管理员 - 所有菜单
    admin: allMenus,

    // 网络管理员 - 只有概览、网络、VPN
    network_admin: allMenus.filter((m) => [0, 1, 2].includes(m.topNav)),

    // 系统管理员 - 只有概览和系统
    system_admin: allMenus.filter((m) => [0, 5].includes(m.topNav)),

    // 普通用户 - 只有概览
    user: allMenus.filter((m) => m.topNav === 0),
  }

  const filteredMenus = userPermissions[username] || userPermissions.user

  return {
    code: 200,
    data: filteredMenus,
    message: 'success',
  }
}

/**
 * 获取当前用户信息
 */
export const getUserInfo = () => {
  return httpRequest.get(
    '/api/user/info',
    {},
    {
      mockResponse: {
        code: 200,
        data: {
          username: currentUser,
          role: getUserRole(currentUser),
          nickname: getUserNickname(currentUser),
          email: `${currentUser}@example.com`,
        },
        message: 'success',
      },
    },
  )
}
