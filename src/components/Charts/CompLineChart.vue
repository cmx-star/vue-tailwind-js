<template>
  <div ref="chartContainer" class="w-full"></div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'
import { createTooltipPlugin } from './tooltipPlugin.js'
import { useThemeStore } from '@/stores/theme'

const props = defineProps({
  data: {
    type: [Array, Object],
    default: () => [],
  },
  height: {
    type: Number,
    default: 320,
  },
  colors: {
    type: Array,
    default: () => ['#3B82F6', '#10B981', '#F59E0B'],
  },
  smooth: {
    type: Boolean,
    default: true,
  },
})

const themeStore = useThemeStore()
const chartContainer = ref(null)
const chart = ref(null)
const resizeTimer = ref(null)

const isDark = computed(() => themeStore.isDark)

const chartColors = computed(() => {
  return isDark.value ? ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa'] : props.colors
})

const chartData = computed(() => {
  if (props.data && typeof props.data === 'object' && props.data.labels) {
    const labels = props.data.labels || []
    const datasets = props.data.datasets || []

    if (labels.length === 0 || datasets.length === 0) return null

    const xData = labels.map((_, i) => i)
    const seriesData = datasets.map((ds) => {
      const values = (ds.values || []).map((v) => {
        if (v === null || v === undefined || v === '') return null
        const num = Number(v)
        return typeof num === 'number' && isFinite(num) && !isNaN(num) ? num : null
      })
      while (values.length < labels.length) values.push(null)
      return values.slice(0, labels.length)
    })

    return [xData, ...seriesData]
  }

  if (Array.isArray(props.data) && props.data.length > 0) {
    const xData = props.data.map((_, i) => i)
    const yData = props.data.map((item) => {
      if (item.y === null || item.y === undefined || item.y === '') return null
      const num = Number(item.y)
      return typeof num === 'number' && isFinite(num) && !isNaN(num) ? num : null
    })
    return [xData, yData]
  }

  return null
})

const chartOptions = computed(() => {
  if (!chartData.value) return null

  const datasets = props.data?.datasets || [{ name: '数据' }]
  const labels =
    props.data?.labels || (Array.isArray(props.data) ? props.data.map((item) => item.x || '') : [])

  return {
    width: chartContainer.value?.offsetWidth || 800,
    height: props.height,
    series: [
      {
        label: 'X',
        value: (u, val) => {
          const idx = Math.round(val)
          return idx >= 0 && idx < labels.length ? labels[idx] : ''
        },
      },
      ...datasets.map((ds, idx) => ({
        label: ds.name || `系列 ${idx + 1}`,
        stroke: chartColors.value[idx % chartColors.value.length],
        width: 2,
        fill: isDark.value
          ? `${chartColors.value[idx % chartColors.value.length]}20`
          : `${chartColors.value[idx % chartColors.value.length]}15`,
        points: { show: false, size: 4 },
        spanGaps: false,
        paths: props.smooth ? uPlot.paths.spline() : uPlot.paths.linear(),
      })),
    ],
    axes: [
      {
        show: true,
        stroke: isDark.value ? '#6b7280' : '#9ca3af',
        space: 40,
        border: {
          show: true,
          stroke: isDark.value ? '#6b7280' : '#9ca3af',
          width: 1,
        },
        grid: { show: false },
        ticks: {
          show: true,
          stroke: isDark.value ? '#6b7280' : '#9ca3af',
          width: 1,
        },
        values: (u, splits) =>
          splits.map((v) => {
            const idx = Math.round(v)
            return Math.abs(v - idx) < 0.1 && idx >= 0 && idx < labels.length ? labels[idx] : ''
          }),
      },
      {
        show: true,
        stroke: isDark.value ? '#6b7280' : '#9ca3af',
        space: 50,
        border: {
          show: true,
          stroke: isDark.value ? '#6b7280' : '#9ca3af',
          width: 1,
        },
        grid: { show: false },
        ticks: {
          show: true,
          stroke: isDark.value ? '#6b7280' : '#9ca3af',
          width: 1,
        },
      },
    ],
    scales: { x: { time: false } },
    legend: { show: datasets.length > 1, live: true },
    cursor: { show: true, focus: { prox: 16 } },
    plugins: [createTooltipPlugin(labels, isDark.value)],
  }
})

const handleResize = () => {
  if (resizeTimer.value) clearTimeout(resizeTimer.value)
  resizeTimer.value = setTimeout(() => updateChart(), 150)
}

const initChart = () => {
  if (!chartContainer.value || !chartData.value || !chartOptions.value) return

  if (chart.value) {
    chart.value.destroy()
    chart.value = null
  }

  try {
    const options = {
      ...chartOptions.value,
      width: chartContainer.value.offsetWidth || 800,
    }
    chart.value = new uPlot(options, chartData.value, chartContainer.value)
  } catch (e) {
    console.error('[LineChart] Failed to initialize:', e)
  }
}

const updateChart = () => {
  if (!chart.value || !chartData.value || !chartOptions.value) {
    initChart()
    return
  }

  try {
    chart.value.setData(chartData.value)
    const newWidth = chartContainer.value?.offsetWidth || 800
    if (chart.value.width !== newWidth) {
      chart.value.setSize({ width: newWidth, height: props.height })
    }
  } catch (e) {
    console.warn('[LineChart] Update failed, reinitializing:', e)
    initChart()
  }
}

watch(
  () => props.data,
  () => updateChart(),
  { deep: true },
)
watch(isDark, () => initChart())
watch(
  () => props.height,
  () => updateChart(),
)
watch(
  () => props.smooth,
  () => initChart(),
)

onMounted(() => {
  nextTick(() => initChart())
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (chart.value) {
    chart.value.destroy()
    chart.value = null
  }
})
</script>

<style scoped>
:deep(.uplot) {
  font-family: inherit;
}

:deep(.u-legend) {
  font-size: 12px;
}
</style>
