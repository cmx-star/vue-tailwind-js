<template>
  <div class="CompCardTabsWrapper">
    <div
      v-if="pageMode == '0'"
      class="CompCardTabs relative rounded-xl shadow-[0px_10px_20px_0px_rgba(0,0,0,0.1)] transition-all duration-300 border-none overflow-hidden"
      :class="{ 'min-h-[calc(100vh-100px)]': routerViewCard }"
      :style="
        bgColor && bgColor !== '#fff' && bgColor !== '#ffffff' ? { backgroundColor: bgColor } : {}
      "
    >
      <div :class="[tabs.length > 0 ? 'p-6' : 'p-0']">
        <!-- 页签头 -->
        <div
          v-if="tabs.length > 0"
          class="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 mb-6"
        >
          <div class="flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              :class="[
                'pb-4 text-sm font-medium transition-all relative outline-none',
                modelValue === tab.value
                  ? ''
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white',
              ]"
              :style="{
                color: modelValue === tab.value ? activeColor || 'var(--color-primary)' : '',
              }"
              @click="handleTabClick(tab.value)"
            >
              {{ tab.label }}
              <!-- 激活指示器 -->
              <transition name="fade">
                <div
                  v-if="modelValue === tab.value"
                  class="absolute bottom-0 left-0 right-0 h-0.5"
                  :style="{
                    backgroundColor: activeColor || 'var(--color-primary)',
                  }"
                ></div>
              </transition>
            </button>
          </div>

          <!-- 右侧提示/操作插槽 -->
          <div class="pb-4 text-sm text-gray-400 dark:text-gray-500">
            <slot name="titleTip">
              <span>{{ titleTip }}</span>
            </slot>
          </div>
        </div>

        <!-- 页签内容 -->
        <div class="tabsContent relative">
          <transition name="slide-up" mode="out-in">
            <div :key="modelValue" class="tab-pane">
              <slot :name="modelValue"></slot>
              <!-- 兼容旧版的默认插槽 -->
              <slot v-if="componentMode == '0' && !$slots[modelValue]"></slot>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @desc: 万能选项卡卡片组件
 * @author: Antigravity
 */
export default {
  name: 'CompCardTabs',
  props: {
    // 双向绑定当前激活的 tab 值
    modelValue: {
      type: [String, Number],
      default: '',
    },
    // 页签配置: [{ label: '标签1', value: 'tab1' }]
    tabs: {
      type: Array,
      default: () => [],
    },
    titleTip: {
      type: String,
      default: '',
    },
    // 自定义激活状态颜色，默认使用主题色
    activeColor: {
      type: String,
      default: '',
    },
    // 布局控制 (保留兼容性)
    routerViewCard: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: '#fff',
    },
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      pageMode: '0',
      componentMode: '0',
    }
  },
  beforeMount() {
    this.pageMode = this.$route?.meta?.pageMode || '0'
    this.componentMode = this.$route?.meta?.componentMode || '0'
  },
  methods: {
    handleTabClick(value) {
      if (this.modelValue === value) return
      this.$emit('update:modelValue', value)
      this.$emit('change', value)
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(1rem);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

/* 兼容原有样式 */
.CompCardTabs {
  background-color: var(--color-bg-card);
}
.CompCardTabs :deep(.tabsPan) {
  background-color: transparent;
}
</style>
