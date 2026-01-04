import httpRequest from '@/http/httpRequest'
import { menuMock } from '../mock'

// 存储当前登录的用户名,用于返回对应的菜单
let currentUser = 'admin'

export const login = (data) => {
  // 保存当前用户
  currentUser = data.username || 'admin'

  return httpRequest.post('/api/login', data, {
    mock: true,
    mockResponse: {
      code: 200,
      data: {
        token: `mock-token-${currentUser}-${Date.now()}`,
        userInfo: {
          username: currentUser,
          role: currentUser === 'admin' ? 'admin' : 'user',
        },
      },
      message: 'success',
    },
  })
}

export const getMenuList = () => {
  // 根据当前用户返回不同的菜单
  const menuData = getMenuByUser(currentUser)

  return httpRequest.get(
    '/api/menu/list',
    {},
    {
      mock: true,
      mockResponse: menuData,
    },
  )
}

// 根据用户名返回不同的菜单数据
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

    // 访客 - 只有概览(只读)
    guest: allMenus.filter((m) => m.topNav === 0),
  }

  return {
    code: 200,
    data: userPermissions[username] || userPermissions.user,
    message: 'success',
  }
}
