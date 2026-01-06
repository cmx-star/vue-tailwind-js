import { h } from 'vue'
import { RouterView } from 'vue-router'

// 使用相对路径扫描 views 目录下的所有 .vue 文件，确保在 Vite 中路径匹配稳定
const views = import.meta.glob('../../views/**/*.vue')

/**
 * 动态路由加载核心逻辑
 * @param {string} name - 权限标识符 (permissionValue)，例如 "NetworkManager"
 */
export function loadRoutes(name) {
  // 1. 处理特殊组件映射
  if (name === 'Layout') {
    return () => import('@/layout/index.vue')
  }
  if (name === 'NotFound' || name === '404' || name === 'disappear') {
    return () => import('@/views/common/View404.vue')
  }

  // 2. 自动化匹配策略
  // 兼容模式：匹配 permissionValue 对应的 View{name}.vue 或 {name}.vue
  const matchKey = Object.keys(views).find((path) => {
    const fileName = path.split('/').pop()
    return fileName === `View${name}.vue` || fileName === `${name}.vue`
  })

  if (matchKey) {
    return views[matchKey]
  }

  // 3. 兜底处理
  console.warn(
    `[asyncFile] 路由自动导入失败: 未找到与标识符 "${name}" 匹配的组件 (预期文件名: View${name}.vue)`,
  )

  return {
    name: 'RouterViewFallback',
    render: () => h(RouterView),
  }
}
