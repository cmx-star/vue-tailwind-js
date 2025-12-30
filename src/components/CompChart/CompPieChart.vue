<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { Chart } from "frappe-charts";

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  valueKey: {
    type: String,
    default: "value",
  },
  labelKey: {
    type: String,
    default: "label",
  },
  height: {
    type: Number,
    default: 320,
  },
  colors: {
    type: Array,
    default: () => [
      "#3B82F6",
      "#8B5CF6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#06B6D4",
    ],
  },
  innerRadius: {
    type: Number,
    default: 0, // 0 = 饼图, 50 = 环状图 (Frappe 不直接支持 innerRadius，但可以用 type: 'pie')
  },
});

const chartRef = ref(null);
let chartInstance = null;

const getChartData = () => {
  if (!props.data || props.data.length === 0) return null;

  const labels = props.data.map((item) => item[props.labelKey]);
  const values = props.data.map((item) => item[props.valueKey]);

  return {
    labels,
    datasets: [
      {
        name: "Data",
        values: values,
      },
    ],
  };
};

const initChart = () => {
  if (!chartRef.value) return;

  const data = getChartData();
  if (!data) return;

  chartInstance = new Chart(chartRef.value, {
    data: data,
    type: "pie",
    height: props.height,
    colors: props.colors,
  });
};

watch(
  () => props.data,
  () => {
    if (chartInstance) {
      const data = getChartData();
      if (data) {
        chartInstance.update(data);
      }
    }
  },
  { deep: true }
);

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  chartInstance = null;
});
</script>

<style scoped>
/* Frappe Charts 样式 */
:deep(.frappe-chart-container) {
  width: 100% !important;
}
</style>
