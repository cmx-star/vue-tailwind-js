<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {{ $t("login.title") }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ $t("login.subtitle") }}
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {{ $t("login.username") }}
            </label>
            <input
              v-model="formData.username"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :placeholder="$t('login.usernamePlaceholder')"
              required
            />
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {{ $t("login.password") }}
            </label>
            <input
              v-model="formData.password"
              type="password"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :placeholder="$t('login.passwordPlaceholder')"
              required
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="formData.remember"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {{ $t("login.remember") }}
              </span>
            </label>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
              {{ $t("login.forgot") }}
            </a>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">登录中...</span>
            <span v-else>{{ $t("login.login") }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/origin";
import { setToken } from "@/utils/auth";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      formData: {
        username: "admin",
        password: "password",
        remember: false,
      },
    };
  },
  methods: {
    async handleLogin() {
      if (this.loading) return;
      this.loading = true;
      try {
        console.log("Starting login with:", this.formData.username);
        const res = await login(this.formData);
        console.log("Login response:", res);
        
        if (res && res.code === 200) {
          setToken(res.data.token);
          // 跳转到首页
          this.$router.push("/").catch((err) => {
            // Vue Router 3.1.0+ push/replace 会返回 Promise，需要捕获重定向异常
            if (err && err.name !== "NavigationDuplicated" && !err.message.includes("Redirected")) {
              console.error("Navigation error:", err);
            }
          });
        } else {
          console.error("Login failed: Invalid code", res);
        }
      } catch (error) {
        console.error("Login API error:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

