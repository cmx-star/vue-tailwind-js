<template>
  <div ref="chartContainer" class="w-full"></div>
</template>

<script>
import uPlot from 'uplot'
import { createTooltipPlugin } from './tooltipPlugin.js'

export default {
  name: 'CompBarChart',
  props: {
    data: {
      type: [Array, Object],
      required: true,
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
    isDark() {
      return this.$store.state.theme.isDark
    },
    chartColors() {
      return this.isDark ? ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa'] : this.colors
    },
    chartData() {
      // 转换数据格式为 uPlot 格式
      // 对于多系列并排显示，需要为每个系列创建独立的 x 轴数据
      if (this.data && typeof this.data === 'object' && this.data.labels) {
        const labels = this.data.labels || []
        const datasets = this.data.datasets || []

        if (labels.length === 0 || datasets.length === 0) {
          return null
        }

        // 多系列时，需要为每个系列创建偏移的 x 轴数据以实现并排显示
        if (datasets.length > 1) {
          const numSeries = datasets.length
          const barWidth = 0.8 / numSeries // 每个柱子的宽度
          const gap = 0.2 / (numSeries + 1) // 柱子之间的间距

          // 为每个系列创建独立的 x 轴数据，并添加偏移量
          const seriesData = datasets.map((ds, _seriesIdx) => {
            const values = (ds.values || []).map((v, _idx) => {
              if (v === null || v === undefined || v === '') return null
              const num = Number(v)
              return typeof num === 'number' && isFinite(num) && !isNaN(num) ? num : null
            })

            while (values.length < labels.length) {
              values.push(null)
            }

            // 为每个数据点创建 x 坐标，添加偏移量以实现并排
            const xData = labels.map((_, _idx) => {
              const baseX = _idx
              const offset = (_seriesIdx - (numSeries - 1) / 2) * (barWidth + gap)
              return baseX + offset
            })

            return { xData, values: values.slice(0, labels.length) }
          })

          // 使用 uPlot.join 来合并数据，格式: [[x1, y1], [x2, y2], ...]
          // 每个系列的数据格式: [x轴数据数组, y轴数据数组]
          return uPlot.join(seriesData.map((s) => [s.xData, s.values]))
        } else {
          // 单系列时使用原来的方式
          const xData = labels.map((_, i) => i)
          const values = (datasets[0].values || []).map((v) => {
            if (v === null || v === undefined || v === '') return null
            const num = Number(v)
            return typeof num === 'number' && isFinite(num) && !isNaN(num) ? num : null
          })

          while (values.length < labels.length) {
            values.push(null)
          }

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

      // 计算柱状图宽度（多系列并排显示时，每个柱子更窄）
      const numSeries = datasets.length
      const barSize =
        numSeries > 1
          ? [0.8 / numSeries, 100] // 多系列时，每个柱子占 0.8/系列数 的宽度
          : [0.6, 100] // 单系列时使用 0.6

      return {
        width: this.$refs.chartContainer?.offsetWidth || 800,
        height: this.height,
        series: [
          {
            label: 'X',
            value: (_u, val) => {
              const idx = Math.round(val)
              return idx >= 0 && idx < labels.length ? labels[idx] : ''
            },
          },
          ...datasets.map((ds, idx) => ({
            label: ds.name || `系列 ${idx + 1}`,
            stroke: this.chartColors[idx % this.chartColors.length],
            width: 1,
            fill: this.chartColors[idx % this.chartColors.length], // 使用纯色，不透明
            // 使用 uPlot 的柱状图路径，并排显示
            paths: uPlot.paths.bars({
              size: barSize,
              align: 0, // 居中对齐
            }),
            points: {
              show: false,
            },
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
            // 扩展 x 轴范围以容纳并排的柱子
            range: (u, dataMin, dataMax) => {
              const datasets =
                this.data && typeof this.data === 'object' && this.data.datasets
                  ? this.data.datasets
                  : [{ name: '数据' }]
              const numSeries = datasets.length

              if (numSeries > 1) {
                // 多系列时，需要扩展范围以显示所有并排的柱子
                const barWidth = 0.8 / numSeries
                const gap = 0.2 / (numSeries + 1)
                const maxOffset = ((numSeries - 1) / 2) * (barWidth + gap)

                // 扩展范围，确保最左边和最右边的柱子都能完整显示
                return [dataMin - maxOffset - 0.1, dataMax + maxOffset + 0.1]
              }

              // 单系列时使用默认范围
              return [dataMin - 0.5, dataMax + 0.5]
            },
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
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer)
      }
      this.resizeTimer = setTimeout(() => {
        this.updateChart()
      }, 150)
    },
    initChart() {
      if (!this.$refs.chartContainer || !this.chartData || !this.chartOptions) {
        return
      }

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
        console.error('[BarChart] Failed to initialize chart:', e)
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
