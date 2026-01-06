import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { useMenuStore } from '@/stores/menu'
import { whiteRoutes } from './constants'
import { handleLoginMenus } from './generator'

export function setupGuards(router) {
  NProgress.configure({ showSpinner: false })
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
}
