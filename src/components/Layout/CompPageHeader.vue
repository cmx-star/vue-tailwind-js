<template>
  <div
    class="page-header-container rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6"
  >
    <h1 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
      <slot name="title">{{ title }}</slot>
    </h1>
    <p v-if="description || $slots.description" class="text-gray-500 dark:text-gray-400 text-sm">
      <slot name="description">{{ description }}</slot>
    </p>
  </div>
</template>

<script>
/**
 * @desc: 页面标题组件 - 统一的页面标题和描述展示
 * @author: Antigravity
 */

export default {
  name: 'CompPageHeader',
  props: {
    // 页面标题
    title: {
      type: String,
      default: '',
    },
    // 页面描述
    description: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.page-header-container {
  background-color: var(--color-bg-card);
}
</style>
