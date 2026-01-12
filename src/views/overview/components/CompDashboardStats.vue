<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <CompCard
      v-for="stat in stats"
      :key="stat.title"
      class="border-l-4 hover:shadow-md transition-all shadow-none"
      :class="stat.borderColor"
    >
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {{ stat.title }}
          </p>
          <p class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ stat.value }}
          </p>
          <div class="flex items-center mt-2">
            <span
              class="text-xs font-medium"
              :class="stat.trend > 0 ? 'text-green-600' : 'text-red-600'"
            >
              {{ stat.trend > 0 ? '↑' : '↓' }} {{ Math.abs(stat.trend) }}%
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">{{
              $t('overview.dashboard.comparedToLastMonth')
            }}</span>
          </div>
        </div>
        <div
          class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
          :class="stat.bgColor"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon" />
          </svg>
        </div>
      </div>
    </CompCard>
  </div>
</template>

<script>
export default {
  name: 'CompDashboardStats',
  components: {},
  props: {
    stats: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>
