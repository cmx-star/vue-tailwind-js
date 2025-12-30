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
    type: [String, Array],
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
    type: [String, Array],
    default: '#3B82F6',
  },
  smooth: {
    type: Boolean,
    default: true,
  },
  opacity: {
    type: Number,
    default: 0.7,
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

  // 处理多组数据
  const yKeys = Array.isArray(props.yKey) ? props.yKey : [props.yKey];
  const colors = Array.isArray(props.color) ? props.color : [props.color];

  const series = yKeys.map((key, index) => ({
    name: key,
    type: 'line',
    data: props.data.map(item => item[key]),
    smooth: props.smooth,
    stack: 'Total', // 堆叠面积图
    lineStyle: {
      width: 2,
      color: colors[index % colors.length],
    },
    itemStyle: {
      color: colors[index % colors.length],
    },
    areaStyle: {
      color: colors[index % colors.length],
      opacity: props.opacity,
    },
  }));

  return {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: yKeys.length > 1 ? '15%' : '10%',
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
    legend: yKeys.length > 1 ? {
      data: yKeys,
      top: '5%',
      textStyle: {
        color: '#9CA3AF',
      },
    } : undefined,
    xAxis: {
      type: 'category',
      data: xAxisData,
      boundaryGap: false,
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
    series,
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

  window.addEventListener('resize', handleResize);
};

const handleResize = () => {
  chartInstance?.resize();
};

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
