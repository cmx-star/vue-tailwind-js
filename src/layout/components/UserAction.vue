<template>
  <div ref="userDropdownRef" class="relative">
    <button
      ref="triggerRef"
      class="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-8 h-8 md:w-auto md:h-auto flex items-center justify-center"
      @click="toggleUserDropdown"
    >
      <img
        :src="userInfo?.avatar || 'https://ui-avatars.com/api/?name=User'"
        alt="Avatar"
        class="w-5 h-5 md:w-6 md:h-6 rounded-full"
      />
    </button>
    <div
      v-show="showUserDropdown"
      ref="dropdownRef"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
    >
      <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
          {{ userInfo?.nickname || userInfo?.username || '未登录用户' }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
          {{ userInfo?.email || '暂无邮箱信息' }}
        </p>
      </div>
      <button
        class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
        @click="handleLogout"
      >
        {{ $t('settings.logout') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { onClickOutside } from '@vueuse/core'

const router = useRouter()
const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)
const showUserDropdown = ref(false)
const userDropdownRef = ref(null)
const triggerRef = ref(null)
const dropdownRef = ref(null)

const toggleUserDropdown = () => {
  showUserDropdown.value = !showUserDropdown.value
}

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}

// 使用 @vueuse/core 的 onClickOutside 优化点击外部关闭逻辑
onClickOutside(
  dropdownRef,
  () => {
    showUserDropdown.value = false
  },
  {
    ignore: [triggerRef],
  },
)
</script>
