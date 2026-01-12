<template>
  <button
    class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
  >
    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="action.icon" />
    </svg>
    {{ action.label }}
  </button>
</template>

<script>
export default {
  name: 'CompDashboardQuickActionItem',
  props: {
    action: {
      type: Object,
      required: true,
      default: () => ({
        label: '',
        icon: '',
      }),
    },
  },
}
</script>
