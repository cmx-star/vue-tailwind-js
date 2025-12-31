<template>
  <div :key="reRenderKey" ref="chartContainer" class="w-full"></div>
</template>

<script>
import { Chart } from 'frappe-charts';

export default {
  name: 'CompLineChart',
  props: {
    data: {
      type: [Array, Object],
      required: true,
      default: () => []
      // 支持两种格式:
      // 1. 简单格式: [{ x: '周一', y: 30 }, ...]
      // 2. 多数据集格式: { labels: ['周一', '周二'], datasets: [{ name: '销售', values: [30, 45] }] }
    },
    height: {
      type: Number,
      default: 320
    },
    colors: {
      type: Array,
      default: () => ['#3B82F6', '#10B981', '#F59E0B']
    },
    smooth: {
      type: Boolean,
      default: true
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
    },
    chartData() {
      // 核心修复：确保 labels 和 values 长度严格一致
      // Frappe Charts 在 spline 计算时，如果长度不匹配会导致 X 坐标计算为 undefined，从而产生 NaN
      if (this.data && typeof this.data === 'object' && this.data.labels) {
        let labels = [...this.data.labels].filter(l => l != null && l !== '');
        const datasets = this.data.datasets.map(ds => {
          // 清理 values：将所有非数字值转换为 0
          let values = (ds.values || []).map((v, idx) => {
            // 处理 null、undefined、空字符串
            if (v === null || v === undefined || v === '') {
              return 0;
            }
            // 转换为数字
            const val = Number(v);
            // 严格验证：必须是有限数字
            if (typeof val !== 'number' || !isFinite(val) || isNaN(val)) {
              return 0;
            }
            return val;
          });
          
          // 对齐长度：以 labels 为基准，确保完全匹配
          if (values.length > labels.length) {
            values = values.slice(0, labels.length);
          } else if (values.length < labels.length) {
            // 如果 values 少于 labels，用 0 填充
            while (values.length < labels.length) {
              values.push(0);
            }
          }
          
          // 最终验证：确保所有值都是纯数字类型
          values = values.map(v => {
            if (typeof v !== 'number' || !isFinite(v) || isNaN(v)) {
              return 0;
            }
            return v;
          });
          
          return { ...ds, values };
        });
        
        return { labels, datasets };
      }
      
      // 如果是数组格式，转换为 Frappe Charts 格式
      if (Array.isArray(this.data) && this.data.length > 0) {
        const labels = this.data.map(item => item.x || '').filter(x => x !== '');
        const values = this.data.map(item => {
          // 处理 null、undefined、空字符串
          if (item.y === null || item.y === undefined || item.y === '') {
            return 0;
          }
          const val = Number(item.y);
          // 严格验证：必须是有限数字
          if (typeof val !== 'number' || !isFinite(val) || isNaN(val)) {
            return 0;
          }
          return val;
        });
        
        // 确保长度完全一致
        const minLength = Math.min(labels.length, values.length);
        const finalLabels = labels.slice(0, minLength);
        const finalValues = values.slice(0, minLength);
        
        // 最终验证：确保所有值都是纯数字
        const validatedValues = finalValues.map(v => {
          if (typeof v !== 'number' || !isFinite(v) || isNaN(v)) {
            return 0;
          }
          return v;
        });
        
        return {
          labels: finalLabels,
          datasets: [
            {
              name: '数据',
              values: validatedValues
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

      if (this.chart) {
        // 1. 先销毁旧实例，必须在移除 DOM 之前完成
        try {
          // 先调用 destroy，让 frappe-charts 自己清理
          if (typeof this.chart.destroy === 'function') {
            try {
              this.chart.destroy();
            } catch (e) {
              // 忽略销毁错误
            }
          }
          
          // 然后清空容器内容，避免 ResizeObserver 在 DOM 移除后触发回调
          const container = this.$refs.chartContainer;
          if (container) {
            // 移除所有子节点，避免 ResizeObserver 回调
            try {
              // 使用 innerHTML 更快更安全
              container.innerHTML = '';
            } catch (e) {
              // 如果失败，尝试逐个移除
              try {
                while (container.firstChild) {
                  container.removeChild(container.firstChild);
                }
              } catch (e2) {
                // 忽略错误
              }
            }
          }
        } catch (e) {
          // 忽略销毁错误，避免阻塞后续操作
        }
        this.chart = null;
      }

      // 2. 然后更新 Key，触发 Vue 移除旧 DOM 节点并创建新节点
      this.reRenderKey++;

      if (!this.$refs.chartContainer) return;

      // 3. 验证数据有效性
      if (!this.chartData || !this.chartData.datasets || this.chartData.datasets.length === 0) {
        return;
      }

      // 4. 延时初始化新实例
      this.initTimer = setTimeout(() => {
        if (!this.$refs.chartContainer) return;
        
        // 检查容器尺寸，避免在容器未渲染时初始化
        const container = this.$refs.chartContainer;
        const containerWidth = container.offsetWidth || container.clientWidth;
        if (containerWidth === 0) {
          // 容器尺寸为 0，延迟重试
          this.initTimer = setTimeout(() => this.initChart(), 100);
          return;
        }
        
        // 验证数据完整性
        const dataset = this.chartData.datasets[0];
        if (!dataset || !dataset.values || dataset.values.length === 0) {
          return;
        }
        
        // 再次验证所有值都是有效数字，并确保所有值都是数字类型
        // 这是防止 NaN 的关键步骤
        const validValues = [];
        for (let i = 0; i < dataset.values.length; i++) {
          const v = dataset.values[i];
          // 多重验证确保值有效
          if (v === null || v === undefined || v === '') {
            validValues.push(0);
            continue;
          }
          const num = Number(v);
          // 严格验证：必须是有限数字且不是 NaN
          if (typeof num === 'number' && isFinite(num) && !isNaN(num)) {
            validValues.push(num);
          } else {
            // 无效值替换为 0
            validValues.push(0);
          }
        }
        
        if (validValues.length === 0) {
          return;
        }
        
        // 确保 labels 和 values 长度一致
        const finalLabels = this.chartData.labels.slice(0, validValues.length);
        const finalValues = validValues.slice(0, finalLabels.length);
        
        // 最终验证：再次检查所有值
        for (let i = 0; i < finalValues.length; i++) {
          const num = Number(finalValues[i]);
          if (!isFinite(num) || isNaN(num)) {
            finalValues[i] = 0;
          }
        }
        
        // 根据官方文档：确保数据格式完全正确
        // 创建数据副本，避免修改原始数据
        const chartDataCopy = {
          labels: finalLabels,
          datasets: this.chartData.datasets.map((ds, idx) => {
            const values = idx === 0 
              ? finalValues 
              : ds.values.slice(0, finalLabels.length).map(v => {
                  if (v === null || v === undefined || v === '') return 0;
                  const num = Number(v);
                  return (typeof num === 'number' && isFinite(num) && !isNaN(num)) ? num : 0;
                });
            
            // 最终验证数据集的值
            const validatedValues = values.map(v => {
              const num = Number(v);
              return (typeof num === 'number' && isFinite(num) && !isNaN(num)) ? num : 0;
            });
            
            return {
              name: ds.name || '数据',
              values: validatedValues
            };
          })
        };
        
        // 最终验证：确保所有值都是有效数字（三重验证）
        chartDataCopy.datasets.forEach(ds => {
          ds.values = ds.values.map((v, idx) => {
            const num = Number(v);
            if (typeof num !== 'number' || !isFinite(num) || isNaN(num)) {
              console.warn(`Invalid value at index ${idx}: ${v}, replacing with 0`);
              return 0;
            }
            return num;
          });
        });
        
        // 完全禁用 spline 以避免 NaN 错误
        // 这是 frappe-charts 的一个已知 bug，即使数据完全有效，spline 算法仍可能产生 NaN
        // 如果需要平滑曲线，建议使用其他图表库或等待 frappe-charts 修复
        
        try {
          // 最终验证：确保数据完全有效
          // 在传递给 frappe-charts 之前，再次验证所有值
          const finalValidation = {
            labels: chartDataCopy.labels,
            datasets: chartDataCopy.datasets.map(ds => {
              const validatedValues = ds.values.map((v, idx) => {
                // 最后一次验证
                if (v === null || v === undefined || v === '') {
                  console.warn(`[LineChart] Null/undefined value at index ${idx}, replacing with 0`);
                  return 0;
                }
                const num = Number(v);
                if (typeof num !== 'number' || !isFinite(num) || isNaN(num)) {
                  console.warn(`[LineChart] Invalid value at index ${idx}: ${v} (${typeof v}), replacing with 0`);
                  return 0;
                }
                return num;
              });
              
              return {
                name: ds.name || '数据',
                values: validatedValues
              };
            })
          };
          
          // 确保 labels 和每个 dataset 的 values 长度完全匹配
          const labelsLength = finalValidation.labels.length;
          finalValidation.datasets.forEach(ds => {
            if (ds.values.length !== labelsLength) {
              console.warn(`[LineChart] Length mismatch: labels=${labelsLength}, values=${ds.values.length}, fixing...`);
              if (ds.values.length > labelsLength) {
                ds.values = ds.values.slice(0, labelsLength);
              } else {
                while (ds.values.length < labelsLength) {
                  ds.values.push(0);
                }
              }
            }
          });
          
          // 根据官方文档配置图表
          this.chart = new Chart(container, {
            data: finalValidation,
            type: 'line', // 明确指定为 line 类型
            height: this.height,
            colors: this.chartColors,
            animate: true,
            lineOptions: {
              // 根据文档，lineOptions 用于线图配置
              // regionFill: 1 用于面积图，这里不需要
              // 完全禁用 spline 以避免 NaN 错误
              spline: 0,
              hideDots: 0,
              heatline: 0
            },
            axisOptions: {
              xIsSeries: 0,
              xAxisMode: 'tick',
              yAxisMode: 'tick'
            }
          });

          this.addAxisLines();
        } catch (e) {
          console.error('[LineChart] Failed to initialize chart:', e);
          console.error('[LineChart] Data that caused error:', chartDataCopy);
          this.chart = null;
        }
      }, 50);
    },
    updateChart() {
      // 验证数据有效性
      if (!this.chartData || !this.chartData.datasets || this.chartData.datasets.length === 0) {
        return;
      }
      
      // 为了避免 frappe-charts 的 update 方法可能产生的 NaN 错误
      // 我们直接重新初始化图表，而不是使用 update
      // 这样可以确保每次都使用干净的数据和配置
      this.initChart();
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
