<template>
  <div :key="reRenderKey" ref="chartContainer" class="w-full"></div>
</template>

<script>
import { Chart } from 'frappe-charts';

export default {
  name: 'CompBarChart',
  props: {
    data: {
      type: [Array, Object],
      required: true,
      default: () => []
    },
    height: {
      type: Number,
      default: 320
    },
    colors: {
      type: Array,
      default: () => ['#3B82F6', '#10B981', '#F59E0B']
    }
  },
  data() {
    return {
      initTimer: null,
      reRenderKey: 0
    };
  },
  created() {
    this.chart = null;
  },
  computed: {
    isDark() {
      return this.$store.state.theme.isDark;
    },
    chartColors() {
      return this.isDark 
        ? ['#60a5fa', '#34d399', '#fbbf24']
        : this.colors;
    },
    chartData() {
      if (this.data && typeof this.data === 'object' && this.data.labels) {
        return {
          labels: [...this.data.labels],
          datasets: this.data.datasets.map(ds => ({
            ...ds,
            values: ds.values.map(v => Number(v))
          }))
        };
      }
      
      if (Array.isArray(this.data) && this.data.length > 0) {
        const labels = this.data.map(item => item.x);
        const values = this.data.map(item => Number(item.y));
        
        return {
          labels: labels,
          datasets: [
            {
              name: '数据',
              values: values
            }
          ]
        };
      }
      
      return null;
    }
  },
  watch: {
    data: {
      handler() {
        this.updateChart();
      },
      deep: true
    },
    isDark() {
      this.initChart();
    }
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (this.initTimer) {
      clearTimeout(this.initTimer);
      this.initTimer = null;
    }
    
    if (this.chart) {
      try {
        if (typeof this.chart.destroy === 'function') {
          this.chart.destroy();
        }
      } catch (e) {
        // 忽略销毁错误，避免在组件卸载时抛出异常
      }
      this.chart = null;
    }
  },
  methods: {
    initChart() {
      if (this.initTimer) {
        clearTimeout(this.initTimer);
        this.initTimer = null;
      }

      // 1. 先销毁旧实例
      if (this.chart) {
        try {
          // 先调用 destroy
          if (typeof this.chart.destroy === 'function') {
            try {
              this.chart.destroy();
            } catch (e) {
              // 忽略销毁错误
            }
          }
          
          // 然后清空容器内容
          const container = this.$refs.chartContainer;
          if (container) {
            try {
              container.innerHTML = '';
            } catch (e) {
              // 忽略错误
            }
          }
        } catch (e) {
          // 忽略销毁错误
        }
        this.chart = null;
      }

      // 2. 更新 Key 触发 DOM 替换
      this.reRenderKey++;

      if (!this.$refs.chartContainer) return;

      // 3. 延时初始化 (移除 innerHTML 手动清理)
      this.initTimer = setTimeout(() => {
        if (!this.$refs.chartContainer) return;

        this.chart = new Chart(this.$refs.chartContainer, {
          data: this.chartData,
          type: 'bar',
          height: this.height,
          colors: this.chartColors,
          barOptions: {
            spaceRatio: 0.5,
            stacked: 0
          },
          axisOptions: {
            xIsSeries: 0,
            xAxisMode: 'tick',
            yAxisMode: 'tick'
          }
        });

        this.addAxisLines();
      }, 50);
    },
    updateChart() {
      if (this.chart && this.chartData) {
        this.chart.update(this.chartData);
        this.addAxisLines();
      } else {
        this.initChart();
      }
    },
    addAxisLines() {
      if (!this.$refs.chartContainer) return;

      setTimeout(() => {
        const svg = this.$refs.chartContainer.querySelector('svg.frappe-chart');
        if (!svg) return;

        const drawArea = svg.querySelector('.chart-draw-area');
        if (!drawArea) return;

        const yAxis = drawArea.querySelector('.y.axis');
        const xAxis = drawArea.querySelector('.x.axis');
        if (!yAxis || !xAxis) return;

        const existingXAxis = drawArea.querySelector('.axis-line-x');
        const existingYAxis = drawArea.querySelector('.axis-line-y');
        if (existingXAxis) existingXAxis.remove();
        if (existingYAxis) existingYAxis.remove();

        const firstXTickLine = xAxis.querySelector('line.line-vertical');
        if (firstXTickLine) {
          const xAxisY = parseFloat(firstXTickLine.getAttribute('y2') || '250');
          const allXTickLines = xAxis.querySelectorAll('g');
          const lastXTick = allXTickLines[allXTickLines.length - 1];
          const lastTransform = lastXTick?.getAttribute('transform');
          const lastXMatch = lastTransform?.match(/translate\(([\d.]+),\s*(\d+)\)/);
          const xAxisLength = lastXMatch ? parseFloat(lastXMatch[1]) : 0;

          const xAxisLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          xAxisLine.setAttribute('class', 'axis-line-x');
          xAxisLine.setAttribute('x1', '0');
          xAxisLine.setAttribute('x2', xAxisLength.toString());
          xAxisLine.setAttribute('y1', xAxisY.toString());
          xAxisLine.setAttribute('y2', xAxisY.toString());
          xAxisLine.setAttribute('stroke', this.isDark ? '#4b5563' : '#dadada');
          xAxisLine.setAttribute('stroke-width', '1');
          drawArea.insertBefore(xAxisLine, drawArea.firstChild);
        }

        const yAxisLines = yAxis.querySelectorAll('line.line-horizontal');
        if (yAxisLines.length > 0) {
          const firstYLine = yAxisLines[0];
          const lastYLine = yAxisLines[yAxisLines.length - 1];
          const yAxisX = parseFloat(firstYLine.getAttribute('x2') || '0');

          const firstYGroup = firstYLine.closest('g');
          const lastYGroup = lastYLine.closest('g');
          const firstYTransform = firstYGroup?.getAttribute('transform');
          const lastYTransform = lastYGroup?.getAttribute('transform');
          const firstYMatch = firstYTransform?.match(/translate\([\d.]+,\s*([\d.]+)\)/);
          const lastYMatch = lastYTransform?.match(/translate\([\d.]+,\s*([\d.]+)\)/);

          if (firstYMatch && lastYMatch) {
            const yStart = parseFloat(firstYMatch[1]);
            const yEnd = parseFloat(lastYMatch[1]);

            const yAxisLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            yAxisLine.setAttribute('class', 'axis-line-y');
            yAxisLine.setAttribute('x1', yAxisX.toString());
            yAxisLine.setAttribute('x2', yAxisX.toString());
            yAxisLine.setAttribute('y1', Math.min(yStart, yEnd).toString());
            yAxisLine.setAttribute('y2', Math.max(yStart, yEnd).toString());
            yAxisLine.setAttribute('stroke', this.isDark ? '#4b5563' : '#dadada');
            yAxisLine.setAttribute('stroke-width', '1');
            drawArea.insertBefore(yAxisLine, drawArea.firstChild);
          }
        }
      }, 100);
    }
  }
};
</script>

<style scoped>
:deep(.frappe-chart-container) {
  width: 100% !important;
}
</style>
