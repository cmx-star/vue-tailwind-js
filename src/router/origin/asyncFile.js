// 使用 Vite 的 import.meta.glob 自动扫描所有 .vue 组件
// 匹配规则：src/views 及其子目录下的所有 .vue 文件
const modules = import.meta.glob("../../views/**/*.vue");

// 特殊布局组件手动指定
export const componentMap = {
  Layout: () => import("@/layout/index.vue"),
  ParentView: () => import("@/layout/components/ParentView.vue"),
};

/**
 * 核心逻辑：将权限标识 (permissionValue) 映射为实际的组件加载函数
 * 逻辑优先级：
 * 1. 优先匹配 manual 映射 (Layout/ParentView)
 * 2. 模糊匹配 views 下的目录名或文件名
 */
export function loadRoutes(componentName) {
  // 1. 检查手动映射
  if (componentMap[componentName]) {
    return componentMap[componentName];
  }

  // 2. 自动搜索 views 目录下的组件
  // 匹配规则 A: 匹配文件名 (例如 ViewLogin -> views/.../ViewLogin.vue)
  // 匹配规则 B: 如果 componentName 是路径，尝试直接读取
  const modulePath = Object.keys(modules).find((path) => {
    // 提取文件名 (不含扩展名)
    const fileName = path.split("/").pop().replace(".vue", "");
    return fileName === componentName || path.includes(`/${componentName}.vue`);
  });

  if (modulePath) {
    return modules[modulePath];
  }

  console.error(
    `[Router Error]: 找不到组件映射 "${componentName}"，请检查组件命名与权限标识是否一致`
  );

  // 降级到 404
  const fallback = Object.keys(modules).find((p) => p.includes("View404.vue"));
  return fallback
    ? modules[fallback]
    : () => import("@/views/common/View404/View404.vue");
}
