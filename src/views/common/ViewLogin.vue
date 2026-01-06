<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {{ $t('login.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ $t('login.subtitle') }}
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('login.username') }}
            </label>
            <input
              v-model="formData.username"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="errors.username ? 'border-red-500 ring-1 ring-red-500' : ''"
              :placeholder="$t('login.usernamePlaceholder')"
            />
            <p v-if="errors.username" class="mt-1 text-xs text-red-500">
              {{ errors.username }}
            </p>
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('login.password') }}
            </label>
            <input
              v-model="formData.password"
              type="password"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="errors.password ? 'border-red-500 ring-1 ring-red-500' : ''"
              :placeholder="$t('login.passwordPlaceholder')"
            />
            <p v-if="errors.password" class="mt-1 text-xs text-red-500">
              {{ errors.password }}
            </p>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="formData.remember"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {{ $t('login.remember') }}
              </span>
            </label>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
              {{ $t('login.forgot') }}
            </a>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">登录中...</span>
            <span v-else>{{ $t('login.login') }}</span>
          </button>
        </form>

        <!-- 测试账号快速填充 -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">
            测试账号 (点击自动填充)
          </p>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="account in testAccounts"
              :key="account.username"
              type="button"
              class="px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
              @click="fillAccount(account)"
            >
              <div class="font-medium text-gray-900 dark:text-white">
                {{ account.label }}
              </div>
              <div class="text-gray-500 dark:text-gray-400 mt-0.5">
                {{ account.description }}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useFormValidation } from '@/composables/useFormValidation'
import { validators } from '@/utils/validators'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const formData = reactive({
  username: 'admin',
  password: 'password',
  remember: false,
})

const { rules, validate, errors } = useFormValidation(formData)
rules.value = {
  username: [validators.required('请输入用户名')],
  password: [validators.required('请输入密码')],
}

const testAccounts = [
  {
    username: 'admin',
    password: 'password',
    label: '超级管理员',
    description: '所有菜单权限',
  },
  {
    username: 'network_admin',
    password: 'password',
    label: '网络管理员',
    description: '概览+网络+VPN',
  },
  {
    username: 'system_admin',
    password: 'password',
    label: '系统管理员',
    description: '概览+系统',
  },
  {
    username: 'user',
    password: 'password',
    label: '普通用户',
    description: '仅概览',
  },
]

const fillAccount = (account) => {
  formData.username = account.username
  formData.password = account.password
}

const handleLogin = async () => {
  if (loading.value) return

  const isValid = await validate()
  if (!isValid) return

  loading.value = true
  try {
    const res = await userStore.login(formData)
    if (res && res.code === 200) {
      router.push('/')
    }
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}
</script>
