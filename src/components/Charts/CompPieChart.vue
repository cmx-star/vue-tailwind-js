<template>
  <div
    ref="chartContainer"
    class="pie-wrapper"
    :style="{ height: height + 'px' }"
    @mousemove="updateMouse"
  >
    <svg :viewBox="viewBox" class="pie-svg" :class="{ 'pie-svg-ring': innerRadius > 0 }">
      <!-- 外层扇形（饼图或环形图外层） -->
      <path
        v-for="(slice, i) in pathData"
        :key="`outer-${i}`"
        :d="slice.d"
        :fill="slice.color"
        class="pie-slice"
        :class="{ 'pie-slice-hovered': hovered === slice }"
        :style="{
          transform: hovered === slice ? `scale(1.05)` : 'scale(1)',
          transformOrigin: 'center',
        }"
        @mouseenter="hovered = slice"
        @mouseleave="hovered = null"
      />

      <!-- 内层圆（环形图） -->
      <circle
        v-if="innerRadius > 0"
        cx="0"
        cy="0"
        :r="innerRadius"
        :fill="isDark ? '#1f2937' : '#ffffff'"
        class="pie-inner-circle"
      />

      <!-- 中心文字（环形图） -->
      <text
        v-if="innerRadius > 0 && total > 0"
        x="0"
        y="0"
        text-anchor="middle"
        dominant-baseline="central"
        class="pie-center-text"
        :class="isDark ? 'text-gray-200' : 'text-gray-800'"
      >
        <tspan x="0" dy="-8" class="pie-center-value">
          {{ formatValue(total) }}
        </tspan>
        <tspan x="0" dy="16" class="pie-center-label">总计</tspan>
      </text>
    </svg>

    <!-- 图例 -->
    <div
      v-if="showLegend"
      class="pie-legend"
      :class="isDark ? 'pie-legend-dark' : 'pie-legend-light'"
    >
      <div
        v-for="(item, i) in processedData"
        :key="i"
        class="pie-legend-item"
        :class="{ 'pie-legend-item-hovered': hovered === item }"
        @mouseenter="hovered = item"
        @mouseleave="hovered = null"
      >
        <div class="pie-legend-color" :style="{ backgroundColor: item.color }"></div>
        <span class="pie-legend-label">{{ item.name || item.label }}</span>
        <span class="pie-legend-value">{{ formatValue(item.value) }}</span>
      </div>
    </div>

    <!-- Tooltip -->
    <div
      v-if="hovered"
      class="fixed z-50 pointer-events-none rounded-lg px-3 py-2 text-sm shadow-lg"
      :class="
        isDark
          ? 'bg-gray-800 border border-gray-700 text-gray-100'
          : 'bg-white border border-gray-200 text-gray-900'
      "
      :style="tooltipStyle"
    >
      <div
        class="font-semibold mb-2 pb-2 border-b"
        :class="isDark ? 'border-gray-700' : 'border-gray-200'"
      >
        {{ hovered.name || hovered.label }}
      </div>
      <div class="space-y-1 text-xs" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
        <div class="flex items-center justify-between">
          <span>数值:</span>
          <span class="font-semibold ml-2" :class="isDark ? 'text-gray-100' : 'text-gray-900'">
            {{ formatValue(hovered.value) }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span>占比:</span>
          <span class="font-semibold ml-2" :class="isDark ? 'text-gray-100' : 'text-gray-900'">
            {{ ((hovered.value / total) * 100).toFixed(1) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompPieChart',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
      // 支持两种格式:
      // 1. [{ name: '分类A', value: 40, color: '#3b82f6' }]
      // 2. [{ label: '分类A', value: 40 }] (会自动分配颜色)
    },
    height: {
      type: Number,
      default: 320,
    },
    colors: {
      type: Array,
      default: () => [
        '#3B82F6',
        '#10B981',
        '#F59E0B',
        '#EF4444',
        '#8B5CF6',
        '#EC4899',
        '#14B8A6',
        '#F97316',
      ],
    },
    showLegend: {
      type: Boolean,
      default: true,
    },
    innerRadius: {
      type: Number,
      default: 0,
      // 0 = 饼图, > 0 = 环形图 (0-1 之间的值，相对于半径的比例)
    },
  },
  data() {
    return {
      hovered: null,
      mouse: { x: 0, y: 0 },
    }
  },
  computed: {
    isDark() {
      return this.$store.state.theme.isDark
    },
    chartColors() {
      return this.isDark
        ? ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#f472b6', '#2dd4bf', '#fb923c']
        : this.colors
    },
    processedData() {
      if (!this.data || this.data.length === 0) {
        return []
      }

      // 过滤和验证数据
      const validData = this.data
        .filter((item) => item && item.value != null && !isNaN(Number(item.value)))
        .map((item, index) => {
          const value = Number(item.value)
          if (value <= 0) return null

          return {
            name: item.name || item.label || `项目 ${index + 1}`,
            label: item.label || item.name || `项目 ${index + 1}`,
            value: value,
            color: item.color || this.chartColors[index % this.chartColors.length],
          }
        })
        .filter((item) => item !== null)

      return validData
    },
    total() {
      return this.processedData.reduce((acc, v) => acc + v.value, 0)
    },
    tooltipStyle() {
      if (!this.hovered || !this.$refs.chartContainer) {
        return { display: 'none' }
      }

      const containerRect = this.$refs.chartContainer.getBoundingClientRect()
      const tooltipWidth = 180
      const tooltipHeight = 90

      // 使用鼠标在页面中的绝对位置
      const mouseX = this.mouse.x + containerRect.left
      const mouseY = this.mouse.y + containerRect.top

      // 默认位置：鼠标右下方
      let left = mouseX + 15
      let top = mouseY - tooltipHeight / 2

      // 防止超出右边界
      if (left + tooltipWidth > window.innerWidth - 10) {
        left = mouseX - tooltipWidth - 15
      }

      // 防止超出左边界
      if (left < 10) {
        left = 10
      }

      // 防止超出上边界
      if (top < 10) {
        top = mouseY + 15
      }

      // 防止超出下边界
      if (top + tooltipHeight > window.innerHeight - 10) {
        top = mouseY - tooltipHeight - 15
      }

      return {
        left: `${left}px`,
        top: `${top}px`,
        display: 'block',
      }
    },
    viewBox() {
      // 为悬停效果留出空间
      return '-1.1 -1.1 2.2 2.2'
    },
    pathData() {
      if (this.processedData.length === 0 || this.total === 0) {
        return []
      }

      let cumulativePercent = 0
      const outerRadius = 1
      const innerRadius = this.innerRadius

      return this.processedData.map((item) => {
        const startAngle = 2 * Math.PI * cumulativePercent
        const percent = item.value / this.total
        cumulativePercent += percent
        const endAngle = 2 * Math.PI * cumulativePercent

        const startX = Math.cos(startAngle)
        const startY = Math.sin(startAngle)
        const endX = Math.cos(endAngle)
        const endY = Math.sin(endAngle)

        // 当占比超过 50% 时，SVG 弧线需要切换标志位
        const largeArcFlag = percent > 0.5 ? 1 : 0

        let d
        if (innerRadius > 0) {
          // 环形图路径
          const innerStartX = Math.cos(startAngle) * innerRadius
          const innerStartY = Math.sin(startAngle) * innerRadius
          const innerEndX = Math.cos(endAngle) * innerRadius
          const innerEndY = Math.sin(endAngle) * innerRadius

          d = `
            M ${startX} ${startY}
            A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}
            L ${innerEndX} ${innerEndY}
            A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
            Z
          `
        } else {
          // 饼图路径
          d = `M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`
        }

        return { ...item, d, percent, startAngle, endAngle }
      })
    },
  },
  watch: {
    data: {
      handler() {
        // 数据变化时重置悬停状态
        this.hovered = null
      },
      deep: true,
    },
    isDark() {
      // 主题变化时重置悬停状态
      this.hovered = null
    },
  },
  methods: {
    updateMouse(e) {
      if (this.$refs.chartContainer) {
        const rect = this.$refs.chartContainer.getBoundingClientRect()
        this.mouse.x = e.clientX - rect.left
        this.mouse.y = e.clientY - rect.top
      } else {
        this.mouse.x = e.clientX
        this.mouse.y = e.clientY
      }
    },
    formatValue(value) {
      if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M'
      } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K'
      }
      return value.toFixed(0)
    },
  },
}
</script>

<style scoped>
.pie-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pie-svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 200px;
}

.pie-slice {
  cursor: pointer;
  transition: all 0.2s ease;
  stroke: #fff;
  stroke-width: 0.02;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.dark .pie-slice {
  stroke: #1e293b;
}

.pie-slice:hover,
.pie-slice-hovered {
  opacity: 0.9;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.pie-inner-circle {
  pointer-events: none;
}

.pie-center-text {
  font-family: inherit;
  pointer-events: none;
}

.pie-center-value {
  font-size: 0.16px;
  font-weight: 600;
}

.pie-center-label {
  font-size: 0.12px;
  opacity: 0.7;
}

.pie-legend {
  width: 100%;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 8px;
}

.pie-legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pie-legend-item:hover,
.pie-legend-item-hovered {
  transform: translateY(-2px);
}

.pie-legend-light {
  background: rgba(249, 250, 251, 0.5);
}

.pie-legend-dark {
  background: rgba(31, 41, 55, 0.5);
}

.pie-legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  flex-shrink: 0;
}

.pie-legend-label {
  font-size: 14px;
  color: inherit;
}

.pie-legend-value {
  font-size: 14px;
  font-weight: 600;
  margin-left: 4px;
}
</style>
