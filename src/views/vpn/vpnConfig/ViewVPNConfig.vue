<template>
  <div class="p-6 space-y-6">
    <div
      class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <h1 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ pageTitle }}</h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        这是一个基于 Vue3 Setup 语法的简单演示页面，展示了项目的组件自动按称引入能力。
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">输入示例</h2>
        <div class="space-y-4">
          <CompBaseInput v-model="formData.name" label="名称" placeholder="请输入..." />
          <CompSelect v-model="formData.type" label="类型" :options="typeOptions" />
          <CompDatePicker v-model="formData.date" label="时间选择" />
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">交互示例</h2>
        <div class="flex flex-wrap gap-3">
          <CompBaseButton @click="handleAction('主要')">主要操作</CompBaseButton>
          <CompBaseButton type="secondary" @click="handleAction('辅助')">辅助操作</CompBaseButton>
        </div>
      </div>
    </div>

    <div
      class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">列表展示</h2>
      <CompDataTable :columns="columns" :data="tableData" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const pageTitle = ref('VPNConfig 模块展示')
const formData = reactive({ name: '', type: '', date: null })
const typeOptions = [
  { label: '基础业务', value: 'basic' },
  { label: '核心业务', value: 'core' },
]
const columns = [
  { key: 'id', title: 'ID', width: '80px' },
  { key: 'title', title: '任务名称' },
  { key: 'status', title: '当前状态' },
]
const tableData = ref([
  { id: 101, title: '系统架构升级', status: '进行中' },
  { id: 102, title: '组件库适配', status: '已完成' },
])
const handleAction = (msg) => {
  alert('您点击了: ' + msg)
}
</script>
