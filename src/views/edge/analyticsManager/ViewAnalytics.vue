<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("nav.analytics") }}
      </h1>
    </div>

    <!-- 用户趋势 - 折线图 -->
    <div
      class="max-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 md:p-6"
    >
      <div class="flex justify-between mb-4">
        <div>
          <h5 class="text-2xl font-semibold text-gray-900 dark:text-white">
            32.4k
          </h5>
          <p class="text-gray-500 dark:text-gray-400">本周用户</p>
        </div>
        <div
          class="flex items-center px-2.5 py-0.5 font-medium text-green-600 dark:text-green-400 text-center"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v13m0-13 4 4m-4-4-4 4"
            />
          </svg>
          12%
        </div>
      </div>
      <div class="w-full h-80">
        <CompLineChart
          :data="userData"
          x-key="x"
          x-label-key="date"
          y-key="users"
          :height="320"
          color="#1C64F2"
          :smooth="true"
        />
      </div>
      <div
        class="grid grid-cols-1 items-center border-t border-gray-200 dark:border-gray-700 justify-between"
      >
        <div class="flex justify-between items-center pt-5">
          <button
            type="button"
            class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-center inline-flex items-center"
          >
            最近 7 天
            <svg
              class="w-2.5 h-2.5 ms-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <a
            href="#"
            class="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            用户报告
            <svg
              class="w-2.5 h-2.5 ms-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- 图表网格 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 收入趋势 - 面积图 -->
      <div
        class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 md:p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          收入趋势
        </h3>
        <div class="w-full h-64">
          <CompAreaChart
            :data="revenueData"
            x-key="x"
            x-label-key="month"
            :y-key="['amount', 'cost', 'profit']"
            :height="256"
            :color="['#3B82F6', '#EF4444', '#10B981']"
            :smooth="true"
            :opacity="0.95"
          />
        </div>
      </div>

      <!-- 销售分类 - 饼图 -->
      <div
        class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 md:p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          销售分类
        </h3>
        <div class="w-full h-64 flex items-center justify-center">
          <CompPieChart
            :data="salesData"
            value-key="value"
            label-key="category"
            :height="256"
            :inner-radius="0"
            :colors="['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B']"
          />
        </div>
      </div>
    </div>

    <!-- 月度统计 - 柱状图 -->
    <div
      class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 md:p-6"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        月度订单统计
      </h3>
      <div class="w-full h-80">
        <CompBarChart
          :data="monthlyData"
          x-key="x"
          x-label-key="month"
          :y-key="['orders', 'completed', 'cancelled']"
          :height="320"
          :color="['#8B5CF6', '#10B981', '#EF4444']"
          :roundedCorners="4"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  CompLineChart,
  CompAreaChart,
  CompBarChart,
  CompPieChart,
} from "@/components/CompChart";

// 用户数据 - 折线图
const userData = ref([
  { x: 0, date: "02-01", users: 6500 },
  { x: 1, date: "02-02", users: 6418 },
  { x: 2, date: "02-03", users: 6456 },
  { x: 3, date: "02-04", users: 6526 },
  { x: 4, date: "02-05", users: 6356 },
  { x: 5, date: "02-06", users: 6456 },
  { x: 6, date: "02-07", users: 6500 },
]);

// 收入数据 - 面积图 (多组数据)
const revenueData = ref([
  { x: 0, month: "1月", amount: 12000, cost: 8000, profit: 4000 },
  { x: 1, month: "2月", amount: 15000, cost: 9500, profit: 5500 },
  { x: 2, month: "3月", amount: 18000, cost: 11000, profit: 7000 },
  { x: 3, month: "4月", amount: 14000, cost: 9000, profit: 5000 },
  { x: 4, month: "5月", amount: 21000, cost: 13000, profit: 8000 },
  { x: 5, month: "6月", amount: 23000, cost: 14000, profit: 9000 },
]);

// 销售分类数据 - 饼图
const salesData = ref([
  { category: "电子产品", value: 35 },
  { category: "服装", value: 25 },
  { category: "食品", value: 20 },
  { category: "其他", value: 20 },
]);

// 月度订单数据 - 柱状图 (多组数据)
const monthlyData = ref([
  { x: 0, month: "1月", orders: 120, completed: 110, cancelled: 10 },
  { x: 1, month: "2月", orders: 150, completed: 140, cancelled: 10 },
  { x: 2, month: "3月", orders: 180, completed: 165, cancelled: 15 },
  { x: 3, month: "4月", orders: 140, completed: 130, cancelled: 10 },
  { x: 4, month: "5月", orders: 210, completed: 195, cancelled: 15 },
  { x: 5, month: "6月", orders: 230, completed: 215, cancelled: 15 },
]);
</script>
