import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './constants'
import { setupGuards } from './guard'
import { useMenuStore } from '@/stores/menu'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

// 安装路由守卫
setupGuards(router)

export const resetRouterState = () => {
  const menuStore = useMenuStore()
  menuStore.setMenuList([])
}

export default router
