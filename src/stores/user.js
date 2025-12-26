import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { storage } from "@/utils/storage";
import { getToken as getTokenFromAuth, setToken as setTokenToAuth, removeToken } from "@/utils/auth";
import { useMenuStore } from "@/stores/menu";
import { resetRouterState } from "@/router/origin/index";
import { login, getUserInfo } from "@/api/origin/system/user";

export const useUserStore = defineStore("user", () => {
  // 用户信息
  const userInfo = ref(storage.get("userInfo", null));

  // Token - 使用 auth.js 的 getToken 保持一致
  const token = ref(getTokenFromAuth() || "");

  // 是否已登录
  const isLoggedIn = computed(() => !!token.value);

  /**
   * 设置用户信息
   */
  const setUserInfo = (info) => {
    userInfo.value = info;
    storage.set("userInfo", info);
  };

  /**
   * 设置 Token - 使用 auth.js 的 setToken 保持一致
   */
  const setToken = (newToken) => {
    token.value = newToken;
    setTokenToAuth(newToken);
  };

  /**
   * 登录
   */
  const userLogin = async (loginData) => {
    try {
      const res = await login(loginData);
      if (res.code === 200) {
        // 使用 setToken 方法，确保与 auth.js 保持一致
        setToken(res.data.token);
        // 如果返回了用户信息，也保存
        if (res.data.userInfo) {
          setUserInfo(res.data.userInfo);
        }
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  /**
   * 获取用户信息
   */
  const getUserInfoAction = async () => {
    try {
      // 如果已经有用户信息，直接返回
      if (userInfo.value) {
        return Promise.resolve({
          code: 200,
          data: {
            userInfo: userInfo.value,
          },
        });
      }

      // 否则调用真实 API
      const res = await getUserInfo();
      if (res.code === 200) {
        if (res.data.userInfo) {
          setUserInfo(res.data.userInfo);
        }
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    } catch (error) {
      // 如果 API 调用失败，但已有 token，使用默认数据
      if (token.value && !userInfo.value) {
        const defaultUser = {
          username: "user",
          avatar: "",
        };
        setUserInfo(defaultUser);
        return Promise.resolve({
          code: 200,
          data: {
            userInfo: defaultUser,
          },
        });
      }
      return Promise.reject(error);
    }
  };

  /**
   * 退出登录
   */
  const logout = () => {
    try {
      // 清除所有用户相关数据
      userInfo.value = null;
      token.value = "";
      storage.remove("userInfo");
      removeToken(); // 使用 auth.js 的 removeToken

      // 清除菜单和动态路由状态
      const menuStore = useMenuStore();
      menuStore.setMenuList([]);
      menuStore.removeAllDynamicRoutes();

      // 重置路由状态
      setTimeout(() => {
        try {
          resetRouterState();
        } catch (error) {
          console.warn("路由状态重置失败:", error);
        }
      }, 0);
    } catch (error) {
      console.error("退出登录失败:", error);
    }
  };

  return {
    userInfo,
    token,
    isLoggedIn,
    setUserInfo,
    setToken,
    userLogin,
    getUserInfoAction,
    logout,
  };
});
