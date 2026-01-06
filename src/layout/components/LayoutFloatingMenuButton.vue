<template>
  <Teleport to="body">
    <div
      v-if="isMobile && isAside"
      ref="floatingBtn"
      class="fixed z-[60] w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-move touch-none select-none transition-shadow hover:shadow-xl"
      :class="isDragging ? 'shadow-2xl scale-110' : ''"
      :style="{
        left: position.x + 'px',
        top: position.y + 'px',
        backgroundColor: 'var(--color-primary-600)',
      }"
      @touchstart="handleTouchStart"
      @touchmove.prevent="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleClick"
    >
      <Bars3Icon class="w-6 h-6 text-white" />
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEventListener } from '@vueuse/core'
import { useAppStore } from '@/stores/app'
import { Bars3Icon } from '@heroicons/vue/24/outline'

const route = useRoute()
const appStore = useAppStore()

const floatingBtn = ref(null)
const position = ref({ x: 20, y: window.innerHeight - 80 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const clickThreshold = 5 // 移动小于5px视为点击

// 检查是否为移动端
const isMobile = ref(false)

// 检查是否有侧边栏
const isAside = computed(() => {
  return route.meta && (route.meta.aside === '1' || route.meta.aside === 1)
})

// 检查屏幕尺寸
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

// 从 localStorage 加载位置
const loadPosition = () => {
  const saved = localStorage.getItem('floatingMenuPosition')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      position.value = parsed
    } catch (e) {
      console.error('Failed to parse saved position:', e)
    }
  }
}

// 保存位置到 localStorage
const savePosition = () => {
  localStorage.setItem('floatingMenuPosition', JSON.stringify(position.value))
}

// 边界检测
const constrainPosition = () => {
  const btnSize = 48 // 按钮尺寸
  const margin = 10 // 边距

  position.value.x = Math.max(
    margin,
    Math.min(window.innerWidth - btnSize - margin, position.value.x),
  )
  position.value.y = Math.max(
    margin,
    Math.min(window.innerHeight - btnSize - margin, position.value.y),
  )
}

// 触摸开始
const handleTouchStart = (e) => {
  isDragging.value = false
  const touch = e.touches[0]
  dragStart.value = {
    x: touch.clientX - position.value.x,
    y: touch.clientY - position.value.y,
    startX: position.value.x,
    startY: position.value.y,
  }
}

// 触摸移动
const handleTouchMove = (e) => {
  const touch = e.touches[0]
  const newX = touch.clientX - dragStart.value.x
  const newY = touch.clientY - dragStart.value.y

  // 计算移动距离
  const distance = Math.sqrt(
    Math.pow(newX - dragStart.value.startX, 2) + Math.pow(newY - dragStart.value.startY, 2),
  )

  // 如果移动距离超过阈值,标记为拖动
  if (distance > clickThreshold) {
    isDragging.value = true
  }

  position.value.x = newX
  position.value.y = newY
  constrainPosition()
}

// 触摸结束
const handleTouchEnd = () => {
  if (isDragging.value) {
    savePosition()
    // 延迟重置拖动状态,避免触发点击
    setTimeout(() => {
      isDragging.value = false
    }, 100)
  }
}

// 点击事件
const handleClick = (_e) => {
  if (!isDragging.value) {
    appStore.toggleSidebar()
  }
}

// 窗口大小改变
const handleResize = () => {
  checkMobile()
  constrainPosition()
}

useEventListener('resize', handleResize)

onMounted(() => {
  checkMobile()
  loadPosition()
  constrainPosition()
})
</script>

<style scoped>
/* 添加脉冲动画提示用户可以拖动 */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* 首次加载时的提示动画 */
.floating-menu-button-hint {
  animation: pulse 2s ease-in-out 3;
}
</style>
