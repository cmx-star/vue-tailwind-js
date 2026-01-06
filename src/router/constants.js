/**
 * 路由白名单
 */
export const whiteRoutes = ['Login', 'NotFound']

/**
 * 常量路由映射表
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/common/ViewLogin.vue'),
    meta: { title: 'login.title', isHide: true },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/common/View404.vue'),
    meta: { title: '404', isHide: true },
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
]

/**
 * 顶部导航配置 (static)
 */
export const topNavConfig = [
  { key: 0, name: 'menu.topNav.overview', uri: '/dashboard', icon: 'house' },
  {
    key: 1,
    name: 'menu.topNav.network',
    uri: '/network/overview',
    icon: 'network-wired',
  },
  { key: 2, name: 'menu.topNav.vpn', uri: '/vpn', icon: 'shield-virus' },
  { key: 3, name: 'menu.topNav.edge', uri: '/edge', icon: 'microchip' },
  {
    key: 4,
    name: 'menu.topNav.wizard',
    uri: '/wizard',
    icon: 'wand-magic-sparkles',
  },
  { key: 5, name: 'menu.topNav.system', uri: '/system', icon: 'gears' },
]
