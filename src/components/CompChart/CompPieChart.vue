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
  valueKey: {
    type: String,
    default: 'value',
  },
  labelKey: {
    type: String,
    default: 'label',
  },
  height: {
    type: Number,
    default: 320,
  },
  colors: {
    type: Array,
    default: () => [
      '#3B82F6',
      '#8B5CF6',
      '#10B981',
      '#F59E0B',
      '#EF4444',
      '#06B6D4',
    ],
  },
  innerRadius: {
    type: Number,
    default: 0, // 0 = 饼图, 50 = 环状图
  },
});

const chartRef = ref(null);
let chartInstance = null;

// 计算图表配置
const chartOption = computed(() => {
  if (!props.data || props.data.length === 0) return null;

  // 转换数据格式
  const seriesData = props.data.map((item, index) => ({
    name: item[props.labelKey],
    value: item[props.valueKey],
    itemStyle: {
      color: props.colors[index % props.colors.length],
    },
  }));

  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(50, 50, 50, 0.9)',
      borderColor: '#333',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
      },
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: 'center',
      textStyle: {
        color: '#9CA3AF',
      },
    },
    series: [
      {
        type: 'pie',
        radius: props.innerRadius > 0 ? [`${props.innerRadius}%`, '70%'] : '70%',
        center: ['35%', '50%'],
        data: seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          show: true,
          formatter: '{b}: {d}%',
          color: '#9CA3AF',
        },
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
