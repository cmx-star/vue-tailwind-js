<template>
  <Teleport to="body">
    <div
      v-if="isMobileDevice && isAside"
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

<script>
import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { mapStores } from 'pinia'
import { useAppStore } from '@/stores/app'
import { Bars3Icon } from '@heroicons/vue/24/outline'

export default {
  name: 'LayoutFloatingMenuButton',
  components: {
    Bars3Icon,
  },
  setup() {
    const floatingBtn = ref(null)

    // Use composable for resize listener
    useEventListener('resize', () => {
      // Will be handled by Options API method
    })

    return {
      floatingBtn,
    }
  },
  data() {
    return {
      position: { x: 20, y: window.innerHeight - 80 },
      isDragging: false,
      dragStart: { x: 0, y: 0 },
      clickThreshold: 5,
      isMobileDevice: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    isAside() {
      return this.$route.meta && (this.$route.meta.aside === '1' || this.$route.meta.aside === 1)
    },
  },
  mounted() {
    this.checkMobile()
    this.loadPosition()
    this.constrainPosition()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    checkMobile() {
      this.isMobileDevice = window.innerWidth < 768
    },
    loadPosition() {
      const saved = localStorage.getItem('floatingMenuPosition')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          this.position = parsed
        } catch (e) {
          console.error('Failed to parse saved position:', e)
        }
      }
    },
    savePosition() {
      localStorage.setItem('floatingMenuPosition', JSON.stringify(this.position))
    },
    constrainPosition() {
      const btnSize = 48
      const margin = 10

      this.position.x = Math.max(
        margin,
        Math.min(window.innerWidth - btnSize - margin, this.position.x),
      )
      this.position.y = Math.max(
        margin,
        Math.min(window.innerHeight - btnSize - margin, this.position.y),
      )
    },
    handleTouchStart(e) {
      this.isDragging = false
      const touch = e.touches[0]
      this.dragStart = {
        x: touch.clientX - this.position.x,
        y: touch.clientY - this.position.y,
        startX: this.position.x,
        startY: this.position.y,
      }
    },
    handleTouchMove(e) {
      const touch = e.touches[0]
      const newX = touch.clientX - this.dragStart.x
      const newY = touch.clientY - this.dragStart.y

      const distance = Math.sqrt(
        Math.pow(newX - this.dragStart.startX, 2) + Math.pow(newY - this.dragStart.startY, 2),
      )

      if (distance > this.clickThreshold) {
        this.isDragging = true
      }

      this.position.x = newX
      this.position.y = newY
      this.constrainPosition()
    },
    handleTouchEnd() {
      if (this.isDragging) {
        this.savePosition()
        setTimeout(() => {
          this.isDragging = false
        }, 100)
      }
    },
    handleClick() {
      if (!this.isDragging) {
        this.appStore.toggleSidebar()
      }
    },
    handleResize() {
      this.checkMobile()
      this.constrainPosition()
    },
  },
}
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
