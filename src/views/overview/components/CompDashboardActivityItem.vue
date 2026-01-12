<template>
  <div class="flex items-start space-x-3">
    <div
      class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
      :class="activity.bgColor"
    >
      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="activity.icon" />
      </svg>
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-gray-900 dark:text-white">
        {{ activity.title }}
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {{ activity.time }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompDashboardActivityItem',
  props: {
    activity: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        time: '',
        bgColor: '',
        icon: '',
      }),
    },
  },
}
</script>
