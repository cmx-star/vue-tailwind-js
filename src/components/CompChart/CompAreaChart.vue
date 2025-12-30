<template>
  <div v-if="data && data.length > 0" class="w-full h-full">
    <VisXYContainer :data="data" v-bind="containerConfig">
      <VisArea :x="xAccessor" :y="yAccessor" v-bind="areaConfig" :attributes="{ class: 'area' }" />
      <VisScatter :x="xAccessor" :y="yAccessor" v-bind="scatterConfig" :attributes="{ class: 'point' }" />
      <VisAxis type="x" :tickFormat="xTickFormat" :gridLine="false" />
      <VisAxis type="y" :gridLine="false" />
      <VisTooltip :triggers="tooltipTriggers" />
    </VisXYContainer>
  </div>
  <div
    v-else
    class="w-full h-full flex items-center justify-center text-gray-400"
  >
    暂无数据
  </div>
</template>

<script setup>
import { computed } from "vue";
import { VisXYContainer, VisArea, VisAxis, VisTooltip, VisScatter } from "@unovis/vue";
import { Area, Scatter } from "@unovis/ts";

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
    type: [String, Array],
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
    type: [String, Array],
    default: "#3B82F6",
  },
  smooth: {
    type: Boolean,
    default: true,
  },
  opacity: {
    type: Number,
    default: 0.3,
  },
});

const containerConfig = computed(() => ({
  height: props.height,
}));

// 处理多组数据
const yAccessor = computed(() => {
  if (Array.isArray(props.yKey)) {
    return props.yKey.map((key) => (d) => d[key]);
  }
  const key = props.yKey;
  return (d) => d[key];
});

const xAccessor = computed(() => {
  const key = props.xKey;
  return (d) => d[key];
});

const areaConfig = computed(() => {
  const config = {
    lineWidth: 2,
    curveType: props.smooth ? "monotoneX" : "linear",
    opacity: props.opacity,
  };

  if (Array.isArray(props.color)) {
    config.color = (d, i) => props.color[i % props.color.length];
  } else {
    config.color = props.color;
  }

  return config;
});

const scatterConfig = computed(() => {
  const colors = Array.isArray(props.color) ? props.color : [props.color];
  return {
    color: (d, i) => colors[i % colors.length],
    size: 6,
    strokeColor: "#fff",
    strokeWidth: 2,
  };
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
    if (Array.isArray(props.yKey)) {
      const values = props.yKey
        .map((key) => `${key}: <strong>${d?.[key] || 0}</strong>`)
        .join("<br/>");
      return `<strong>${xLabel}</strong><br/>${values}`;
    }
    const yValue = d?.[props.yKey];
    return `<strong>${xLabel}</strong><br/>${props.yKey}: ${yValue}`;
  },
};
</script>

<style scoped>
:deep(.unovis-area-chart) {
  width: 100%;
  height: 100%;
}
</style>
