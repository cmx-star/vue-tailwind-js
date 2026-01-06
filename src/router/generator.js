import { useMenuStore } from '@/stores/menu'
import { loadRoutes } from './loader'
import { topNavConfig } from './constants'
import { getMenuList } from '@/api'

/**
 * 递归转换菜单数据为侧边栏所需的嵌套结构
 */
function getMenuTree(menus, parentPath = '', parentAside = 1, parentTopNav = '') {
  return menus
    .filter((menu) => (menu.show == '1' || menu.show == 1) && menu.type != '3' && menu.type != 3)
    .map((menu) => {
      const currentAside = menu.aside !== undefined ? menu.aside : parentAside
      const currentTopNav = menu.topNav || parentTopNav

      // 计算当前节点的绝对路径
      let itemPath = ''
      if (parentPath) {
        itemPath = parentPath.endsWith('/') ? parentPath + menu.uri : parentPath + '/' + menu.uri
      } else {
        itemPath = menu.uri.startsWith('/') ? menu.uri : '/' + menu.uri
      }

      const item = {
        path: itemPath,
        name: menu.permissionValue,
        meta: {
          titleKey: `nav.${menu.name}`, // 使用 titleKey 存储 i18n key
          icon: menu.icon,
          aside: currentAside,
          topNav: currentTopNav, // 添加 topNav 标识
          permissionValue: menu.permissionValue,
          alwaysShow: menu.alwaysShow === 1 || menu.alwaysShow === '1',
        },
      }

      if (menu.subMenu && menu.subMenu.length > 0) {
        // 将当前的完整路径 itemPath 传递给子项，确保层级路径不断裂
        item.children = getMenuTree(menu.subMenu, itemPath, currentAside, currentTopNav)
      }
      return item
    })
}

/**
 * 递归提取所有叶子节点，并将其路径打平，准备挂载到 Layout 下
 */
function getFlatRoutes(menus, parentPath = '', parentAside = 1, parentTopNav = 0) {
  let routes = []
  menus.forEach((menu) => {
    if ((menu.show != '1' && menu.show != 1) || menu.type == '3' || menu.type == 3) return

    const currentAside = menu.aside !== undefined ? menu.aside : parentAside
    const currentTopNav =
      menu.topNav !== undefined && menu.topNav !== null ? menu.topNav : parentTopNav

    // 对于子路由，直接使用 uri（已经是相对路径，不以 / 开头）
    const menuUri = menu.uri.startsWith('/') ? menu.uri.slice(1) : menu.uri
    const currentPath = menuUri

    if (menu.subMenu && menu.subMenu.length > 0) {
      // 如果是目录，继续递归提取子项
      const nestedParentPath = parentPath ? `${parentPath}/${currentPath}` : currentPath
      routes.push(...getFlatRoutes(menu.subMenu, nestedParentPath, currentAside, currentTopNav))
    } else {
      // 如果是叶子节点，生成路由配置
      let routePath
      if (parentPath) {
        routePath = `${parentPath}/${currentPath}`
      } else {
        routePath = currentPath
      }
      routes.push({
        path: routePath,
        name: menu.permissionValue,
        component: loadRoutes(menu.permissionValue),
        meta: {
          titleKey: `nav.${menu.name}`, // 使用 titleKey 存储 i18n key
          icon: menu.icon,
          aside: currentAside,
          topNav: currentTopNav, // 添加 topNav 标识
          permissionValue: menu.permissionValue,
        },
      })
    }
  })
  return routes
}

/**
 * 动态路由处理 (打平路由结构，支持无限级侧边栏)
 */
export async function handleLoginMenus(next, to, router) {
  const menuStore = useMenuStore()

  // 1. 获取菜单数据 - 调用 API 函数，该函数会根据用户角色过滤菜单
  const res = await getMenuList()
  let menuList = res.data || []

  // 2. 提取顶部导航列表（按 topNav 数字排序）
  const topNavCounts = {}
  menuList.forEach((menu) => {
    if (menu.topNav !== undefined && menu.topNav !== null) {
      topNavCounts[menu.topNav] = (topNavCounts[menu.topNav] || 0) + 1
    }
  })

  // 根据菜单数据过滤出有菜单的顶部导航
  const topNavList = topNavConfig.filter((nav) => {
    return topNavCounts[nav.key] > 0
  })

  menuStore.setTopNavList(topNavList)

  // 3. 转换为 Vue Router 配置
  const addRoutesArr = []

  menuList.forEach((menu) => {
    if ((menu.show != '1' && menu.show != 1) || menu.type == '3' || menu.type == 3) return

    let topMenu
    if (menu.subMenu && menu.subMenu.length > 0) {
      // 顶级目录
      topMenu = {
        path: menu.uri.startsWith('/') ? menu.uri : '/' + menu.uri,
        component: loadRoutes('Layout'),
        meta: {
          titleKey: `nav.${menu.name}`, // 使用 titleKey 存储 i18n key
          icon: menu.icon,
          aside: menu.aside !== undefined ? menu.aside : '1',
          topNav: menu.topNav !== undefined && menu.topNav !== null ? menu.topNav : 0, // 添加 topNav 标识，默认为 0
          permissionValue: menu.permissionValue,
          alwaysShow: menu.alwaysShow === 1 || menu.alwaysShow === '1',
        },
        children: getFlatRoutes(
          menu.subMenu,
          '',
          menu.aside !== undefined ? menu.aside : '1',
          menu.topNav !== undefined && menu.topNav !== null ? menu.topNav : 0,
        ),
      }
    } else {
      // 独立一级页面 (没有子菜单)
      const menuUri = menu.uri.startsWith('/') ? menu.uri : '/' + menu.uri
      topMenu = {
        path: menuUri,
        component: loadRoutes('Layout'),
        meta: {
          titleKey: `nav.${menu.name}`, // 使用 titleKey 存储 i18n key
          icon: menu.icon,
          aside: menu.aside !== undefined ? menu.aside : '1',
          topNav: menu.topNav !== undefined && menu.topNav !== null ? menu.topNav : 0, // 添加 topNav 标识，默认为 0
          permissionValue: menu.permissionValue,
          alwaysShow: menu.alwaysShow === 1 || menu.alwaysShow === '1',
        },
        children: [
          {
            path: '',
            name: menu.permissionValue,
            component: loadRoutes(menu.permissionValue),
            meta: {
              titleKey: `nav.${menu.name}`, // 使用 titleKey 存储 i18n key
              icon: menu.icon,
              aside: menu.aside !== undefined ? menu.aside : '1',
              topNav: menu.topNav !== undefined && menu.topNav !== null ? menu.topNav : 0, // 添加 topNav 标识，默认为 0
              permissionValue: menu.permissionValue,
            },
          },
        ],
      }
    }
    addRoutesArr.push(topMenu)
  })

  // 4. 添加 404 兜底
  addRoutesArr.push({
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: loadRoutes('NotFound'),
    meta: { isHide: true, aside: '0' },
  })

  // 5. 应用到 router
  addRoutesArr.forEach((route) => {
    router.addRoute(route)
  })

  // 6. 将嵌套树存入 store 给侧边栏用
  const menuTree = getMenuTree(menuList)
  menuStore.setMenuList(menuTree)

  // 7. 设置当前激活的顶部导航（根据当前路由）
  let currentTopNav = to.meta?.topNav
  if (to.path === '/dashboard' && (currentTopNav === undefined || currentTopNav === null)) {
    currentTopNav = 0
  } else if (currentTopNav === undefined || currentTopNav === null) {
    currentTopNav =
      menuList.find((m) => m.topNav !== undefined && m.topNav !== null)?.topNav ??
      topNavList[0]?.key ??
      0
  }
  if (currentTopNav !== undefined && currentTopNav !== null) {
    menuStore.setActiveTopNav(currentTopNav)
  }

  // 8. 跳转
  next({ ...to, replace: true })
}
