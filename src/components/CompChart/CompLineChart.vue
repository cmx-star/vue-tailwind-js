<template>
  <div v-if="data && data.length > 0" class="w-full h-full">
    <VisXYContainer :data="data" v-bind="containerConfig">
      <VisLine :x="xAccessor" :y="yAccessor" v-bind="lineConfig" :attributes="{ class: 'line' }" />
      <VisScatter :x="xAccessor" :y="yAccessor" v-bind="scatterConfig" :attributes="{ class: 'point' }" />
      <VisAxis type="x" :tickFormat="xTickFormat" :gridLine="false" />
      <VisAxis type="y" :gridLine="false" />
      <VisTooltip :triggers="tooltipTriggers" />
    </VisXYContainer>
  </div>
  <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
    暂无数据
  </div>
</template>

<script setup>
import { computed } from "vue";
import { VisXYContainer, VisLine, VisAxis, VisTooltip, VisScatter } from "@unovis/vue";
import { Line, Scatter } from "@unovis/ts";

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  xKey: {
    type: String,
    default: "x",
  },
  yKey: {
    type: String,
    default: "y",
  },
  xLabelKey: {
    type: String,
    default: null,
  },
  height: {
    type: Number,
    default: 320,
  },
  color: {
    type: String,
    default: "#3B82F6",
  },
  smooth: {
    type: Boolean,
    default: true,
  },
});

const containerConfig = computed(() => ({
  height: props.height,
}));

const lineConfig = computed(() => ({
  color: props.color,
  lineWidth: 2,
  curveType: props.smooth ? "monotoneX" : "linear",
}));

const scatterConfig = computed(() => ({
  color: props.color,
  size: 6,
  strokeColor: "#fff",
  strokeWidth: 2,
}));

// 访问器函数
const xAccessor = computed(() => {
  const key = props.xKey;
  return (d) => d[key];
});

const yAccessor = computed(() => {
  const key = props.yKey;
  return (d) => d[key];
});

// X 轴标签格式化
const xTickFormat = (d, i) => {
  if (!props.xLabelKey) return String(d);
  const item = props.data[i];
  return item ? item[props.xLabelKey] : String(d);
};

// Tooltip 配置
const tooltipTriggers = {
  'point': (d) => {
    const xLabel = props.xLabelKey && d ? d[props.xLabelKey] : d?.[props.xKey];
    const yValue = d?.[props.yKey];
    return `<strong>${xLabel}</strong><br/>${props.yKey}: ${yValue}`;
  },
};
</script>

<style scoped>
:deep(.unovis-line-chart) {
  width: 100%;
  height: 100%;
}
</style>
