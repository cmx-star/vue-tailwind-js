<template>
  <div ref="chartContainer" class="w-full"></div>
</template>

<script>
import uPlot from 'uplot'
import { createTooltipPlugin } from './tooltipPlugin.js'

export default {
  name: 'CompLineChart',
  props: {
    data: {
      type: [Array, Object],
      required: true,
      default: () => [],
      // 支持两种格式:
      // 1. 简单格式: [{ x: '周一', y: 30 }, ...]
      // 2. 多数据集格式: { labels: ['周一', '周二'], datasets: [{ name: '销售', values: [30, 45] }] }
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
    }
  },
  computed: {
    isDark() {
      return this.$store.state.theme.isDark
    },
    chartColors() {
      return this.isDark ? ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa'] : this.colors
    },
    chartData() {
      // 转换数据格式为 uPlot 格式
      // uPlot 数据格式: [x轴数据, 系列1数据, 系列2数据, ...]
      if (this.data && typeof this.data === 'object' && this.data.labels) {
        const labels = this.data.labels || []
        const datasets = this.data.datasets || []

        if (labels.length === 0 || datasets.length === 0) {
          return null
        }

        // x 轴数据：使用索引或标签
        const xData = labels.map((_, i) => i)

        // 每个系列的数据
        const seriesData = datasets.map((ds) => {
          const values = (ds.values || []).map((v) => {
            if (v === null || v === undefined || v === '') return null
            const num = Number(v)
            return typeof num === 'number' && isFinite(num) && !isNaN(num) ? num : null
          })

          // 确保长度与 labels 一致
          while (values.length < labels.length) {
            values.push(null)
          }
          return values.slice(0, labels.length)
        })

        return [xData, ...seriesData]
      }

      // 如果是数组格式，转换为 uPlot 格式
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

      const datasets =
        this.data && typeof this.data === 'object' && this.data.datasets
          ? this.data.datasets
          : [{ name: '数据' }]

      const labels =
        this.data && typeof this.data === 'object' && this.data.labels
          ? this.data.labels
          : Array.isArray(this.data)
            ? this.data.map((item) => item.x || '')
            : []

      return {
        width: this.$refs.chartContainer?.offsetWidth || 800,
        height: this.height,
        series: [
          {
            // x 轴配置
            label: 'X',
            value: (u, val) => {
              const idx = Math.round(val)
              return idx >= 0 && idx < labels.length ? labels[idx] : ''
            },
          },
          ...datasets.map((ds, idx) => ({
            label: ds.name || `系列 ${idx + 1}`,
            stroke: this.chartColors[idx % this.chartColors.length],
            width: 2,
            fill: this.isDark
              ? `${this.chartColors[idx % this.chartColors.length]}20`
              : `${this.chartColors[idx % this.chartColors.length]}15`,
            points: {
              show: false,
              size: 4,
            },
            spanGaps: false,
            // 根据 smooth prop 决定使用平滑曲线还是直线
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
            grid: {
              show: false,
            },
            ticks: {
              show: true,
              stroke: this.isDark ? '#6b7280' : '#9ca3af',
              width: 1,
            },
            values: (u, splits) => {
              // 只显示整数位置的标签，避免重复
              return splits.map((v) => {
                const idx = Math.round(v)
                // 只有当值是整数且在有效范围内时才显示标签
                if (Math.abs(v - idx) < 0.1 && idx >= 0 && idx < labels.length) {
                  return labels[idx]
                }
                return ''
              })
            },
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
            grid: {
              show: false,
            },
            ticks: {
              show: true,
              stroke: this.isDark ? '#6b7280' : '#9ca3af',
              width: 1,
            },
          },
        ],
        scales: {
          x: {
            time: false,
          },
        },
        legend: {
          show: datasets.length > 1,
          live: true,
        },
        cursor: {
          show: true,
          focus: {
            prox: 16,
          },
        },
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
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  },
  methods: {
    initChart() {
      if (!this.$refs.chartContainer || !this.chartData || !this.chartOptions) {
        return
      }

      // 销毁旧图表
      if (this.chart) {
        this.chart.destroy()
        this.chart = null
      }

      try {
        // 更新宽度
        const options = {
          ...this.chartOptions,
          width: this.$refs.chartContainer.offsetWidth || 800,
        }

        this.chart = new uPlot(options, this.chartData, this.$refs.chartContainer)
      } catch (e) {
        console.error('[LineChart] Failed to initialize chart:', e)
      }
    },
    updateChart() {
      if (!this.chart || !this.chartData || !this.chartOptions) {
        this.initChart()
        return
      }

      try {
        // 更新数据
        this.chart.setData(this.chartData)

        // 更新选项（主要是宽度）
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
