<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("nav.userRoles") }}
      </h1>
    </div>

    <div
      class="max-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 md:p-6"
    >
      <div class="flex justify-between items-start w-full mb-4">
        <div class="flex-col items-center">
          <div class="flex items-center mb-1">
            <h5
              class="text-xl font-semibold text-gray-900 dark:text-white me-1"
            >
              网站流量
            </h5>
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
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
          </div>
        </div>
        <div class="flex justify-end items-center">
          <button
            type="button"
            class="inline-flex items-center justify-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm w-9 h-9 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                stroke-width="3"
                d="M6 12h.01m6 0h.01m5.99 0h.01"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- 饼图 -->
      <!-- <div ref="chartRef" class="w-full h-96"></div> -->
      <div class="w-full h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
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
            流量报告
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
//       trigger: "item",
//       formatter: "{a} <br/>{b}: {c} ({d}%)",
//     },
//     legend: {
//       orient: "horizontal",
//       bottom: "0",
//       left: "center",
//     },
//     series: [
//       {
//         name: "访问来源",
//         type: "pie",
//         radius: ["40%", "70%"],
//         avoidLabelOverlap: false,
//         itemStyle: {
//           borderRadius: 10,
//           borderColor: "#fff",
//           borderWidth: 2,
//         },
//         label: {
//           show: false,
//           position: "center",
//         },
//         emphasis: {
//           label: {
//             show: true,
//             fontSize: 20,
//             fontWeight: "bold",
//           },
//         },
//         labelLine: {
//           show: false,
//         },
//         data: [
//           { value: 52.8, name: "直接访问", itemStyle: { color: "#1C64F2" } },
//           { value: 26.8, name: "自然搜索", itemStyle: { color: "#16BDCA" } },
//           { value: 20.4, name: "推荐", itemStyle: { color: "#FDBA8C" } },
//         ],
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
