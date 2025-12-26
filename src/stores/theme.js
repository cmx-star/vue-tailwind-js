import { defineStore } from "pinia";
import { ref } from "vue";
import { storage } from "@/utils/storage";

export const useThemeStore = defineStore("theme", () => {
  // 主题色 (blue, green, purple, orange)
  const themeColor = ref(storage.get("themeColor", "blue"));

  // 暗色模式 - 确保是布尔值
  const getIsDarkValue = () => {
    const stored = storage.get("isDark");
    // 如果存储中有值，使用存储的值
    if (stored !== null && stored !== undefined) {
      // 处理可能的字符串值
      if (typeof stored === "string") {
        return stored === "true";
      }
      return Boolean(stored);
    }
    // 如果没有存储值，检查系统偏好
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  };
  const isDark = ref(getIsDarkValue());

  /**
   * 设置主题色
   */
  const setThemeColor = (color) => {
    themeColor.value = color;
    storage.set("themeColor", color);
    applyTheme();
  };

  /**
   * 切换暗色模式
   */
  const toggleDark = () => {
    isDark.value = !isDark.value;
    storage.set("isDark", isDark.value);
    applyTheme();
  };

  /**
   * 设置暗色模式
   */
  const setDark = (dark) => {
    isDark.value = dark;
    storage.set("isDark", dark);
    applyTheme();
  };

  /**
   * 应用主题
   */
  const applyTheme = () => {
    const html = document.documentElement;

    // 应用暗色模式
    if (isDark.value) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    // 应用主题色
    html.setAttribute("data-theme", themeColor.value);
  };

  /**
   * 初始化主题
   */
  const initTheme = () => {
    // 确保初始状态正确
    const currentValue = getIsDarkValue();
    if (isDark.value !== currentValue) {
      isDark.value = currentValue;
    }
    applyTheme();
    
    // 监听系统主题变化（如果用户没有手动设置）
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        // 只有在用户没有手动设置时才跟随系统
        const stored = storage.get("isDark");
        if (stored === null || stored === undefined) {
          isDark.value = e.matches;
          applyTheme();
        }
      };
      // 使用 addEventListener 而不是 addListener（更现代的方式）
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
      } else {
        // 兼容旧浏览器
        mediaQuery.addListener(handleChange);
      }
    }
  };

  return {
    themeColor,
    isDark,
    setThemeColor,
    toggleDark,
    setDark,
    initTheme,
  };
});
