import { defineStore } from "pinia";
import { ref, computed } from "vue";

/**
 * 菜单状态管理
 * 管理应用的菜单列表、首页路径和动态路由
 */
export const useMenuStore = defineStore("menu", () => {
  /** 菜单列表 */
  const menuList = ref([]);
  /** 顶部导航列表 */
  const topNavList = ref([]);
  /** 当前选中的顶部导航 */
  const activeTopNav = ref("");
  /** 首页路径 */
  const homePath = ref("/dashboard");
  /** 存储路由移除函数的数组 */
  const removeRouteFns = ref([]);

  /**
   * 设置顶部导航列表
   * @param {Array} list 顶部导航数组
   */
  const setTopNavList = (list) => {
    topNavList.value = list;
    // 如果没有设置当前激活的顶部导航，设置第一个
    if (list.length > 0 && !activeTopNav.value) {
      activeTopNav.value = list[0].key;
    }
  };

  /**
   * 设置当前激活的顶部导航
   * @param {Number} key 顶部导航的 key (0-5)
   */
  const setActiveTopNav = (key) => {
    activeTopNav.value = key;
  };

  /**
   * 获取当前顶部导航的菜单列表
   * @returns {Array} 当前顶部导航对应的菜单列表
   */
  const getCurrentTopNavMenus = computed(() => {
    if (activeTopNav.value === undefined || activeTopNav.value === null)
      return [];
    return menuList.value.filter(
      (menu) => menu.meta?.topNav === activeTopNav.value
    );
  });

  /**
   * 设置菜单列表
   * @param {Array} list 菜单路由记录数组
   */
  const setMenuList = (list) => {
    menuList.value = list;
    // 如果有菜单，设置第一个菜单为首页路径
    if (list.length > 0) {
      const firstMenu = getFirstMenuPath(list);
      if (firstMenu) {
        homePath.value = firstMenu;
      }
    }
  };

  /**
   * 获取第一个有效菜单路径
   * @param {Array} list 菜单列表
   * @returns {String} 第一个菜单路径
   */
  const getFirstMenuPath = (list) => {
    for (const item of list) {
      if (item.meta?.isHide) {
        continue;
      }
      // 如果有子菜单，递归查找第一个子菜单
      if (item.children && item.children.length > 0) {
        const childPath = getFirstMenuPath(item.children);
        if (childPath) {
          return childPath;
        }
      }
      // 如果有组件，说明是有效路由
      if (item.component || item.path) {
        return item.path;
      }
    }
    return null;
  };

  /**
   * 获取首页路径
   * @returns {String} 首页路径
   */
  const getHomePath = () => {
    return homePath.value;
  };

  /**
   * 设置主页路径
   * @param {String} path 主页路径
   */
  const setHomePath = (path) => {
    homePath.value = path;
  };

  /**
   * 添加路由移除函数
   * @param {Array} fns 要添加的路由移除函数数组
   */
  const addRemoveRouteFns = (fns) => {
    removeRouteFns.value.push(...fns);
  };

  /**
   * 移除所有动态路由
   * 执行所有存储的路由移除函数并清空数组
   */
  const removeAllDynamicRoutes = () => {
    removeRouteFns.value.forEach((fn) => fn());
    removeRouteFns.value = [];
  };

  /**
   * 清空路由移除函数数组
   */
  const clearRemoveRouteFns = () => {
    removeRouteFns.value = [];
  };

  /**
   * 获取当前菜单层级结构
   * @returns {Array} 层级化的菜单数据
   */
  const getMenuHierarchy = () => {
    return menuList.value.map((item) => {
      const menuItem = {
        ...item,
        children: [],
      };

      // 处理子菜单
      if (item.children && item.children.length > 0) {
        menuItem.children = item.children.map((child) => {
          // 确保子菜单路径正确拼接
          let childPath = child.path;
          if (!child.path.startsWith("/")) {
            const parentPath = item.path.startsWith("/")
              ? item.path.slice(1)
              : item.path;
            childPath = `/${parentPath}/${child.path}`;
          }

          return {
            ...child,
            path: childPath,
          };
        });
      }

      return menuItem;
    });
  };

  /**
   * 根据路径查找菜单项
   * @param {String} path 路径
   * @returns {Object|null} 菜单项
   */
  const findMenuItemByPath = (path) => {
    const findInMenu = (items, targetPath) => {
      for (const item of items) {
        // 检查当前项
        if (item.path === targetPath) {
          return item;
        }

        // 检查子项
        if (item.children && item.children.length > 0) {
          const found = findInMenu(item.children, targetPath);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };

    return findInMenu(menuList.value, path);
  };

  /**
   * 获取面包屑导航数据
   * @param {String} currentPath 当前路径
   * @returns {Array} 面包屑数据
   */
  const getBreadcrumbData = (currentPath) => {
    const breadcrumbs = [];

    // 1. 递归查找从根到目标节点的路径
    const findPath = (items, targetPath, pathNodes = []) => {
      for (const item of items) {
        const currentNodes = [...pathNodes, item];
        if (item.path === targetPath) return currentNodes;
        if (item.children && item.children.length > 0) {
          const found = findPath(item.children, targetPath, currentNodes);
          if (found) return found;
        }
      }
      return null;
    };

    const pathNodes = findPath(menuList.value, currentPath);

    if (pathNodes && pathNodes.length > 0) {
      pathNodes.forEach((node) => {
        const title = node.meta?.title || node.name;
        const titleKey = node.meta?.titleKey;

        // 去重逻辑：仅处理相邻重复层级
        if (
          breadcrumbs.length > 0 &&
          (breadcrumbs[breadcrumbs.length - 1].title === title ||
            (titleKey &&
              breadcrumbs[breadcrumbs.length - 1].titleKey === titleKey))
        ) {
          return;
        }

        breadcrumbs.push({
          title,
          titleKey,
          path: node.path,
        });
      });
    }

    // 只要经过处理后的面包屑具备多级属性，就展示（不再检查 topNode 子项数量）
    return breadcrumbs.length > 1 ? breadcrumbs : [];
  };

  return {
    menuList,
    topNavList,
    activeTopNav,
    homePath,
    removeRouteFns,
    setTopNavList,
    setActiveTopNav,
    getCurrentTopNavMenus,
    setMenuList,
    getHomePath,
    setHomePath,
    addRemoveRouteFns,
    removeAllDynamicRoutes,
    clearRemoveRouteFns,
    getMenuHierarchy,
    findMenuItemByPath,
    getBreadcrumbData,
  };
});
