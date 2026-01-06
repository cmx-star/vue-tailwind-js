import { createRouter, createWebHashHistory } from 'vue-router'
import { whiteRoutes } from './whiteRoutes'
import { handleLoginMenus } from '@/utils/loginMenus/loginMenusForCommon'
import { useMenuStore } from '@/stores/menu'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 常量路由映射表 (m300-web 风格，直接在 index.js 定义)
// constantRoutes.js 文件存在但为空/未使用
const constantRouterMap = [
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

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap,
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const token = getToken()

  if (token) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      const menuStore = useMenuStore()
      // 如果已登录但没有菜单 (说明页面刷新或刚登录)，加载动态路由
      if (menuStore.menuList.length === 0) {
        // 调用 handleLoginMenus，传入 vue-router 4 的参数 (next, to, router)
        await handleLoginMenus(next, to, router)
      } else {
        // 如果访问根路径，重定向到 dashboard
        if (to.path === '/') {
          next('/dashboard')
        } else if (to.matched.length === 0) {
          next('/404')
        } else {
          next()
        }
      }
    }
  } else {
    // 检查名称或路径是否在白名单
    if (whiteRoutes.includes(to.name) || whiteRoutes.includes(to.path.slice(1))) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export const resetRouterState = () => {
  const menuStore = useMenuStore()
  menuStore.setMenuList([])
}

export default router
