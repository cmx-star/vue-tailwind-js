/**
 * @desc 静态路径映射 (m300-web 风格)
 * 这里只定义基础路径字符串，不做实际导入
 */

const map = {
  disappear: "@/views/common/View404.vue",
  login: "@/views/common/ViewLogin.vue",
  Layout: "@/layout/index.vue",
};

export default function (config) {
  // 简化版，直接返回 map
  return map;
}
