<template>
  <div class="flex items-center gap-3 px-4" :class="collapsed ? 'w-16' : 'w-64'">
    <div
      class="w-10 h-10 flex items-center justify-center rounded-lg text-white text-lg font-bold flex-shrink-0"
      style="background-color: var(--color-primary-600, #2563eb)"
    >
      后
    </div>
    <h1
      v-if="!collapsed"
      class="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap hidden md:block"
    >
      后台管理
    </h1>
  </div>
</template>

<script>
export default {
  name: "Logo",
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.dark h1 {
  color: var(--color-primary-400, #60a5fa) !important;
}
</style>
