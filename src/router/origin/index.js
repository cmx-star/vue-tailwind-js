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
    // 优化：增加滚动行为控制
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
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

// 处理动态菜单转换为路由 (精简版)
async function handleDynamicRoutes() {
  const res = await getMenuList();
  const menus = res.data || [];

  /**
   * 递归映射菜单为路由
   * @param {Array} menuList 菜单列表
   * @param {Boolean} isRoot 是否为顶层根节点
   */
  const mapMenusToRoutes = (menuList, isRoot = false, parentMeta = {}) => {
    return menuList.map((item) => {
      const hasChildren = item.subMenu && item.subMenu.length > 0;

      // 确定导航上下文 (优先级：显式定义 > 父级继承 > 默认值)
      const topNav = item.topNav ?? parentMeta.topNav ?? 0;
      const aside = item.aside ?? parentMeta.aside ?? 1;

      const route = {
        path: item.uri,
        // 优化：从 uri 或 name 派生 permissionValue (例如 /dashboard -> ViewDashboard)
        name: (() => {
          if (item.permissionValue === "ParentView") return undefined;
          if (item.permissionValue) return item.permissionValue;
          const name = item.name || item.uri.split("/").pop();
          return name.charAt(0).toUpperCase() + name.slice(1);
        })(),
        // 确定渲染组件
        component: (() => {
          if (isRoot && hasChildren) return loadRoutes("Layout");

          // 如果是中间节点且有子菜单，且未指定业务组件，自动注入渲染容器 (Virtual Parent)
          if (
            hasChildren &&
            (!item.permissionValue || item.permissionValue === "ParentView")
          ) {
            return { render: (h) => h("router-view") };
          }

          return loadRoutes(
            item.permissionValue ||
              (item.name || item.uri.split("/").pop()).charAt(0).toUpperCase() +
                (item.name || item.uri.split("/").pop()).slice(1)
          );
        })(),
        meta: {
          title: item.name,
          icon: item.icon,
          aside,
          topNav,
          noCache: item.noCache || false,
        },
        children: hasChildren
          ? mapMenusToRoutes(item.subMenu, false, { topNav, aside })
          : [],
      };

      // 边缘情况处理：如果根节点没有子菜单，通常需要包裹一个空路径的 Layout 子路由（Vue Router 3 常规做法）
      if (isRoot && !hasChildren && route.path.startsWith("/")) {
        const originalComponent = route.component;
        const originalName = route.name;
        route.component = loadRoutes("Layout");
        route.name = undefined;
        route.children = [
          {
            path: "",
            name: originalName,
            component: originalComponent,
            meta: { ...route.meta },
          },
        ];
      }

      return route;
    });
  };

  const dynamicRoutes = mapMenusToRoutes(menus, true);

  // 404 必须在最后添加
  dynamicRoutes.push({ path: "*", redirect: "/404", meta: { aside: 0 } });

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

  // 优化：设置页面标题
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} - Admin Dashboard`;
  }

  const token = getToken();

  if (token) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      if (!isRoutesLoaded) {
        try {
          await handleDynamicRoutes();
          isRoutesLoaded = true;
          // 优化：确认为异步挂载，使用 replace 避免 history 混乱
          next({ ...to, replace: true });
        } catch (error) {
          console.error("Dynamic routes load failed", error);
          // 优化：错误时清除 Token 并回到登录页
          next({ path: "/login" });
          NProgress.done();
        }
      } else {
        next();
      }
    }
  } else {
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
