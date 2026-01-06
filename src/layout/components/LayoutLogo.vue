<template>
  <div class="flex items-center gap-3">
    <div
      class="w-10 h-10 flex items-center justify-center rounded-lg text-white text-lg font-bold flex-shrink-0"
      style="background-color: var(--color-primary-600)"
    >
      {{ $t('layout.appNameShort') }}
    </div>
    <h1 class="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
      {{ $t('layout.appName') }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'LayoutLogo',
}
</script>

<style scoped>
/* 暗黑模式下的文字颜色 */
.dark h1 {
  color: var(--color-primary-400) !important;
}
</style>
