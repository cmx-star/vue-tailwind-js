<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("nav.userList") }}
      </h1>
    </div>

    <div
      class="max-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 md:p-6"
    >
      <div
        class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center">
          <div
            class="w-12 h-12 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center rounded-full me-3"
          >
            <svg
              class="w-7 h-7 text-gray-500 dark:text-gray-400"
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
                stroke-width="2"
                d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
              />
            </svg>
          </div>
          <div>
            <h5 class="text-2xl font-semibold text-gray-900 dark:text-white">
              3.4k
            </h5>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              每周生成的潜在客户
            </p>
          </div>
        </div>
        <div>
          <span
            class="inline-flex items-center bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-300 text-xs font-medium px-1.5 py-0.5 rounded"
          >
            <svg
              class="w-4 h-4 me-1"
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
            42.5%
          </span>
        </div>
      </div>

      <div class="grid grid-cols-2 mb-4">
        <dl class="flex items-center">
          <dt class="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">
            花费金额:
          </dt>
          <dd class="text-gray-900 dark:text-white text-sm font-semibold">
            $3,232
          </dd>
        </dl>
        <dl class="flex items-center justify-end">
          <dt class="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">
            转化率:
          </dt>
          <dd class="text-gray-900 dark:text-white text-sm font-semibold">
            1.2%
          </dd>
        </dl>
      </div>
      <!-- <div ref="chartRef" class="w-full h-80"></div> -->
      <div class="w-full h-80 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">图表功能已禁用</p>
          <p class="text-xs text-gray-400 dark:text-gray-500">ECharts 已被注释</p>
        </div>
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
            潜在客户报告
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
  </div>
</template>

<script setup>
// import { ref, onMounted, onUnmounted } from "vue";
// import { initChart } from "@/utils/echarts";

// const chartRef = ref(null);
// let chartInstance = null;

// onMounted(() => {
//   if (!chartRef.value) return;

//   const option = {
//     tooltip: {
//       trigger: "axis",
//       axisPointer: {
//         type: "shadow",
//       },
//     },
//     legend: {
//       show: false,
//     },
//     grid: {
//       left: "0",
//       right: "0",
//       top: "10",
//       bottom: "20",
//       containLabel: true,
//     },
//     xAxis: {
//       type: "category",
//       data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
//       axisLine: {
//         show: false,
//       },
//       axisTick: {
//         show: false,
//       },
//     },
//     yAxis: {
//       type: "value",
//       show: false,
//     },
//     series: [
//       {
//         name: "自然流量",
//         type: "bar",
//         barWidth: "40%",
//         itemStyle: {
//           color: "#1C64F2",
//           borderRadius: [8, 8, 0, 0],
//         },
//         data: [231, 122, 63, 421, 122, 323, 111],
//       },
//       {
//         name: "社交媒体",
//         type: "bar",
//         barWidth: "40%",
//         itemStyle: {
//           color: "#16BDCA",
//           borderRadius: [8, 8, 0, 0],
//         },
//         data: [232, 113, 341, 224, 522, 411, 243],
//       },
//     ],
//   };

//   chartInstance = initChart(chartRef.value, option);

//   // 响应式调整
//   window.addEventListener("resize", handleResize);
// });

// const handleResize = () => {
//   chartInstance?.resize();
// };

// onUnmounted(() => {
//   window.removeEventListener("resize", handleResize);
//   chartInstance?.dispose();
// });
</script>
