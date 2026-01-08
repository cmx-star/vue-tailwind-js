<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">组件封装示例</h1>

    <!-- 只演示 CompCounter 和 CompCard -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CompCard title="计数器">
        <div class="text-center">
          <CompCounter v-model="count" />
          <p class="mt-4 text-gray-600">当前值: {{ count }}</p>
        </div>
      </CompCard>

      <CompCard title="卡片示例">
        <p>这是一个简单的卡片组件</p>
      </CompCard>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
}
</script>
