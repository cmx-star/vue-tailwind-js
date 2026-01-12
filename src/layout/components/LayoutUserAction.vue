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
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
    >
      <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
          {{ userInfo?.nickname || userInfo?.username || $t('layout.user.notLoggedIn') }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
          {{ userInfo?.email || $t('layout.user.noEmail') }}
        </p>
      </div>
      <button
        class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
        @click="handleLogout"
      >
        {{ $t('layout.user.logoutButton') }}
      </button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  name: 'LayoutUserAction',
  data() {
    return {
      showUserDropdown: false,
    }
  },
  computed: {
    userInfo() {
      const userStore = useUserStore()
      return userStore.userInfo
    },
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    handleOutsideClick(event) {
      if (
        this.showUserDropdown &&
        this.$refs.userDropdownRef &&
        !this.$refs.userDropdownRef.contains(event.target)
      ) {
        this.showUserDropdown = false
      }
    },
    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown
    },
    async handleLogout() {
      const isConfirmed = await this.$modal.confirm({
        title: this.$t('layout.user.confirmLogout'),
        content: this.$t('layout.user.confirmLogoutMessage'),
        confirmText: this.$t('layout.user.logoutButton'),
      })

      if (isConfirmed) {
        const userStore = useUserStore()
        userStore.logout()
        this.$router.push('/login')
      }
    },
  },
}
</script>
