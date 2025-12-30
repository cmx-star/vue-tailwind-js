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
  xKey: {
    type: String,
    default: "x",
  },
  yKey: {
    type: [String, Array],
    default: "y",
  },
  xLabelKey: {
    type: String,
    default: null,
  },
  height: {
    type: Number,
    default: 320,
  },
  color: {
    type: [String, Array],
    default: ["#8B5CF6", "#3B82F6", "#10B981"],
  },
  roundedCorners: {
    type: Number,
    default: 0,
  },
});

const chartRef = ref(null);
let chartInstance = null;

const getChartData = () => {
  if (!props.data || props.data.length === 0) return null;

  const labels = props.data.map((item) =>
    props.xLabelKey ? item[props.xLabelKey] : item[props.xKey]
  );

  const yKeys = Array.isArray(props.yKey) ? props.yKey : [props.yKey];
  const datasets = yKeys.map((key) => ({
    name: key,
    chartType: "bar",
    values: props.data.map((item) => item[key]),
  }));

  return {
    labels,
    datasets,
  };
};

const initChart = () => {
  if (!chartRef.value) return;

  const data = getChartData();
  if (!data) return;

  const colors = Array.isArray(props.color) ? props.color : [props.color];

  chartInstance = new Chart(chartRef.value, {
    data: data,
    type: "bar",
    height: props.height,
    colors: colors,
    barOptions: {
      spaceRatio: 0.5,
      stacked: 0,
    },
    axisOptions: {
      xIsSeries: 1,
      xAxisMode: "tick",
      yAxisMode: "tick",
    },
  });

  // 添加完整的坐标轴线
  addAxisLines();
};

const addAxisLines = () => {
  if (!chartRef.value) return;

  // 等待图表渲染完成
  setTimeout(() => {
    const svg = chartRef.value.querySelector("svg.frappe-chart");
    if (!svg) return;

    const drawArea = svg.querySelector(".chart-draw-area");
    if (!drawArea) return;

    // 获取绘图区域的位置信息
    const transform = drawArea.getAttribute("transform");
    const translateMatch = transform?.match(/translate\((\d+),\s*(\d+)\)/);
    if (!translateMatch) return;

    const translateX = parseFloat(translateMatch[1]);
    const translateY = parseFloat(translateMatch[2]);

    // 获取y轴的位置和高度
    const yAxis = drawArea.querySelector(".y.axis");
    const xAxis = drawArea.querySelector(".x.axis");
    if (!yAxis || !xAxis) return;

    // 移除已存在的轴线（避免重复添加）
    const existingXAxis = drawArea.querySelector(".axis-line-x");
    const existingYAxis = drawArea.querySelector(".axis-line-y");
    if (existingXAxis) existingXAxis.remove();
    if (existingYAxis) existingYAxis.remove();

    // 获取x轴的y位置（从第一个x轴刻度线的line元素获取y2值）
    const firstXTickLine = xAxis.querySelector("line.line-vertical");
    if (firstXTickLine) {
      const xAxisY = parseFloat(firstXTickLine.getAttribute("y2") || "250");
      // 获取最后一个x轴刻度线的x位置来确定x轴线的长度
      const allXTickLines = xAxis.querySelectorAll("g");
      const lastXTick = allXTickLines[allXTickLines.length - 1];
      const lastTransform = lastXTick?.getAttribute("transform");
      const lastXMatch = lastTransform?.match(/translate\(([\d.]+),\s*(\d+)\)/);
      const xAxisLength = lastXMatch ? parseFloat(lastXMatch[1]) : 0;

      // 添加x轴线
      const xAxisLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      xAxisLine.setAttribute("class", "axis-line-x");
      xAxisLine.setAttribute("x1", "0");
      xAxisLine.setAttribute("x2", xAxisLength.toString());
      xAxisLine.setAttribute("y1", xAxisY.toString());
      xAxisLine.setAttribute("y2", xAxisY.toString());
      xAxisLine.setAttribute("stroke", "#dadada");
      xAxisLine.setAttribute("stroke-width", "1");
      drawArea.insertBefore(xAxisLine, drawArea.firstChild);
    }

    // 获取y轴的x位置和高度（从y轴刻度线的line元素获取）
    const yAxisLines = yAxis.querySelectorAll("line.line-horizontal");
    if (yAxisLines.length > 0) {
      const firstYLine = yAxisLines[0];
      const lastYLine = yAxisLines[yAxisLines.length - 1];
      const yAxisX = parseFloat(firstYLine.getAttribute("x2") || "0");

      // 获取y轴的起始和结束y位置
      const firstYGroup = firstYLine.closest("g");
      const lastYGroup = lastYLine.closest("g");
      const firstYTransform = firstYGroup?.getAttribute("transform");
      const lastYTransform = lastYGroup?.getAttribute("transform");
      const firstYMatch = firstYTransform?.match(
        /translate\([\d.]+,\s*([\d.]+)\)/
      );
      const lastYMatch = lastYTransform?.match(
        /translate\([\d.]+,\s*([\d.]+)\)/
      );

      if (firstYMatch && lastYMatch) {
        const yStart = parseFloat(firstYMatch[1]);
        const yEnd = parseFloat(lastYMatch[1]);

        // 添加y轴线
        const yAxisLine = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        yAxisLine.setAttribute("class", "axis-line-y");
        yAxisLine.setAttribute("x1", yAxisX.toString());
        yAxisLine.setAttribute("x2", yAxisX.toString());
        yAxisLine.setAttribute("y1", Math.min(yStart, yEnd).toString());
        yAxisLine.setAttribute("y2", Math.max(yStart, yEnd).toString());
        yAxisLine.setAttribute("stroke", "#dadada");
        yAxisLine.setAttribute("stroke-width", "1");
        drawArea.insertBefore(yAxisLine, drawArea.firstChild);
      }
    }
  }, 100);
};

watch(
  () => props.data,
  () => {
    if (chartInstance) {
      const data = getChartData();
      if (data) {
        chartInstance.update(data);
        // 更新后重新添加轴线
        addAxisLines();
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
/* 隐藏网格线但保留轴线和刻度 */
:deep(.grid-line),
:deep(.horizontal-grid),
:deep(.vertical-grid) {
  display: none !important;
}
</style>
