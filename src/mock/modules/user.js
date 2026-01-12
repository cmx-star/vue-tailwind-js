const validUsers = ['admin', 'network_admin', 'system_admin', 'user']

export default [
  // 用户登录
  {
    url: '/api/login',
    method: 'post',
    response: (data) => {
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
    },
  },
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: {
      code: 200,
      data: {
        username: 'admin',
        role: 'admin',
        nickname: '超级管理员',
        email: 'admin@example.com',
      },
      message: 'success',
    },
  },
]
