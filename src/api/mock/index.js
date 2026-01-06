const menuMock = {
  code: 200,
  data: [
    {
      id: 1,
      name: 'dashboard',
      uri: '/dashboard',
      icon: 'house',
      permissionValue: 'ViewDashboard',
      type: 1,
      show: 1,
      aside: 0,
      topNav: 0,
    },
    {
      id: 2,
      name: 'edgeComputing',
      uri: '/edge',
      icon: 'microchip',
      permissionValue: 'ParentView',
      type: 1,
      show: 1,
      aside: 1,
      topNav: 3,
      subMenu: [
        {
          id: 21,
          name: 'productManagement',
          uri: 'node',
          permissionValue: 'ViewNodeManagement',
          type: 1,
          show: 1,
          aside: 1,
          topNav: 3,
        },
        {
          id: 22,
          name: 'analyticsManagement',
          uri: 'analytics',
          permissionValue: 'ViewAnalytics',
          type: 1,
          show: 1,
          aside: 1,
          topNav: 3,
        },
      ],
    },
    {
      id: 3,
      name: 'networkCenter',
      uri: '/network/overview',
      icon: 'network-wired',
      permissionValue: 'ViewNetworkManager',
      type: 1,
      show: 1,
      aside: 1,
      topNav: 1,
    },
    {
      id: 4,
      name: 'interfaceManagement',
      uri: '/network/interface',
      icon: 'ethernet',
      permissionValue: 'ParentView',
      type: 1,
      show: 1,
      aside: 1,
      topNav: 1,
      subMenu: [
        {
          id: 41,
          name: 'interfaceConfig',
          uri: 'config',
          permissionValue: 'ViewInterfaceConfig',
          type: 1,
          show: 1,
          aside: 1,
          topNav: 1,
        },
      ],
    },
    {
      id: 5,
      name: 'securityPolicy',
      uri: '/network/security',
      icon: 'shield-halved',
      permissionValue: 'ParentView',
      type: 1,
      show: 1,
      aside: 1,
      topNav: 1,
      subMenu: [
        {
          id: 51,
          name: 'firewall',
          uri: 'firewall',
          permissionValue: 'ParentView',
          type: 1,
          show: 1,
          aside: 1,
          topNav: 1,
          subMenu: [
            {
              id: 511,
              name: 'firewallSettings',
              uri: 'settings',
              permissionValue: 'ViewFirewallSettings',
              type: 1,
              show: 1,
              aside: 1,
              topNav: 1,
            },
          ],
        },
      ],
    },
    {
      id: 6,
      name: 'vpnService',
      uri: '/vpn',
      icon: 'shield-virus',
      permissionValue: 'ParentView',
      type: 1,
      show: 1,
      aside: 1,
      topNav: 2,
      subMenu: [
        {
          id: 61,
          name: 'userList',
          uri: 'users',
          permissionValue: 'ViewUserList',
          type: 1,
          show: 1,
          aside: 1,
          topNav: 2,
        },
      ],
    },
    {
      id: 7,
      name: 'deploymentWizard',
      uri: '/wizard',
      icon: 'wand-magic-sparkles',
      permissionValue: 'ParentView',
      type: 1,
      show: 1,
      aside: 1,
      topNav: 4,
      subMenu: [
        {
          id: 71,
          name: 'quickSetup',
          uri: 'quick',
          permissionValue: 'ViewQuickSetup',
          type: 1,
          show: 1,
          aside: 1,
          topNav: 4,
        },
      ],
    },
    {
      id: 8,
      name: 'systemSettings',
      uri: '/settings',
      icon: 'gears',
      permissionValue: 'ViewSystemSettings',
      type: 1,
      show: 1,
      aside: 1,
      topNav: 5,
    },
    {
      id: 9,
      name: 'systemManagement',
      uri: '/system',
      icon: 'gears',
      permissionValue: 'ParentView',
      type: 1,
      show: 1,
      aside: 1,
      topNav: 5,
      subMenu: [
        {
          id: 91,
          name: 'operationLog',
          uri: 'logs',
          permissionValue: 'ViewLogManagement',
          type: 1,
          show: 1,
          aside: 1,
          topNav: 5,
        },
        {
          id: 92,
          name: 'personalSettings',
          uri: 'settings',
          permissionValue: 'ViewSettings',
          type: 1,
          show: 1,
          aside: 1,
          topNav: 5,
        },
        {
          id: 93,
          name: 'userManagement',
          uri: 'users',
          permissionValue: 'ViewUserManagement',
          type: 1,
          show: 1,
          aside: 1,
          topNav: 5,
        },
        {
          id: 94,
          name: 'roleManagement',
          uri: 'roles',
          permissionValue: 'ViewRoleManagement',
          type: 1,
          show: 1,
          aside: 1,
          topNav: 5,
        },
        {
          id: 95,
          name: 'formDemo',
          uri: 'form-demo',
          permissionValue: 'ViewFormDemo',
          type: 1,
          show: 1,
          aside: 1,
          topNav: 5,
        },
      ],
    },
  ],
  message: 'success',
}

const userInfoMock = {
  code: 200,
  data: {
    username: 'admin',
    role: 'admin',
    nickname: '超级管理员',
    email: 'admin@example.com',
  },
  message: 'success',
}

const validUsers = ['admin', 'network_admin', 'system_admin', 'user']

function handleLogin(data) {
  const { username } = data || {}
  if (validUsers.includes(username)) {
    return {
      code: 200,
      data: {
        token: `mock-token-${username}-${Date.now()}`,
        userInfo: {
          username,
          role: username === 'admin' ? 'admin' : 'user',
          nickname: username,
        },
      },
      message: 'success',
    }
  }
  return {
    code: 400,
    message: '账号或密码错误',
  }
}

/**
 * mockApi 函数：根据 URL 判断是否有对应的 mock 数据
 * @param {string} url - 请求的 URL
 * @param {object} payload - 请求参数 (params 或 data)
 * @returns {object|null} - 返回 mock 数据或 null
 */
export default function mockApi(url, payload) {
  if (url === '/api/login') {
    return handleLogin(payload)
  }

  const mockMap = {
    '/api/menu/list': menuMock,
    '/api/user/info': userInfoMock,
  }

  return mockMap[url] || null
}

// 同时导出具名导出，供其他文件使用
export { menuMock }
