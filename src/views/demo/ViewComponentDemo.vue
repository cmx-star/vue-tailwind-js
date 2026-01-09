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

      <CompCard title="分页组件">
        <div class="text-center space-y-4">
          <CompPagination
            v-model="currentPage"
            :total="totalItems"
            :page-size="pageSize"
            @change="handlePageChange"
          />
          <p class="text-sm text-gray-600 dark:text-gray-400">
            当前页: {{ currentPage }} / 总条目: {{ totalItems }} / 每页: {{ pageSize }}
          </p>
          <div class="flex gap-2 justify-center">
            <button
              class="px-3 py-1.5 text-sm text-white bg-primary-600 rounded hover:bg-primary-700"
              @click="totalItems = 100"
            >
              设置 100 条
            </button>
            <button
              class="px-3 py-1.5 text-sm text-white bg-primary-600 rounded hover:bg-primary-700"
              @click="totalItems = 5"
            >
              设置 5 条
            </button>
          </div>
        </div>
      </CompCard>

      <CompCard title="对话框组件">
        <div class="text-center space-y-4">
          <div class="flex gap-2 justify-center flex-wrap">
            <button
              class="px-4 py-2 text-sm text-white bg-brand rounded-base hover:bg-brand-strong"
              @click="showDialog1 = true"
            >
              打开对话框
            </button>
            <button
              class="px-4 py-2 text-sm text-white bg-primary-600 rounded-base hover:bg-primary-700"
              @click="showNestedDialog = true"
            >
              嵌套对话框演示
            </button>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            支持嵌套、ESC 键关闭、遮罩点击关闭、Toast 层级最高
          </p>
        </div>
      </CompCard>
    </div>

    <!-- 单层 Dialog -->
    <CompDialog v-model="showDialog1" title="服务条款" width="2xl">
      <p class="leading-relaxed text-body">
        随着欧盟即将为其公民实施新的消费者隐私法,全球各地的公司都在更新其服务条款协议以符合要求。
      </p>
      <p class="leading-relaxed text-body">
        欧盟的《通用数据保护条例》(GDPR) 将于 5 月 25 日生效,旨在确保欧盟内部有一套通用的数据权利。
      </p>
      <div class="mt-4">
        <button
          class="px-4 py-2 text-sm text-white bg-success rounded-base hover:bg-success/90"
          @click="testToastInDialog"
        >
          测试 Toast 层级
        </button>
      </div>
      <template #footer>
        <button
          type="button"
          class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          @click="handleAccept"
        >
          我接受
        </button>
        <button
          type="button"
          class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          @click="showDialog1 = false"
        >
          拒绝
        </button>
      </template>
    </CompDialog>

    <!-- 嵌套 Dialog 演示 -->
    <CompDialog v-model="showNestedDialog" title="第一层对话框" width="xl">
      <p class="leading-relaxed text-body mb-4">
        这是第一层对话框。点击下方按钮可以在此对话框之上打开第二层对话框。
      </p>
      <button
        class="px-4 py-2 text-sm text-white bg-warning rounded-base hover:bg-warning/90"
        @click="showDialog2 = true"
      >
        打开第二层对话框
      </button>

      <!-- 第二层 Dialog -->
      <CompDialog v-model="showDialog2" title="第二层对话框" width="lg">
        <p class="leading-relaxed text-body mb-4">这是第二层对话框,它的 z-index 应该高于第一层。</p>
        <button
          class="px-4 py-2 text-sm text-white bg-danger rounded-base hover:bg-danger/90"
          @click="showDialog3 = true"
        >
          打开第三层对话框
        </button>

        <!-- 第三层 Dialog -->
        <CompDialog v-model="showDialog3" title="第三层对话框" width="md">
          <p class="leading-relaxed text-body">
            这是第三层对话框!Toast 的层级应该始终在所有对话框之上。
          </p>
          <button
            class="mt-4 px-4 py-2 text-sm text-white bg-success rounded-base hover:bg-success/90"
            @click="testToastInNestedDialog"
          >
            测试 Toast 层级
          </button>
        </CompDialog>
      </CompDialog>
    </CompDialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      currentPage: 1,
      totalItems: 99,
      pageSize: 10,
      showDialog1: false,
      showNestedDialog: false,
      showDialog2: false,
      showDialog3: false,
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
    handlePageChange(page) {
      this.$toast.success(`切换到第 ${page} 页`)
    },
    handleAccept() {
      this.$toast.success('感谢您接受服务条款!')
      this.showDialog1 = false
    },
    testToastInDialog() {
      this.$toast.info('Toast 应该显示在对话框之上')
    },
    testToastInNestedDialog() {
      this.$toast.warning('即使在第三层对话框中,Toast 也应该在最上层!')
    },
  },
}
</script>
