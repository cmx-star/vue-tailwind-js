<template>
  <div class="CompCardTabsWrapper">
    <div
      v-if="pageMode == '0'"
      class="CompCardTabs relative rounded-xl shadow-[0px_10px_20px_0px_rgba(0,0,0,0.1)] transition-all duration-300 border-none overflow-hidden bg-white dark:bg-gray-900"
      :class="{ 'min-h-[calc(100vh-100px)]': routerViewCard }"
      :style="
        bgColor && bgColor !== '#fff' && bgColor !== '#ffffff' ? { backgroundColor: bgColor } : {}
      "
    >
      <div class="p-0">
        <div class="tabsPan">
          <slot v-if="componentMode == '0'"></slot>
          <!-- <CompIframe v-if="componentMode == '1'"></CompIframe> -->
        </div>
        <div class="absolute right-5 top-5 pt-1 text-sm text-[#909399]">
          <slot name="titleTip">
            <span>{{ titleTip }}</span>
          </slot>
        </div>
      </div>
    </div>
    <!-- <CompIframe v-if="pageMode == '1'"></CompIframe> -->
  </div>
</template>

<script>
export default {
  name: 'CompCardTabs',
  props: {
    titleTip: {
      type: String,
      default: '',
    },
    moreTabs: {
      type: Boolean,
      default: false,
    },
    routerViewCard: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: '#fff',
    },
  },
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
}
</script>

<style scoped>
/* 原有的一些特殊逻辑可以通过 CSS 变量或 Tailwind 扩展处理 */
.CompCardTabs :deep(.el-tabs__header) {
  margin-bottom: 0;
}
.CompCardTabs :deep(.el-tabs__nav-wrap::after) {
  display: none;
}
</style>
