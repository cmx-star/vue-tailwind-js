// /**
//  * ECharts 统一初始化工具（按需加载）
//  * 避免在每个组件中重复打包 ECharts 核心代码
//  * 只引入实际使用的图表类型和组件
//  */
// import * as echarts from "echarts/core";
// // 按需引入图表类型（只引入实际使用的）
// import { LineChart, BarChart, PieChart } from "echarts/charts";
// // 按需引入组件（只引入实际使用的）
// import {
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
//   GridComponent,
//   ToolboxComponent,
//   DataZoomComponent,
// } from "echarts/components";
// import { CanvasRenderer } from "echarts/renderers";
//
// // 统一注册所有需要的组件（按需注册）
// echarts.use([
//   LineChart,
//   BarChart,
//   PieChart,
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
//   GridComponent,
//   ToolboxComponent,
//   DataZoomComponent,
//   CanvasRenderer,
// ]);
//
// /**
//  * 创建 ECharts 实例
//  * @param {HTMLElement} dom - DOM 元素
//  * @param {Object} option - 图表配置
//  * @returns {echarts.ECharts} ECharts 实例
//  */
// export function initChart(dom, option) {
//   const chart = echarts.init(dom);
//   chart.setOption(option);
//   return chart;
// }
//
// /**
//  * 获取 ECharts 实例
//  * @param {HTMLElement} dom - DOM 元素
//  * @returns {echarts.ECharts} ECharts 实例
//  */
// export function getChartInstance(dom) {
//   return echarts.getInstanceByDom(dom) || echarts.init(dom);
// }
//
// export default echarts;
