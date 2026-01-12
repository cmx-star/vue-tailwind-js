<template>
  <div ref="chartContainer" class="w-full"></div>
</template>

<script>
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'
import { createTooltipPlugin } from './tooltipPlugin.js'
import { mapStores } from 'pinia'
import { useThemeStore } from '@/stores/theme'

export default {
  name: 'CompBarChart',
  props: {
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
  },
  data() {
    return {
      chart: null,
      resizeTimer: null,
    }
  },
  computed: {
    ...mapStores(useThemeStore),
    isDark() {
      return this.themeStore.isDark
    },
    chartColors() {
      return this.isDark ? ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa'] : this.colors
    },
    chartData() {
      if (this.data?.labels) {
        const labels = this.data.labels || []
        const datasets = this.data.datasets || []
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

      if (Array.isArray(this.data) && this.data.length > 0) {
        const xData = this.data.map((_, i) => i)
        const yData = this.data.map((item) => {
          if (item.y === null || item.y === undefined || item.y === '') return null
          const num = Number(item.y)
          return typeof num === 'number' && isFinite(num) && !isNaN(num) ? num : null
        })
        return [xData, yData]
      }
      return null
    },
    chartOptions() {
      if (!this.chartData) return null

      const datasets = this.data?.datasets || [{ name: this.$t('common.data') }]
      const labels =
        this.data?.labels || (Array.isArray(this.data) ? this.data.map((item) => item.x || '') : [])
      const numSeries = datasets.length
      const barSize = numSeries > 1 ? [0.8 / numSeries, 100] : [0.6, 100]

      const containerWidth = this.$refs.chartContainer?.offsetWidth || 800

      return {
        width: containerWidth,
        height: this.height,
        series: [
          {
            label: 'X',
            value: (u, val) => {
              const idx = Math.round(val)
              return idx >= 0 && idx < labels.length ? labels[idx] : ''
            },
          },
          ...datasets.map((ds, idx) => ({
            label: ds.name || `${this.$t('common.series')} ${idx + 1}`,
            stroke: this.chartColors[idx % this.chartColors.length],
            width: 1,
            fill: this.chartColors[idx % this.chartColors.length],
            paths: uPlot.paths.bars({ size: barSize, align: 0 }),
            points: { show: false },
          })),
        ],
        axes: [
          {
            show: true,
            stroke: this.isDark
              ? 'var(--color-gray-500, #6b7280)'
              : 'var(--color-gray-400, #9ca3af)',
            space: 40,
            border: {
              show: true,
              stroke: this.isDark
                ? 'var(--color-gray-500, #6b7280)'
                : 'var(--color-gray-400, #9ca3af)',
              width: 1,
            },
            grid: { show: false },
            ticks: {
              show: true,
              stroke: this.isDark
                ? 'var(--color-gray-500, #6b7280)'
                : 'var(--color-gray-400, #9ca3af)',
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
            stroke: this.isDark
              ? 'var(--color-gray-500, #6b7280)'
              : 'var(--color-gray-400, #9ca3af)',
            space: 50,
            border: {
              show: true,
              stroke: this.isDark
                ? 'var(--color-gray-500, #6b7280)'
                : 'var(--color-gray-400, #9ca3af)',
              width: 1,
            },
            grid: { show: false },
            ticks: {
              show: true,
              stroke: this.isDark
                ? 'var(--color-gray-500, #6b7280)'
                : 'var(--color-gray-400, #9ca3af)',
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
        plugins: [createTooltipPlugin(labels, this.isDark)],
      }
    },
  },
  watch: {
    data: {
      handler() {
        this.updateChart()
      },
      deep: true,
    },
    isDark() {
      this.initChart()
    },
    height() {
      this.updateChart()
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  },
  methods: {
    handleResize() {
      if (this.resizeTimer) clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => this.updateChart(), 150)
    },
    initChart() {
      if (!this.$refs.chartContainer || !this.chartData || !this.chartOptions) return
      if (this.chart) {
        this.chart.destroy()
        this.chart = null
      }
      try {
        const options = {
          ...this.chartOptions,
          width: this.$refs.chartContainer.offsetWidth || 800,
        }
        this.chart = new uPlot(options, this.chartData, this.$refs.chartContainer)
      } catch (e) {
        console.error('[BarChart] Failed to initialize:', e)
      }
    },
    updateChart() {
      if (!this.chart || !this.chartData || !this.chartOptions) {
        this.initChart()
        return
      }
      try {
        this.chart.setData(this.chartData)
        const newWidth = this.$refs.chartContainer?.offsetWidth || 800
        if (this.chart.width !== newWidth) {
          this.chart.setSize({ width: newWidth, height: this.height })
        }
      } catch (e) {
        console.warn('[BarChart] Update failed, reinitializing:', e)
        this.initChart()
      }
    },
  },
}
</script>

<style scoped>
:deep(.uplot) {
  font-family: inherit;
}

:deep(.u-legend) {
  font-size: 12px;
}
</style>
