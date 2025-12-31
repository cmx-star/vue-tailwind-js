<template>
  <div class="p-6 space-y-8">
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">按钮组件示例</h1>
      
      <!-- 基础变体 -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">基础变体</h2>
        <div class="flex flex-wrap gap-3">
          <CompButton variant="default">Default</CompButton>
          <CompButton variant="secondary">Secondary</CompButton>
          <CompButton variant="tertiary">Tertiary</CompButton>
          <CompButton variant="success">Success</CompButton>
          <CompButton variant="danger">Danger</CompButton>
          <CompButton variant="warning">Warning</CompButton>
          <CompButton variant="dark">Dark</CompButton>
          <CompButton variant="ghost">Ghost</CompButton>
        </div>
      </section>

      <!-- 圆角变体 -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">圆角变体</h2>
        <div class="flex flex-wrap gap-3">
          <CompButton variant="default" shape="full">Default</CompButton>
          <CompButton variant="secondary" shape="full">Secondary</CompButton>
          <CompButton variant="tertiary" shape="full">Tertiary</CompButton>
          <CompButton variant="success" shape="full">Success</CompButton>
          <CompButton variant="danger" shape="full">Danger</CompButton>
          <CompButton variant="warning" shape="full">Warning</CompButton>
          <CompButton variant="dark" shape="full">Dark</CompButton>
          <CompButton variant="ghost" shape="full">Ghost</CompButton>
        </div>
      </section>

      <!-- 描边变体 -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">描边变体</h2>
        <div class="flex flex-wrap gap-3">
          <CompButton variant="outline-brand">Brand</CompButton>
          <CompButton variant="outline-gray">Gray</CompButton>
          <CompButton variant="outline-success">Success</CompButton>
          <CompButton variant="outline-danger">Danger</CompButton>
          <CompButton variant="outline-warning">Warning</CompButton>
        </div>
      </section>

      <!-- 尺寸变体 -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">尺寸变体</h2>
        <div class="flex flex-wrap items-center gap-3">
          <CompButton variant="default" size="xs">Extra small</CompButton>
          <CompButton variant="default" size="sm">Small</CompButton>
          <CompButton variant="default" size="base">Base</CompButton>
          <CompButton variant="default" size="lg">Large</CompButton>
          <CompButton variant="default" size="xl">Extra large</CompButton>
        </div>
      </section>

      <!-- 带图标的按钮 -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">带图标的按钮</h2>
        <div class="flex flex-wrap items-center gap-3">
          <CompButton variant="default" size="sm">
            <template #icon-left>
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
              </svg>
            </template>
            购物车
          </CompButton>
          
          <CompButton variant="success" size="base">
            <template #icon-left>
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </template>
            确认
          </CompButton>
          
          <CompButton variant="danger" size="base">
            <template #icon-left>
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </template>
            删除
          </CompButton>
        </div>
      </section>

      <!-- 禁用状态 -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">禁用状态</h2>
        <div class="flex flex-wrap gap-3">
          <CompButton variant="default" disabled>Disabled Default</CompButton>
          <CompButton variant="success" disabled>Disabled Success</CompButton>
          <CompButton variant="outline-brand" disabled>Disabled Outline</CompButton>
        </div>
      </section>

      <!-- 全宽按钮 -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">全宽按钮</h2>
        <CompButton variant="default" block>Full Width Button</CompButton>
      </section>

      <!-- Toast 演示 -->
      <section>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Toast 提示</h2>
        <div class="flex flex-wrap gap-3">
          <CompButton variant="default" @click="showInfoToast">Info Toast</CompButton>
          <CompButton variant="success" @click="showSuccessToast">Success Toast</CompButton>
          <CompButton variant="danger" @click="showDangerToast">Danger Toast</CompButton>
          <CompButton variant="warning" @click="showWarningToast">Warning Toast</CompButton>
          <CompButton variant="dark" @click="showDarkToast">Dark Toast</CompButton>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import CompButton from '@/components/Button/CompButton.vue';

export default {
  name: 'ViewNetworkManager',
  components: {
    CompButton
  },
  methods: {
    showInfoToast() {
      this.$toast.info({
        title: 'Info alert!',
        message: 'Change a few things up and try submitting again.',
        duration: 3000
      });
    },
    showSuccessToast() {
      this.$toast.success({
        title: 'Success alert!',
        message: 'Your changes have been saved successfully.',
        duration: 3000
      });
    },
    showDangerToast() {
      this.$toast.danger({
        title: 'Danger alert!',
        message: 'Something went wrong. Please try again.',
        duration: 3000
      });
    },
    showWarningToast() {
      this.$toast.warning({
        title: 'Warning alert!',
        message: 'Please check your input and try again.',
        duration: 3000
      });
    },
    showDarkToast() {
      this.$toast.dark({
        title: 'Dark alert!',
        message: 'This is a dark themed notification.',
        duration: 3000
      });
    }
  }
};
</script>
