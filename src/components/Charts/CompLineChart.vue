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
  name: 'CompLineChart',
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
    smooth: {
      type: Boolean,
      default: true,
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
      if (this.data && typeof this.data === 'object' && this.data.labels) {
        const labels = this.data.labels || []
        const datasets = this.data.datasets || []

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
            width: 2,
            fill: this.isDark
              ? `${this.chartColors[idx % this.chartColors.length]}20`
              : `${this.chartColors[idx % this.chartColors.length]}15`,
            points: { show: false, size: 4 },
            spanGaps: false,
            paths: this.smooth ? uPlot.paths.spline() : uPlot.paths.linear(),
          })),
        ],
        axes: [
          {
            show: true,
            stroke: this.isDark ? '#6b7280' : '#9ca3af',
            space: 40,
            border: {
              show: true,
              stroke: this.isDark ? '#6b7280' : '#9ca3af',
              width: 1,
            },
            grid: { show: false },
            ticks: {
              show: true,
              stroke: this.isDark ? '#6b7280' : '#9ca3af',
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
            stroke: this.isDark ? '#6b7280' : '#9ca3af',
            space: 50,
            border: {
              show: true,
              stroke: this.isDark ? '#6b7280' : '#9ca3af',
              width: 1,
            },
            grid: { show: false },
            ticks: {
              show: true,
              stroke: this.isDark ? '#6b7280' : '#9ca3af',
              width: 1,
            },
          },
        ],
        scales: { x: { time: false } },
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
    smooth() {
      this.initChart()
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
        console.error('[LineChart] Failed to initialize:', e)
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
        console.warn('[LineChart] Update failed, reinitializing:', e)
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
