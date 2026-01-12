<template>
  <div class="grid grid-cols-1 gap-4">
    <div
      v-for="(item, index) in dataList"
      :key="index"
      class="flex p-4 border-b border-gray-100 dark:border-gray-800 last:border-0 items-center"
    >
      <div class="w-48 font-medium text-gray-700 dark:text-gray-300">
        {{ item.label }}
      </div>
      <div class="flex-1 text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
        <slot name="content" :item="item">
          {{ item.value }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompDescriptionList',
  props: {
    dataList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>
