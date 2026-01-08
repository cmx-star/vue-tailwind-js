<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">组件封装示例</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CompCard title="计数器">
        <div class="text-center space-y-4">
          <CompCounter ref="counterRef" v-model="count" @change="handleChange" />
          <p class="text-sm text-gray-600 dark:text-gray-400">当前值: {{ count }}</p>
          <button
            class="px-4 py-2 text-sm text-white bg-primary-600 rounded hover:bg-primary-700"
            @click="resetCounter"
          >
            重置计数器
          </button>
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
  methods: {
    handleChange(value) {
      // 子组件触发 change 事件,父组件显示 toast
      this.$toast.success(`当前值: ${value}`)
    },
    resetCounter() {
      this.$refs.counterRef.reset()
    },
  },
}
</script>
