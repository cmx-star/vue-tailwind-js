import axios from 'axios'
import { getToken } from '@/utils/auth'
import mockApi from '@/api/mock'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置 NProgress
NProgress.configure({ showSpinner: false })

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || '/api',
  timeout: 10000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    NProgress.start()
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
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

    // 根据业务逻辑处理错误
    if (res.code && res.code !== 200) {
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
    const mockData = mockApi(url)
    if (mockData || (config.mock && config.mockResponse)) {
      return Promise.resolve(config.mockResponse || mockData)
    }
    return request({
      method: 'get',
      url,
      params,
      ...config,
    })
  },

  post(url, data = {}, config = {}) {
    const mockData = mockApi(url)
    // 如果 mock 文件中有该接口，或者显式传入了 mock 标志和数据
    if (mockData || (config.mock && config.mockResponse)) {
      return Promise.resolve(config.mockResponse || mockData)
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
