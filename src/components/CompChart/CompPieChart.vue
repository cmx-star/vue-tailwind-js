<template>
  <div v-if="data && data.length > 0" class="w-full h-full">
    <VisSingleContainer :data="data" v-bind="containerConfig">
      <VisDonut :value="valueAccessor" :arcWidth="containerWidth" v-bind="pieConfig" :attributes="{ class: 'segment' }">
        <VisTooltip :triggers="tooltipTriggers" />
      </VisDonut>
    </VisSingleContainer>
  </div>
  <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
    暂无数据
  </div>
</template>

<script setup>
import { computed } from "vue";
import { VisSingleContainer, VisDonut, VisTooltip } from "@unovis/vue";
import { Donut } from "@unovis/ts";

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  valueKey: {
    type: String,
    default: "value",
  },
  labelKey: {
    type: String,
    default: "label",
  },
  height: {
    type: Number,
    default: 320,
  },
  colors: {
    type: Array,
    default: () => [
      "#3B82F6",
      "#8B5CF6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#06B6D4",
    ],
  },
  innerRadius: {
    type: Number,
    default: 0,
  },
});

const containerConfig = computed(() => ({
  width: props.height,
  height: props.height,
}));

const pieConfig = computed(() => ({
  color: (d, i) => props.colors[i % props.colors.length],
  innerRadius: props.innerRadius,
  padAngle: 0.01,
  showLabels: true,
}));

// arcWidth 设置为容器宽度一半,使其成为完整饼图
const containerWidth = computed(() => props.height / 2);

const valueAccessor = (d) => d[props.valueKey];

// Tooltip 配置
const tooltipTriggers = {
  [Donut.selectors.segment]: (d) => {
    const label = d?.[props.labelKey] || "未知";
    const value = d?.[props.valueKey] || 0;
    return `<strong>${label}</strong><br/>数值: ${value}`;
  },
};
</script>

<style scoped>
:deep(.unovis-donut-chart) {
  width: 100%;
  height: 100%;
}
</style>
