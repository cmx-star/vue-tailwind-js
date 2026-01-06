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
})

const themeStore = useThemeStore()
const chartContainer = ref(null)
const chart = ref(null)
const resizeTimer = ref(null)

const isDark = computed(() => themeStore.isDark)
const chartColors = computed(() =>
  isDark.value ? ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa'] : props.colors,
)

const chartData = computed(() => {
  if (props.data?.labels) {
    const labels = props.data.labels || []
    const datasets = props.data.datasets || []
    if (labels.length === 0 || datasets.length === 0) return null

    const numSeries = datasets.length
    if (numSeries > 1) {
      const barWidth = 0.8 / numSeries
      const gap = 0.2 / (numSeries + 1)

      const seriesData = datasets.map((ds, seriesIdx) => {
        const values = (ds.values || []).map((v) => {
          if (v === null || v === undefined || v === '') return null
          const num = Number(v)
          return typeof num === 'number' && isFinite(num) && !isNaN(num) ? num : null
        })
        while (values.length < labels.length) values.push(null)

        const xData = labels.map((_, idx) => {
          const baseX = idx
          const offset = (seriesIdx - (numSeries - 1) / 2) * (barWidth + gap)
          return baseX + offset
        })

        return { xData, values: values.slice(0, labels.length) }
      })

      return uPlot.join(seriesData.map((s) => [s.xData, s.values]))
    } else {
      const xData = labels.map((_, i) => i)
      const values = (datasets[0].values || []).map((v) => {
        if (v === null || v === undefined || v === '') return null
        const num = Number(v)
        return typeof num === 'number' && isFinite(num) && !isNaN(num) ? num : null
      })
      while (values.length < labels.length) values.push(null)
      return [xData, values.slice(0, labels.length)]
    }
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
  const numSeries = datasets.length
  const barSize = numSeries > 1 ? [0.8 / numSeries, 100] : [0.6, 100]

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
        width: 1,
        fill: chartColors.value[idx % chartColors.value.length],
        paths: uPlot.paths.bars({ size: barSize, align: 0 }),
        points: { show: false },
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
    scales: {
      x: {
        time: false,
        range: (u, dataMin, dataMax) => {
          if (numSeries > 1) {
            const barWidth = 0.8 / numSeries
            const gap = 0.2 / (numSeries + 1)
            const maxOffset = ((numSeries - 1) / 2) * (barWidth + gap)
            return [dataMin - maxOffset - 0.1, dataMax + maxOffset + 0.1]
          }
          return [dataMin - 0.5, dataMax + 0.5]
        },
      },
    },
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
    console.error('[BarChart] Failed to initialize:', e)
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
    console.warn('[BarChart] Update failed, reinitializing:', e)
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
