/**
 * Mock Engine
 * 自动加载所有 modules 下的 mock 定义
 */
const modules = import.meta.glob('./modules/*.js', { eager: true })

const mocks = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || []
  mocks.push(...mod)
})

/**
 * 匹配 Mock 数据
 * @param {string} url 请求地址
 * @param {string} method 请求方法 (get, post, put, delete)
 * @param {object} params 请求参数 (query 或 body)
 * @returns {object|null} 返回 mock 数据或 null
 */
export function matchMock(url, method, params) {
  const targetMock = mocks.find((item) => {
    // 简单全匹配
    // 可以扩展为正则匹配，例如: item.url instanceof RegExp ? item.url.test(url) : item.url === url
    // 这里暂时只做字符串全匹配，且忽略 method 大小写
    const isUrlMatch = item.url === url
    const isMethodMatch = item.method ? item.method.toLowerCase() === method.toLowerCase() : true // 没写 method 默认匹配所有
    return isUrlMatch && isMethodMatch
  })

  if (targetMock) {
    if (typeof targetMock.response === 'function') {
      return targetMock.response(params)
    }
    return targetMock.response
  }

  return null
}
