<template>
  <div class="CompTipPopover inline-block relative">
    <!-- Trigger element (question icon or slot) -->
    <div
      ref="triggerRef"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleClick"
    >
      <slot name="trigger">
        <!-- Default question mark icon -->
        <svg
          class="w-4 h-4 cursor-pointer transition-colors"
          :class="iconClass"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </slot>
    </div>

    <!-- Tooltip content -->
    <transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        ref="tooltipRef"
        role="tooltip"
        class="absolute z-10 inline-block px-3 py-2 text-sm font-medium rounded-base shadow-xs tooltip"
        :class="[tooltipClasses, positionClasses]"
        :style="{ width: computedWidth }"
      >
        <!-- Title -->
        <div v-if="title" class="font-semibold mb-1">{{ title }}</div>

        <!-- Content -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-if="content" v-html="content"></div>
        <slot v-else-if="slotName" :name="slotName"></slot>

        <!-- Arrow -->
        <div class="tooltip-arrow" :class="arrowClasses" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CompTipPopover',
  props: {
    // Tooltip content
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    slotName: {
      type: String,
      default: '',
    },
    // Positioning
    placement: {
      type: String,
      default: 'top',
      validator: (value) => ['top', 'right', 'bottom', 'left'].includes(value),
    },
    width: {
      type: [String, Number],
      default: 'auto',
    },
    // Behavior
    trigger: {
      type: String,
      default: 'hover',
      validator: (value) => ['hover', 'click'].includes(value),
    },
  },
  emits: ['show', 'hide'],
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    iconClass() {
      return 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
    },
    tooltipClasses() {
      return 'text-white bg-gray-900 dark:bg-gray-700'
    },
    positionClasses() {
      // These will be dynamically adjusted based on placement
      return ''
    },
    arrowClasses() {
      const arrowPositions = {
        top: 'bottom-[-4px] left-1/2 -translate-x-1/2',
        bottom: 'top-[-4px] left-1/2 -translate-x-1/2',
        left: 'right-[-4px] top-1/2 -translate-y-1/2',
        right: 'left-[-4px] top-1/2 -translate-y-1/2',
      }
      return arrowPositions[this.placement] || arrowPositions.top
    },
    computedWidth() {
      if (this.width === 'auto') return 'auto'
      if (typeof this.width === 'number') return `${this.width}px`
      return this.width
    },
  },
  methods: {
    handleMouseEnter() {
      if (this.trigger === 'hover') {
        this.show()
      }
    },
    handleMouseLeave() {
      if (this.trigger === 'hover') {
        this.hide()
      }
    },
    handleClick() {
      if (this.trigger === 'click') {
        this.visible ? this.hide() : this.show()
      }
    },
    show() {
      this.visible = true
      this.$emit('show')
      this.$nextTick(() => {
        this.updatePosition()
      })
    },
    hide() {
      this.visible = false
      this.$emit('hide')
    },
    close() {
      this.hide()
    },
    updatePosition() {
      if (!this.$refs.tooltipRef || !this.$refs.triggerRef) return

      const trigger = this.$refs.triggerRef
      const tooltip = this.$refs.tooltipRef
      const triggerRect = trigger.getBoundingClientRect()
      const tooltipRect = tooltip.getBoundingClientRect()

      let top, left

      switch (this.placement) {
        case 'top':
          top = -tooltipRect.height - 8
          left = (triggerRect.width - tooltipRect.width) / 2
          break
        case 'bottom':
          top = triggerRect.height + 8
          left = (triggerRect.width - tooltipRect.width) / 2
          break
        case 'left':
          top = (triggerRect.height - tooltipRect.height) / 2
          left = -tooltipRect.width - 8
          break
        case 'right':
          top = (triggerRect.height - tooltipRect.height) / 2
          left = triggerRect.width + 8
          break
      }

      tooltip.style.top = `${top}px`
      tooltip.style.left = `${left}px`
    },
  },
}
</script>

<style scoped>
.tooltip-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
}

.tooltip-arrow::before {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
  border: inherit;
}

/* Dark theme arrow */
.bg-gray-900 + .tooltip-arrow,
.dark .bg-gray-700 + .tooltip-arrow {
  background: rgb(17 24 39);
}

.dark .bg-gray-700 + .tooltip-arrow {
  background: rgb(55 65 81);
}
</style>
