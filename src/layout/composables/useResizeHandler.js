import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useAppStore } from '@/stores/app'

const MOBILE_BREAKPOINT = 768

export function useResizeHandler() {
  const appStore = useAppStore()
  const isMobile = ref(false)

  const mobileSidebarOpen = computed(() => appStore.mobileSidebarOpen)

  const checkMobile = () => {
    const width = window.innerWidth
    const wasMobile = isMobile.value
    isMobile.value = width < MOBILE_BREAKPOINT

    if (isMobile.value) {
      appStore.setSidebarCollapse(true)
    } else {
      if (wasMobile) {
        appStore.setSidebarCollapse(false)
      }
    }
  }

  // Watchers to sync store state
  watch(
    () => appStore.sidebarCollapse,
    (collapse) => {
      if (isMobile.value) {
        appStore.setMobileSidebarOpen(!collapse)
      }
    },
  )

  watch(mobileSidebarOpen, (visible) => {
    if (!visible && isMobile.value) {
      appStore.setSidebarCollapse(true)
    }
  })

  // Debounce wrapper is better handled by consumer or library if needed,
  // but for simplicity we'll keep the logic here or let the component handle the event listener attachment
  // to avoid complex lifecycle management inside simple function if not using `useEventListener`.
  // However, `useEventListener` is cleaner. Let's assume we can use standard window addEventListener here
  // or return the handler for the component to mount.

  const resizeHandler = () => {
    if (!document.hidden) {
      checkMobile()
    }
  }

  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', resizeHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
  })

  return {
    isMobile,
    mobileSidebarOpen,
  }
}
