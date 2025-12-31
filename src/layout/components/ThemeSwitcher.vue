<template>
  <div class="relative" v-click-outside="closeDropdown">
    <button
      @click="toggleDropdown"
      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      :title="$t('theme.title')"
    >
      <svg
        v-if="!isDark"
        class="w-5 h-5 text-gray-600 dark:text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
      <svg
        v-else
        class="w-5 h-5 text-gray-600 dark:text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </button>

    <!-- 下拉菜单 -->
    <div
      v-show="showDropdown"
      class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
    >
      <!-- 明暗模式切换 -->
      <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ $t("theme.dark") }}
          </span>
          <button
            @click="toggleDark"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :class="isDark ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              :class="isDark ? 'translate-x-6' : 'translate-x-1'"
            />
          </button>
        </div>
      </div>

      <!-- 主题样式选择 -->
      <div class="px-4 py-2">
        <div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
          {{ $t("theme.themes.default") }}
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="theme in themes"
            :key="theme.value"
            @click="setTheme(theme.value)"
            class="px-3 py-2 text-sm rounded-lg border-2 transition-all font-medium"
            :class="
              themeStyle === theme.value
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm'
                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            "
          >
            {{ $t(`theme.themes.${theme.value}`) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ThemeSwitcher",
  data() {
    return {
      showDropdown: false,
      themes: [
        { value: "default", label: "默认" },
        { value: "minimal", label: "简约" },
        { value: "enterprise", label: "企业" },
        { value: "playful", label: "活泼" },
        { value: "mono", label: "单色" },
      ],
    };
  },
  computed: {
    ...mapState("theme", ["isDark", "themeStyle"]),
  },
  methods: {
    ...mapActions("theme", ["toggleDark", "setThemeStyle"]),
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      this.showDropdown = false;
    },
    setTheme(theme) {
      this.setThemeStyle(theme);
    },
  },
  directives: {
    "click-outside": {
      bind(el, binding) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value();
          }
        };
        document.addEventListener("click", el.clickOutsideEvent);
      },
      unbind(el) {
        document.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
};
</script>

