<template>
  <div class="relative" v-click-outside="closeUserDropdown">
    <button
      @click="toggleUserDropdown"
      class="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
    >
      <Avatar
        name="Admin"
        :size="24"
        backgroundColor="#0D8ABC"
        textColor="#ffffff"
      />
      <span
        class="text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:block"
        >管理员</span
      >
    </button>
    <div
      v-show="showUserDropdown"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <p class="text-sm font-medium text-gray-900 dark:text-white">Admin</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          admin@example.com
        </p>
      </div>
      <button
        @click="handleLogout"
        class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 flex items-center gap-2"
      >
        <Icon name="sign-out-alt" :size="16" class="w-4 h-4" />
        退出登录
      </button>
    </div>
  </div>
</template>

<script>
import { removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
import Avatar from "@/components/Avatar/Avatar.vue";
import Icon from "@/components/Icon/Icon.vue";

export default {
  name: "UserAction",
  components: {
    Avatar,
    Icon,
  },
  data() {
    return {
      showUserDropdown: false,
    };
  },
  methods: {
    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown;
    },
    closeUserDropdown() {
      this.showUserDropdown = false;
    },
    handleLogout() {
      removeToken();
      resetRouter();
      this.$router.push("/login");
    },
  },
  directives: {
    "click-outside": {
      bind(el, binding) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
};
</script>
