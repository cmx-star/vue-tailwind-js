<template>
  <div class="inline-flex items-center gap-2">
    <!-- 减少按钮 -->
    <CompBaseButton type="secondary" size="sm" :disabled="disabled" @click="decrease">
      -
    </CompBaseButton>

    <!-- 数值显示 -->
    <span class="counter-value w-12 text-center font-medium">
      {{ modelValue }}
    </span>

    <!-- 增加按钮 -->
    <CompBaseButton type="secondary" size="sm" :disabled="disabled" @click="increase">
      +
    </CompBaseButton>

    <!-- 图表按钮 -->
    <CompBaseButton type="primary" size="sm" :disabled="disabled" @click="showChart">
      📊
    </CompBaseButton>
  </div>
</template>

<script>
export default {
  name: 'CompCounter',
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  methods: {
    decrease() {
      const newValue = this.modelValue - 1
      this.$emit('update:modelValue', newValue)
    },
    increase() {
      const newValue = this.modelValue + 1
      this.$emit('update:modelValue', newValue)
    },
    // 图表按钮点击,触发 change 事件
    showChart() {
      this.$emit('change', this.modelValue)
    },
    // 供父组件调用的方法
    reset() {
      this.$emit('update:modelValue', 0)
    },
  },
}
</script>

<style scoped>
.counter-value {
  color: var(--color-text-heading);
}
</style>
