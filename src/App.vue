<template>
  <router-view />
</template>

<script>
import { useThemeStore } from '@/stores/theme'
import { mapStores } from 'pinia'

export default {
  name: 'App',
  computed: {
    ...mapStores(useThemeStore),
  },
  mounted() {
    // 初始化主题
    this.themeStore.initTheme()
  },
}
</script>
