<template>
  <div v-if="data && data.length > 0" class="w-full h-full">
    <VisXYContainer :data="data" v-bind="containerConfig">
      <VisGroupedBar :x="xAccessor" :y="yAccessor" v-bind="barConfig" :attributes="{ class: 'bar' }" />
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
import { VisXYContainer, VisGroupedBar, VisAxis, VisTooltip } from "@unovis/vue";
import { StackedBar } from "@unovis/ts";

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
    default: "#8B5CF6",
  },
  roundedCorners: {
    type: Number,
    default: 4,
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

const barConfig = computed(() => {
  const config = {
    roundedCorners: props.roundedCorners,
  };

  if (Array.isArray(props.color)) {
    config.color = (d, i) => props.color[i % props.color.length];
  } else {
    config.color = props.color;
  }

  return config;
});

// X 轴标签格式化
const xTickFormat = (d, i) => {
  if (!props.xLabelKey) return String(d);
  const item = props.data[i];
  return item ? item[props.xLabelKey] : String(d);
};

// Tooltip 配置
const tooltipTriggers = {
  [StackedBar.selectors.bar]: (d) => {
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
:deep(.unovis-bar-chart) {
  width: 100%;
  height: 100%;
}
</style>
