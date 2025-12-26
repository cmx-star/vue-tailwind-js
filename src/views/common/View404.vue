<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>
      <p class="text-2xl font-semibold text-gray-900 dark:text-white mt-4">
        {{ $t('common.pageNotFound') }}
      </p>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        {{ $t('common.pageNotFoundDesc') }}
      </p>
      <button
        class="mt-8 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        @click="$router.push('/dashboard')"
      >
        {{ $t('common.backHome') }}
      </button>
    </div>
  </div>
</template>

<script setup>
</script>
