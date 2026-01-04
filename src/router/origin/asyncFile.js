// 使用 Vite 的 import.meta.glob 自动扫描所有 .vue 组件
// 匹配规则：src/views 及其子目录下的所有 .vue 文件，排除局部 components 目录
const modules = import.meta.glob(['../../views/**/*.vue', '!../../views/**/components/**'])

// 特殊布局组件手动指定
export const componentMap = {
  Layout: () => import('@/layout/index.vue'),
}

/**
 * 核心逻辑：将权限标识 (permissionValue) 映射为实际的组件加载函数
 * 逻辑优先级：
 * 1. 优先匹配 manual 映射 (Layout/ParentView)
 * 2. 模糊匹配 views 下的目录名或文件名
 */
export function loadRoutes(componentName) {
  // 1. 检查手动映射
  if (componentMap[componentName]) {
    return componentMap[componentName]
  }

  // 2. 自动搜索 views 目录下的组件
  // 匹配规则 A: 精确匹配文件名 (忽略 .vue 后缀)
  // 匹配规则 B: 允许忽略 View 前缀进行匹配
  const modulePath = Object.keys(modules).find((path) => {
    const fileName = path.split('/').pop().replace('.vue', '').toLowerCase()
    const targetName = componentName.toLowerCase()
    const pureTargetName = targetName.replace('view', '')

    return (
      fileName === targetName ||
      fileName === pureTargetName ||
      path.toLowerCase().includes(`/${targetName}.vue`)
    )
  })

  if (modulePath) {
    return modules[modulePath]
  }

  console.error(
    `[Router Error]: 找不到组件映射 "${componentName}"，请检查组件命名与权限标识是否一致`,
  )

  // 降级到 404
  const fallback = Object.keys(modules).find((p) => p.includes('View404.vue'))
  return fallback ? modules[fallback] : () => import('@/views/common/View404.vue')
}
