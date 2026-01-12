<template>
  <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
      {{ title }}
    </h2>
  </div>
</template>

<script>
export default {
  name: 'CompSectionHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
