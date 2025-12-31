<template>
  <div class="relative" v-click-outside="closeDropdown">
    <button
      @click="toggleDropdown"
      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      :title="$t('language.title')"
    >
      <svg
        class="w-5 h-5 text-gray-600 dark:text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
    </button>

    <!-- 下拉菜单 -->
    <div
      v-show="showDropdown"
      class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
    >
      <button
        v-for="lang in languages"
        :key="lang.value"
        @click="switchLanguage(lang.value)"
        class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        :class="
          currentLocale === lang.value
            ? 'text-blue-600 dark:text-blue-400 font-medium'
            : 'text-gray-700 dark:text-gray-300'
        "
      >
        {{ lang.label }}
      </button>
    </div>
  </div>
</template>

<script>
import { storage } from "@/utils/storage";

export default {
  name: "LanguageSwitcher",
  data() {
    return {
      showDropdown: false,
      languages: [
        { value: "zh-CN", label: "中文" },
        { value: "en-US", label: "English" },
      ],
    };
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      this.showDropdown = false;
    },
    switchLanguage(locale) {
      this.$i18n.locale = locale;
      storage.set("locale", locale);
      this.closeDropdown();
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

