import { useMenuStore } from "@/stores/menu";
import { loadRoutes } from "@/router/origin/asyncFile";
import httpRequest from "@/http/httpRequest";
import generatorConfig from "@/api/origin/config";
import { useRouter } from "vue-router";

let customConfig = generatorConfig();

/**
 * 递归转换菜单数据为侧边栏所需的嵌套结构
 */
function getMenuTree(menus, parentPath = "", parentAside = 1, parentTopNav = "") {
  return menus
    .filter((menu) => (menu.show == "1" || menu.show == 1) && menu.type != "3" && menu.type != 3)
    .map((menu) => {
      const currentAside = menu.aside !== undefined ? menu.aside : parentAside;
      const currentTopNav = menu.topNav || parentTopNav;

      // 计算当前节点的绝对路径
      let itemPath = "";
      if (parentPath) {
        itemPath = parentPath.endsWith("/") ? parentPath + menu.uri : parentPath + "/" + menu.uri;
      } else {
        itemPath = menu.uri.startsWith("/") ? menu.uri : "/" + menu.uri;
      }

      const item = {
        path: itemPath,
        name: menu.permissionValue,
        meta: {
          titleKey: menu.name, // 使用 titleKey 存储 i18n key
          icon: menu.icon,
          aside: currentAside,
          topNav: currentTopNav, // 添加 topNav 标识
          permissionValue: menu.permissionValue,
          alwaysShow: menu.alwaysShow === 1 || menu.alwaysShow === "1",
        },
      };

      if (menu.subMenu && menu.subMenu.length > 0) {
        // 将当前的完整路径 itemPath 传递给子项，确保层级路径不断裂
        item.children = getMenuTree(menu.subMenu, itemPath, currentAside, currentTopNav);
      }
      return item;
    });
}

/**
 * 递归提取所有叶子节点，并将其路径打平，准备挂载到 Layout 下
 * @param {Array} menus - 菜单列表
 * @param {String} parentPath - 父路径（相对于父路由的路径，不以 / 开头）
 * @param {String|Number} parentAside - 父 aside 值
 * @param {Number} parentTopNav - 父 topNav 值
 */
function getFlatRoutes(menus, parentPath = "", parentAside = 1, parentTopNav = 0) {
  let routes = [];
  menus.forEach((menu) => {
    if ((menu.show != "1" && menu.show != 1) || menu.type == "3" || menu.type == 3) return;

    const currentAside = menu.aside !== undefined ? menu.aside : parentAside;
    const currentTopNav = menu.topNav !== undefined && menu.topNav !== null ? menu.topNav : parentTopNav;
    
    // 对于子路由，直接使用 uri（已经是相对路径，不以 / 开头）
    // Vue Router 会自动将子路由路径拼接到父路由路径后面
    const menuUri = menu.uri.startsWith("/") ? menu.uri.slice(1) : menu.uri;
    const currentPath = menuUri;

    if (menu.subMenu && menu.subMenu.length > 0) {
      // 如果是目录，继续递归提取子项
      // 对于嵌套子路由，需要拼接路径：parentPath/currentPath
      const nestedParentPath = parentPath ? `${parentPath}/${currentPath}` : currentPath;
      routes.push(...getFlatRoutes(menu.subMenu, nestedParentPath, currentAside, currentTopNav));
    } else {
      // 如果是叶子节点，生成路由配置
      // Vue Router 的子路由路径应该是相对于父路由的
      // 如果 parentPath 存在，需要拼接完整路径，但不要以 / 开头（Vue Router 会将其视为绝对路径）
      let routePath;
      if (parentPath) {
        routePath = `${parentPath}/${currentPath}`;
      } else {
        routePath = currentPath;
      }
      routes.push({
        path: routePath,
        name: menu.permissionValue,
        component: loadRoutes(menu.permissionValue),
        meta: {
          titleKey: menu.name, // 使用 titleKey 存储 i18n key
          icon: menu.icon,
          aside: currentAside,
          topNav: currentTopNav, // 添加 topNav 标识
          permissionValue: menu.permissionValue,
        },
      });
    }
  });
  return routes;
}

/**
 * 动态路由处理 (打平路由结构，支持无限级侧边栏)
 */
export async function handleLoginMenus(next, to, router) {
  const menuStore = useMenuStore();

  console.log("=== handleLoginMenus 开始执行 ===");

  // 1. 获取菜单数据
  const res = await httpRequest.get("/api/menu/list", {}, customConfig);
  let menuList = res.data || [];

  console.log("=== handleLoginMenus 调试 ===");
  console.log("res:", res);
  console.log("menuList:", menuList);

  // 2. 提取顶部导航列表（按 topNav 数字排序）
  const topNavMap = new Map();
  menuList.forEach((menu) => {
    if (menu.topNav !== undefined && menu.topNav !== null) {
      if (!topNavMap.has(menu.topNav)) {
        topNavMap.set(menu.topNav, {
          key: menu.topNav, // 使用数字 0-5
          name: menu.name, // i18n key
          uri: menu.uri,
          permissionValue: menu.permissionValue,
        });
      }
    }
  });
  // 按 key 排序，确保顺序正确
  const topNavList = Array.from(topNavMap.values()).sort((a, b) => a.key - b.key);
  menuStore.setTopNavList(topNavList);

  // 3. 转换为 Vue Router 配置
  const addRoutesArr = [];

  menuList.forEach((menu) => {
    if ((menu.show != "1" && menu.show != 1) || menu.type == "3" || menu.type == 3) return;

    let topMenu;
    if (menu.subMenu && menu.subMenu.length > 0) {
      // 顶级目录
      // 关键点：这里调用 getFlatRoutes，将子孙节点全部拉平
      // 对于子路由，不需要传入 parentPath，因为子路由路径应该是相对于父路由的
      topMenu = {
        path: menu.uri.startsWith("/") ? menu.uri : "/" + menu.uri,
        component: loadRoutes("Layout"),
        meta: {
          titleKey: menu.name, // 使用 titleKey 存储 i18n key
          icon: menu.icon,
          aside: menu.aside !== undefined ? menu.aside : "1",
          topNav: menu.topNav !== undefined && menu.topNav !== null ? menu.topNav : 0, // 添加 topNav 标识，默认为 0
          permissionValue: menu.permissionValue,
          alwaysShow: menu.alwaysShow === 1 || menu.alwaysShow === "1",
        },
        children: getFlatRoutes(menu.subMenu, "", menu.aside !== undefined ? menu.aside : "1", menu.topNav !== undefined && menu.topNav !== null ? menu.topNav : 0),
      };
    } else {
      // 独立一级页面 (没有子菜单)
      // 确保路由的完整路径与 menu.uri 一致，以便侧边栏正确跳转
      const menuUri = menu.uri.startsWith("/") ? menu.uri : "/" + menu.uri;
      // 对于 /dashboard 这种路径，直接作为 Layout 的子路由
      topMenu = {
        path: menuUri,
        component: loadRoutes("Layout"),
        meta: {
          titleKey: menu.name, // 使用 titleKey 存储 i18n key
          icon: menu.icon,
          aside: menu.aside !== undefined ? menu.aside : "1",
          topNav: menu.topNav !== undefined && menu.topNav !== null ? menu.topNav : 0, // 添加 topNav 标识，默认为 0
          permissionValue: menu.permissionValue,
          alwaysShow: menu.alwaysShow === 1 || menu.alwaysShow === "1",
        },
        children: [
          {
            path: "", // 空路径表示父路由的默认子路由
            name: menu.permissionValue,
            component: loadRoutes(menu.permissionValue),
            meta: {
              titleKey: menu.name, // 使用 titleKey 存储 i18n key
              icon: menu.icon,
              aside: menu.aside !== undefined ? menu.aside : "1",
              topNav: menu.topNav !== undefined && menu.topNav !== null ? menu.topNav : 0, // 添加 topNav 标识，默认为 0
              permissionValue: menu.permissionValue,
            },
          },
        ],
      };
    }
    addRoutesArr.push(topMenu);
  });

  // 4. 添加 404 兜底
  addRoutesArr.push({
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: loadRoutes("NotFound"),
    meta: { isHide: true, aside: "0" },
  });

  // 5. 应用到 router
  console.log("=== 准备注册路由 ===", addRoutesArr);
  addRoutesArr.forEach((route) => {
    console.log("注册路由:", {
      path: route.path,
      name: route.name,
      childrenCount: route.children?.length,
      children: route.children?.map(c => ({ path: c.path, name: c.name, fullPath: route.path + (c.path ? '/' + c.path : '') }))
    });
    router.addRoute(route);
  });
  console.log("=== 路由注册完成 ===");
  // 验证路由是否注册成功
  const testRoute = router.resolve("/network/networkManager");
  console.log("验证路由 /network/networkManager:", testRoute);

  // 6. 将嵌套树存入 store 给侧边栏用
  const menuTree = getMenuTree(menuList);
  menuStore.setMenuList(menuTree);

  // 7. 设置当前激活的顶部导航（根据当前路由）
  let currentTopNav = to.meta?.topNav;
  // 如果访问 /dashboard 且没有 topNav，默认设置为 0（概览）
  if (to.path === "/dashboard" && (currentTopNav === undefined || currentTopNav === null)) {
    currentTopNav = 0;
  } else if (currentTopNav === undefined || currentTopNav === null) {
    // 否则使用菜单列表中的第一个 topNav，或默认使用第一个顶部导航的 key
    currentTopNav = menuList.find((m) => m.topNav !== undefined && m.topNav !== null)?.topNav ?? topNavList[0]?.key ?? 0;
  }
  if (currentTopNav !== undefined && currentTopNav !== null) {
    menuStore.setActiveTopNav(currentTopNav);
  }

  // 8. 跳转
  next({ ...to, replace: true });
}
