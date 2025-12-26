<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="w-full max-w-md">
      <!-- Logo and Title -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {{ $t('login.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ $t('login.subtitle') }}
        </p>
      </div>

      <!-- Login Form Card -->
      <div class="card p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username -->
          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('login.username') }}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <UserIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                id="username"
                v-model="formData.username"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :placeholder="$t('login.usernamePlaceholder')"
                required
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('login.password') }}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <LockClosedIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                id="password"
                v-model="formData.password"
                type="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :placeholder="$t('login.passwordPlaceholder')"
                required
              />
            </div>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember"
                v-model="formData.remember"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {{ $t('login.remember') }}
              </label>
            </div>
            <a href="#" class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">
              {{ $t('login.forgot') }}
            </a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="inline-flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ $t('login.login') }}
            </span>
            <span v-else>{{ $t('login.login') }}</span>
          </button>
        </form>

        <!-- Language Switcher -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-center space-x-4">
            <button
              @click="switchLanguage('zh-CN')"
              :class="[
                'px-3 py-1 rounded text-sm transition-colors',
                locale === 'zh-CN'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              ]"
            >
              中文
            </button>
            <button
              @click="switchLanguage('en-US')"
              :class="[
                'px-3 py-1 rounded text-sm transition-colors',
                locale === 'en-US'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              ]"
            >
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useToast } from '@/composables/useToast'
import { UserIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const { locale } = useI18n()
const userStore = useUserStore()
const toast = useToast()

const loading = ref(false)
const formData = ref({
  username: '',
  password: '',
  remember: false
})

const handleLogin = async () => {
  loading.value = true

  try {
    // 调用登录 API
    const res = await userStore.userLogin({
      username: formData.value.username,
      password: formData.value.password
    })

    if (res.code === 200) {
      // 跳转到首页，路由守卫会自动加载动态路由
      router.push('/dashboard')
    } else {
      toast.error(res.message || '登录失败')
    }
  } catch (error) {
    console.error('Login error:', error)
    toast.error(error.message || '登录失败，请检查网络连接')
  } finally {
    loading.value = false
  }
}

const switchLanguage = (lang) => {
  locale.value = lang
}
</script>
