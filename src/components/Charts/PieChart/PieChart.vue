<template>
  <div :key="reRenderKey" ref="chartContainer" class="w-full"></div>
</template>

<script>
import { Chart } from 'frappe-charts';

export default {
  name: 'CompPieChart',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    height: {
      type: Number,
      default: 320
    },
    colors: {
      type: Array,
      default: () => ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
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
        ? ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa']
        : this.colors;
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
      this.updateChart();
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

      if (!this.$refs.chartContainer || !this.data || this.data.length === 0) {
        return;
      }

      const labels = this.data.map(item => item.label);
      const values = this.data.map(item => Number(item.value));

      // 3. 延时初始化 (移除 innerHTML 手动清理)
      this.initTimer = setTimeout(() => {
        if (!this.$refs.chartContainer) return;

        this.chart = new Chart(this.$refs.chartContainer, {
          data: {
            labels: labels,
            datasets: [
              {
                values: values
              }
            ]
          },
          type: 'pie',
          height: this.height,
          colors: this.chartColors,
          maxSlices: 8
        });
      }, 50);
    },
    updateChart() {
      if (this.chart && this.data && this.data.length > 0) {
        const labels = this.data.map(item => item.label);
        const values = this.data.map(item => Number(item.value));
        
        this.chart.update({
          labels: labels,
          datasets: [
            {
              values: values
            }
          ]
        });
      } else {
        this.initChart();
      }
    }
  }
};
</script>

<style scoped>
:deep(.frappe-chart-container) {
  width: 100% !important;
}
</style>
