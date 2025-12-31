import VueRouter from "vue-router";
import { getToken } from "@/utils/auth";
import { whiteRoutes } from "./whiteRoutes";
import { constantRoutes } from "./constantRoutes";
import { getMenuList } from "@/api/origin";
import { loadRoutes } from "./asyncFile";
import store from "@/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const createRouter = () =>
  new VueRouter({
    mode: "hash",
    routes: constantRoutes,
  });

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (
      err &&
      err.name !== "NavigationDuplicated" &&
      !err.message.includes("Redirected")
    ) {
      throw err;
    }
  });
};

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => {
    if (
      err &&
      err.name !== "NavigationDuplicated" &&
      !err.message.includes("Redirected")
    ) {
      throw err;
    }
  });
};

const router = createRouter();

let isRoutesLoaded = false;

// 重置路由方法
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
  isRoutesLoaded = false;
}

// 处理动态菜单转换为路由
async function handleDynamicRoutes() {
  console.log("Fetching menu list...");
  const res = await getMenuList();
  console.log("Menu list received:", res);
  const menus = res.data || [];

  const dynamicRoutes = [];

  const mapMenuToRoute = (menu, parentPath = "") => {
    // 基础路由对象
    const route = {
      path: menu.uri,
      name:
        menu.permissionValue !== "Layout" ? menu.permissionValue : undefined,
      component: loadRoutes(menu.permissionValue),
      meta: {
        title: menu.name,
        icon: menu.icon,
        aside: menu.aside ?? 1,
        topNav: menu.topNav,
      },
      children: [],
    };

    // 递归处理子菜单
    if (menu.subMenu && menu.subMenu.length > 0) {
      menu.subMenu.forEach((sub) => {
        route.children.push(mapMenuToRoute(sub, menu.uri));
      });
    }

    return route;
  };

  menus.forEach((menu) => {
    // 根节点通常映射到 Layout
    const rootRoute = {
      path: menu.uri,
      component: loadRoutes("Layout"),
      children: [],
    };

    if (menu.subMenu && menu.subMenu.length > 0) {
      menu.subMenu.forEach((sub) => {
        rootRoute.children.push(mapMenuToRoute(sub, menu.uri));
      });
    } else {
      // 没有任何子菜单的一级菜单，默认注入一个子路由
      rootRoute.children.push({
        path: "",
        name: menu.permissionValue,
        component: loadRoutes(menu.permissionValue),
        meta: {
          title: menu.name,
          icon: menu.icon,
          aside: menu.aside ?? 1,
          topNav: menu.topNav,
        },
      });
    }
    dynamicRoutes.push(rootRoute);
  });

  // 404 必须在最后添加
  dynamicRoutes.push({ path: "*", redirect: "/404", meta: { aside: 0 } });

  console.log("Registering dynamic routes:", dynamicRoutes);
  dynamicRoutes.forEach((route) => {
    router.addRoute(route);
  });

  if (store.commit) {
    store.commit("app/SET_MENU_LIST", menus);
  }

  return dynamicRoutes;
}

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const token = getToken();
  console.log(
    `Navigation Guard: to=${
      to.path
    }, hasToken=${!!token}, routesLoaded=${isRoutesLoaded}`
  );

  if (token) {
    if (to.path === "/login") {
      console.log("Token exists, redirecting from login to /");
      next({ path: "/" });
      NProgress.done();
    } else {
      if (!isRoutesLoaded) {
        try {
          console.log("Initial load: Loading dynamic routes...");
          await handleDynamicRoutes();
          isRoutesLoaded = true;
          console.log(
            "Dynamic routes loaded, retrying navigation to:",
            to.fullPath
          );
          next({ ...to, replace: true });
        } catch (error) {
          console.error("Dynamic routes load failed", error);
          next({ path: "/login" });
          NProgress.done();
        }
      } else {
        next();
      }
    }
  } else {
    // 检查是否在白名单 (支持名称和路径)
    if (whiteRoutes.includes(to.name) || whiteRoutes.includes(to.path)) {
      next();
    } else {
      next({ path: "/login" });
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
