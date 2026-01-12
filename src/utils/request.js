import axios from 'axios'
import { getToken } from '@/utils/auth'
import { matchMock } from '@/mock'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置 NProgress
NProgress.configure({ showSpinner: false })

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || '/api',
  timeout: 10000,
})

// 不需要token的url (从 status.js 迁移)
const notNeedTokenUrl = [
  '/api/user/login',
  '/api/auth/refresh',
  '/api/user/regUser',
  '/api/user/loginByPhoneNumber',
]

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    NProgress.start()
    // 判断是否在不需要 Token 的白名单中
    const isIgnoreToken = notNeedTokenUrl.some((url) => config.url.includes(url))

    if (!isIgnoreToken) {
      const token = getToken()
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    NProgress.done()
    const res = response.data

    // 兼容 status.js 中的 tokenFaildStatus 逻辑，通常是 401
    // 这里假设后端返回 code=401 代表 token 失效
    if (res.code === 401) {
      // TODO: 触发登出操作，例如 store.dispatch('user/resetToken')
      // 目前简单处理：移除 token 并跳转登录
      // removeToken()
      // location.reload()
    }

    // 根据业务逻辑处理错误
    if (res.code && res.code !== 200) {
      // 允许特定接口自行处理错误 (例如 checkMobile 时的 404)
      // if (config.skipErrorHandler) return res

      // TODO: 统一错误处理，如弹窗提示
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  },
)

const httpRequest = {
  get(url, params = {}, config = {}) {
    // 检查环境变量开关，默认开启 ('true' or undefined treated as true if we want, but usually explicit true)
    // 这里设定：只有 VITE_USE_MOCK !== 'false' 时才启用 mock
    const useMock = import.meta.env.VITE_USE_MOCK !== 'false'

    if (useMock) {
      const mockData = matchMock(url, 'get', params)
      if (mockData || (config.mock && config.mockResponse)) {
        return Promise.resolve(config.mockResponse || mockData)
      }
    }
    return request({
      method: 'get',
      url,
      params,
      ...config,
    })
  },

  post(url, data = {}, config = {}) {
    const useMock = import.meta.env.VITE_USE_MOCK !== 'false'

    if (useMock) {
      const mockData = matchMock(url, 'post', data)
      // 如果 mock 文件中有该接口，或者显式传入了 mock 标志和数据
      if (mockData || (config.mock && config.mockResponse)) {
        if (mockData.code && mockData.code !== 200) {
          return Promise.reject(new Error(mockData.message || 'Error'))
        }
        return Promise.resolve(config.mockResponse || mockData)
      }
    }

    return request({
      method: 'post',
      url,
      data,
      ...config,
    })
  },

  put(url, data = {}, config = {}) {
    return request({
      method: 'put',
      url,
      data,
      ...config,
    })
  },

  delete(url, params = {}, config = {}) {
    return request({
      method: 'delete',
      url,
      params,
      ...config,
    })
  },
}

export default httpRequest
