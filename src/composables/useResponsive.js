import { ref, computed, onMounted, onUnmounted } from "vue";

/**
 * 响应式设计 Composable
 * 提供设备类型检测和响应式断点
 */
export function useResponsive() {
  const windowWidth = ref(window.innerWidth);

  // 更新窗口宽度
  const updateWidth = () => {
    windowWidth.value = window.innerWidth;
  };

  // 设备类型
  const isMobile = computed(() => windowWidth.value < 640);
  const isTablet = computed(
    () => windowWidth.value >= 640 && windowWidth.value < 1024
  );
  const isDesktop = computed(() => windowWidth.value >= 1024);

  // 断点
  const breakpoint = computed(() => {
    if (windowWidth.value < 640) return "sm";
    if (windowWidth.value < 768) return "md";
    if (windowWidth.value < 1024) return "lg";
    if (windowWidth.value < 1280) return "xl";
    return "2xl";
  });

  onMounted(() => {
    window.addEventListener("resize", updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateWidth);
  });

  return {
    windowWidth,
    isMobile,
    isTablet,
    isDesktop,
    breakpoint,
  };
}
