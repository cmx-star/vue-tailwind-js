<template>
  <div class="CompBasicInformation w-full">
    <div :class="['grid gap-6', gridClass]">
      <div
        v-for="item in dataList"
        :key="item.key || item.label"
        class="flex flex-col space-y-1.5 transition-all duration-200"
        :style="item.width ? { width: item.width } : {}"
      >
        <!-- Label -->
        <span
          class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center"
        >
          <slot name="label" :item="item">
            {{ item.label || item.key
            }}<template v-if="(item.label || item.key) && !(item.label || item.key).endsWith(':')"
              >:</template
            >
          </slot>
        </span>

        <!-- Value -->
        <div
          class="text-base font-semibold text-gray-900 dark:text-white wrap-break-word min-h-[1.5rem] flex items-center"
        >
          <slot v-if="item.slot" :name="item.slot" :prop="item"></slot>
          <template v-else>
            {{ item.isTime ? formatDtDHS(item.value) : item.value || '- -' }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDtDHS } from '@/utils/network'

export default {
  name: 'CompBasicInformation',
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Number,
      default: 3,
      validator: (value) => [1, 2, 3, 4].includes(value),
    },
  },
  computed: {
    gridClass() {
      const cols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      }
      return cols[this.columns] || cols[3]
    },
  },
  methods: {
    formatDtDHS,
  },
}
</script>

<style scoped>
.CompBasicInformation {
  /* 可以添加一些特定的微调样式 */
}
</style>
