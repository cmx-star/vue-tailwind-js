<template>
  <div class="card-container rounded-lg border shadow-sm p-6">
    <!-- 标题 -->
    <h3 v-if="title" class="card-title text-lg font-semibold mb-4">{{ title }}</h3>

    <!-- 内容 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CompCard',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.card-container {
  background-color: var(--color-bg-card);
  border-color: var(--color-border);
}

.card-title {
  color: var(--color-text-heading);
}
</style>
