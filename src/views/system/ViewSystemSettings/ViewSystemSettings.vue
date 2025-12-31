<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        系统设置
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        全局参数配置与系统优化
      </p>
    </div>

    <div class="space-y-6">
      <!-- 外观设置 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <i class="fas fa-palette text-blue-600 dark:text-blue-400"></i>
          外观设置
        </h2>

        <div class="space-y-6">
          <!-- 明暗模式 -->
          <div class="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex-1">
              <h3 class="text-base font-medium text-gray-900 dark:text-white mb-1">
                暗色模式
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                切换系统的明暗主题
              </p>
            </div>
            <button
              @click="toggleDark"
              class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              :class="isDark ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'"
            >
              <span
                class="inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-lg"
                :class="isDark ? 'translate-x-6' : 'translate-x-1'"
              />
            </button>
          </div>

          <!-- 主题样式 -->
          <div class="py-4">
            <h3 class="text-base font-medium text-gray-900 dark:text-white mb-3">
              主题样式
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              选择您喜欢的主题配色方案
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <button
                v-for="theme in themes"
                :key="theme.value"
                @click="setTheme(theme.value)"
                class="px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm"
                :class="
                  themeStyle === theme.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                "
              >
                {{ theme.label }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 语言设置 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <i class="fas fa-language text-blue-600 dark:text-blue-400"></i>
          语言设置
        </h2>

        <div class="py-4">
          <h3 class="text-base font-medium text-gray-900 dark:text-white mb-3">
            界面语言
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            选择系统显示语言
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
            <button
              v-for="lang in languages"
              :key="lang.value"
              @click="switchLanguage(lang.value)"
              class="px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm text-left"
              :class="
                currentLocale === lang.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm'
                  : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              "
            >
              <div class="flex items-center gap-2">
                <i class="fas fa-check-circle" v-if="currentLocale === lang.value"></i>
                <span>{{ lang.label }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- 常规配置 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <i class="fas fa-cog text-blue-600 dark:text-blue-400"></i>
          常规配置
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          系统标题、Logo 及域名映射设置...
        </p>
      </div>

      <!-- 安全选项 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <i class="fas fa-shield-halved text-blue-600 dark:text-blue-400"></i>
          安全选项
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          IP 白名单、访问控制及审计频率...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { storage } from "@/utils/storage";

export default {
  name: "ViewSystemSettings",
  data() {
    return {
      themes: [
        { value: "default", label: "默认" },
        { value: "minimal", label: "简约" },
        { value: "enterprise", label: "企业" },
        { value: "playful", label: "活泼" },
        { value: "mono", label: "单色" },
      ],
      languages: [
        { value: "zh-CN", label: "中文" },
        { value: "en-US", label: "English" },
      ],
    };
  },
  computed: {
    ...mapState("theme", ["isDark", "themeStyle"]),
    currentLocale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    ...mapActions("theme", ["toggleDark", "setThemeStyle"]),
    setTheme(theme) {
      this.setThemeStyle(theme);
    },
    switchLanguage(locale) {
      this.$i18n.locale = locale;
      storage.set("locale", locale);
    },
  },
};
</script>
