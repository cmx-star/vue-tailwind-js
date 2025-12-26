<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("nav.analytics") }}
      </h1>
    </div>

    <div
      class="max-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 md:p-6"
    >
      <div class="flex justify-between">
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
      <!-- <div ref="chartRef" class="w-full h-80"></div> -->
      <div class="w-full h-80 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
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
//         type: "line",
//       },
//     },
//     grid: {
//       left: "0",
//       right: "0",
//       top: "20",
//       bottom: "0",
//       containLabel: false,
//     },
//     xAxis: {
//       type: "category",
//       data: ["02-01", "02-02", "02-03", "02-04", "02-05", "02-06", "02-07"],
//       show: false,
//     },
//     yAxis: {
//       type: "value",
//       show: false,
//     },
//     series: [
//       {
//         name: "新用户",
//         type: "line",
//         smooth: true,
//         symbol: "none",
//         lineStyle: {
//           color: "#1C64F2",
//           width: 3,
//         },
//         areaStyle: {
//           color: {
//             type: "linear",
//             x: 0,
//             y: 0,
//             x2: 0,
//             y2: 1,
//             colorStops: [
//               { offset: 0, color: "rgba(28, 100, 242, 0.5)" },
//               { offset: 1, color: "rgba(28, 100, 242, 0)" },
//             ],
//           },
//         },
//         data: [6500, 6418, 6456, 6526, 6356, 6456],
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
