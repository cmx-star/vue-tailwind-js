<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("nav.settings") }}
      </h1>
    </div>

    <div
      class="max-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 md:p-6"
    >
      <div class="flex justify-between mb-5">
        <div class="grid gap-4 grid-cols-2">
          <div>
            <h5
              class="inline-flex items-center text-gray-500 dark:text-gray-400"
            >
              点击量
              <svg
                class="w-4 h-4 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
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
                  d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </h5>
            <p class="text-gray-900 dark:text-white text-2xl font-semibold">
              42.3k
            </p>
          </div>
          <div>
            <h5
              class="inline-flex items-center text-gray-500 dark:text-gray-400"
            >
              CPC
              <svg
                class="w-4 h-4 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
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
                  d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </h5>
            <p class="text-gray-900 dark:text-white text-2xl font-semibold">
              $5.40
            </p>
          </div>
        </div>
        <div>
          <button
            type="button"
            class="inline-flex items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            最近一周
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
        </div>
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
        class="items-center border-t border-gray-200 dark:border-gray-700 justify-between mt-5 pt-5"
      >
        <button
          type="button"
          class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            class="w-4 h-4 me-1.5 -ms-0.5"
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
              d="M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
            />
          </svg>
          查看完整报告
        </button>
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
//       data: ["02-01", "02-02", "02-03", "02-04", "02-05", "02-06", "02-07"],
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
//         name: "点击量",
//         type: "line",
//         smooth: true,
//         symbol: "circle",
//         symbolSize: 6,
//         lineStyle: {
//           color: "#1C64F2",
//           width: 3,
//         },
//         itemStyle: {
//           color: "#1C64F2",
//         },
//         areaStyle: {
//           color: {
//             type: "linear",
//             x: 0,
//             y: 0,
//             x2: 0,
//             y2: 1,
//             colorStops: [
//               { offset: 0, color: "rgba(28, 100, 242, 0.4)" },
//               { offset: 1, color: "rgba(28, 100, 242, 0)" },
//             ],
//           },
//         },
//         data: [6500, 6418, 6456, 6526, 6356, 6456],
//       },
//       {
//         name: "CPC",
//         type: "line",
//         smooth: true,
//         symbol: "circle",
//         symbolSize: 6,
//         lineStyle: {
//           color: "#7E3BF2",
//           width: 3,
//         },
//         itemStyle: {
//           color: "#7E3BF2",
//         },
//         areaStyle: {
//           color: {
//             type: "linear",
//             x: 0,
//             y: 0,
//             x2: 0,
//             y2: 1,
//             colorStops: [
//               { offset: 0, color: "rgba(126, 59, 242, 0.4)" },
//               { offset: 1, color: "rgba(126, 59, 242, 0)" },
//             ],
//           },
//         },
//         data: [6456, 6356, 6526, 6332, 6418, 6500],
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
