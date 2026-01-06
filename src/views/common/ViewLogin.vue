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
          <CompBaseInput
            v-model="formData.username"
            :label="$t('login.username')"
            :placeholder="$t('login.usernamePlaceholder')"
            :error="errors.username"
            autocomplete="off"
            @blur="validateField('username')"
          />

          <CompBaseInput
            v-model="formData.password"
            :label="$t('login.password')"
            type="password"
            :placeholder="$t('login.passwordPlaceholder')"
            :error="errors.password"
            autocomplete="new-password"
            @blur="validateField('password')"
          />

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

          <CompBaseButton type="primary" native-type="submit" :loading="loading" class="w-full">
            {{ loading ? $t('login.loggingIn') : $t('login.login') }}
          </CompBaseButton>
        </form>

        <!-- 测试账号快速填充 -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">
            {{ $t('login.testAccounts') }}
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
                {{ $t(account.labelKey) }}
              </div>
              <div class="text-gray-500 dark:text-gray-400 mt-0.5">
                {{ $t(account.descKey) }}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import Schema from 'async-validator'
import { useUserStore } from '@/stores/user'
import { validators } from '@/utils/validators'
import { storage } from '@/utils/storage'

export default {
  name: 'ViewLogin',
  data() {
    return {
      loading: false,
      formData: {
        username: '',
        password: '',
        remember: false,
      },
      errors: {
        username: '',
        password: '',
      },
      testAccounts: [
        {
          username: 'admin',
          password: '123456Aa',
          labelKey: 'login.testAccountLabels.admin',
          descKey: 'login.testAccountLabels.adminDesc',
        },
        {
          username: 'network_admin',
          password: '123456Aa',
          labelKey: 'login.testAccountLabels.networkAdmin',
          descKey: 'login.testAccountLabels.networkAdminDesc',
        },
        {
          username: 'system_admin',
          password: '123456Aa',
          labelKey: 'login.testAccountLabels.systemAdmin',
          descKey: 'login.testAccountLabels.systemAdminDesc',
        },
        {
          username: 'user',
          password: '123456Aa',
          labelKey: 'login.testAccountLabels.user',
          descKey: 'login.testAccountLabels.userDesc',
        },
      ],
      // 定义验证规则
      rules: {
        username: [
          validators.required(this.$t('login.rules.usernameRequired')),
          validators.minLength(4, this.$t('login.rules.usernameMin')),
        ],
        password: [
          validators.required(this.$t('login.rules.passwordRequired')),
          validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            this.$t('login.rules.passwordPattern'),
          ),
          validators.minLength(8, this.$t('login.rules.passwordMin')),
        ],
      },
    }
  },
  computed: {
    ...mapStores(useUserStore),
  },
  mounted() {
    this.initPage()
  },
  methods: {
    initPage() {
      const loginInfo = storage.get('login_info')
      if (loginInfo) {
        this.formData.username = loginInfo.username
        this.formData.password = loginInfo.password ? window.atob(loginInfo.password) : ''
        this.formData.remember = true
      }
    },
    fillAccount(account) {
      this.formData.username = account.username
      this.formData.password = account.password
      // 填充后自动清除错误提示
      this.errors.username = ''
      this.errors.password = ''
    },
    async validateField(field) {
      const descriptor = { [field]: this.rules[field] }
      const validator = new Schema(descriptor)

      try {
        await validator.validate({ [field]: this.formData[field] })
        this.errors[field] = ''
        return true
      } catch ({ errors }) {
        if (errors && errors[0]) {
          this.errors[field] = errors[0].message
        }
        return false
      }
    },
    async validate() {
      const validator = new Schema(this.rules)

      // 重置错误
      this.errors = { username: '', password: '' }

      try {
        await validator.validate(this.formData)
        return true
      } catch ({ errors }) {
        if (errors) {
          errors.forEach((error) => {
            this.errors[error.field] = error.message
          })
        }
        return false
      }
    },
    async handleLogin() {
      if (this.loading) return

      const isValid = await this.validate()
      if (!isValid) return

      this.loading = true
      try {
        // 注意：mapStores 映射后，store 实例名为 userStore (storeId + 'Store')
        const res = await this.userStore.login(this.formData)
        if (res && res.code === 200) {
          // 处理记住密码
          if (this.formData.remember) {
            storage.set('login_info', {
              username: this.formData.username,
              password: window.btoa(this.formData.password),
            })
          } else {
            storage.remove('login_info')
          }
          this.$router.push('/')
        }
      } catch (error) {
        console.error('Login error:', error)
        this.$toast.error(error.message || this.$t('login.toast.fail'))
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
