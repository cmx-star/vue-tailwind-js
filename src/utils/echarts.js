/**
 * ECharts 统一初始化工具(按需加载)
 * 避免在每个组件中重复打包 ECharts 核心代码
 * 只引入实际使用的图表类型和组件
 * 使用 SVG Renderer 替代 Canvas Renderer 以减少体积
 */
import * as echarts from "echarts/core";
import { LineChart, BarChart, PieChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import { SVGRenderer } from "echarts/renderers";

// 统一注册所有需要的组件(按需注册)
// 移除 TitleComponent（如果不需要标题，可以节省体积）
// 使用 SVG Renderer 替代 Canvas Renderer（体积更小）
echarts.use([
  LineChart,
  BarChart,
  PieChart,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  SVGRenderer,
]);

/**
 * 创建 ECharts 实例
 * @param {HTMLElement} dom - DOM 元素
 * @param {Object} option - 图表配置
 * @returns {echarts.ECharts} ECharts 实例
 */
export function initChart(dom, option) {
  const chart = echarts.init(dom);
  chart.setOption(option);
  return chart;
}

/**
 * 获取 ECharts 实例
 * @param {HTMLElement} dom - DOM 元素
 * @returns {echarts.ECharts} ECharts 实例
 */
export function getChartInstance(dom) {
  return echarts.getInstanceByDom(dom) || echarts.init(dom);
}

export default echarts;
