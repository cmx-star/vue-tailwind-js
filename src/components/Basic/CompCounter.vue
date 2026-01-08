<template>
  <div class="inline-flex items-center gap-2">
    <!-- 减少按钮 -->
    <CompBaseButton
      type="secondary"
      size="sm"
      :disabled="disabled"
      @click="$emit('update:modelValue', modelValue - 1)"
    >
      -
    </CompBaseButton>

    <!-- 数值显示 -->
    <span class="counter-value w-12 text-center font-medium">{{ modelValue }}</span>

    <!-- 增加按钮 -->
    <CompBaseButton
      type="secondary"
      size="sm"
      :disabled="disabled"
      @click="$emit('update:modelValue', modelValue + 1)"
    >
      +
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
  emits: ['update:modelValue'],
}
</script>

<style scoped>
.counter-value {
  color: var(--color-text-heading);
}
</style>
