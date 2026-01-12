<template>
  <div class="flex items-center">
    <div class="w-32 text-sm text-gray-600 dark:text-gray-400 font-medium">
      {{ item.label }}
    </div>
    <div
      class="flex-1 ml-4 relative h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden border border-gray-200 dark:border-gray-600"
    >
      <!-- Text Layer -->
      <div
        class="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-200 z-10"
      >
        {{ item.value }} / {{ item.total }} ({{ item.percent }}%)
      </div>
      <!-- Bar Layer -->
      <div
        class="h-full transition-all duration-500"
        :class="item.colorClass"
        :style="{ width: item.percent + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompUsageBar',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({
        label: '',
        value: '',
        total: '',
        percent: 0,
        colorClass: 'bg-primary-500',
      }),
    },
  },
}
</script>
