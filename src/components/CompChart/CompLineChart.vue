<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { initChart } from '@/utils/echarts';

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  xKey: {
    type: String,
    default: 'x',
  },
  yKey: {
    type: String,
    default: 'y',
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
    type: String,
    default: '#3B82F6',
  },
  smooth: {
    type: Boolean,
    default: true,
  },
});

const chartRef = ref(null);
let chartInstance = null;

// 计算图表配置
const chartOption = computed(() => {
  if (!props.data || props.data.length === 0) return null;

  // 提取 X 轴标签
  const xAxisData = props.data.map(item => 
    props.xLabelKey ? item[props.xLabelKey] : item[props.xKey]
  );

  // 提取 Y 轴数据
  const seriesData = props.data.map(item => item[props.yKey]);

  return {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(50, 50, 50, 0.9)',
      borderColor: '#333',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
      },
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: '#4B5563',
        },
      },
      axisLabel: {
        color: '#9CA3AF',
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#9CA3AF',
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        type: 'line',
        data: seriesData,
        smooth: props.smooth,
        lineStyle: {
          color: props.color,
          width: 2,
        },
        itemStyle: {
          color: props.color,
        },
        areaStyle: null,
      },
    ],
  };
});

// 初始化图表
const initChartInstance = () => {
  if (!chartRef.value || !chartOption.value) return;

  if (!chartInstance) {
    chartInstance = initChart(chartRef.value, chartOption.value);
  } else {
    chartInstance.setOption(chartOption.value);
  }

  // 响应式调整
  window.addEventListener('resize', handleResize);
};

// 处理窗口大小变化
const handleResize = () => {
  chartInstance?.resize();
};

// 监听数据变化
watch(() => props.data, () => {
  if (chartInstance && chartOption.value) {
    chartInstance.setOption(chartOption.value);
  }
}, { deep: true });

onMounted(() => {
  initChartInstance();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  chartInstance?.dispose();
  chartInstance = null;
});
</script>

<style scoped>
/* ECharts 容器样式 */
</style>
