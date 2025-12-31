<template>
  <div class="relative inline-block" ref="dropdown">
    <!-- Trigger Button -->
    <button
      :type="type"
      :class="buttonClasses"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <slot name="trigger">
        <span>Dropdown</span>
        <svg
          class="w-4 h-4 ms-1.5 -me-0.5"
          :class="{ 'rotate-180': isOpen }"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </slot>
    </button>

    <!-- Dropdown Menu -->
    <transition name="dropdown-fade">
      <div
        v-show="isOpen"
        :class="menuClasses"
        @mouseenter="handleMenuEnter"
        @mouseleave="handleMenuLeave"
      >
        <ul class="p-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
          <slot></slot>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CompDropdown',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    trigger: {
      type: String,
      default: 'click',
      validator: (value) => ['click', 'hover'].includes(value)
    },
    variant: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'base'
    },
    placement: {
      type: String,
      default: 'bottom',
      validator: (value) => ['bottom', 'top', 'left', 'right'].includes(value)
    }
  },
  data() {
    return {
      isOpen: false,
      hoverTimer: null
    };
  },
  computed: {
    buttonClasses() {
      const baseClasses = 'inline-flex items-center justify-center box-border border font-medium leading-5 transition-all duration-200 focus:outline-none focus:ring-4';
      const sizeClasses = {
        sm: 'text-sm px-3 py-2',
        base: 'text-sm px-4 py-2.5',
        lg: 'text-base px-5 py-3'
      };
      const variantClasses = {
        default: 'text-white bg-blue-600 border-transparent hover:bg-blue-700 focus:ring-blue-300 shadow-sm rounded-lg',
        secondary: 'text-gray-700 bg-gray-100 border-gray-200 hover:bg-gray-200 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-300 shadow-sm rounded-lg',
        ghost: 'text-gray-700 bg-transparent border-transparent hover:bg-gray-100 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg'
      };
      
      return `${baseClasses} ${sizeClasses[this.size]} ${variantClasses[this.variant]}`;
    },
    menuClasses() {
      const baseClasses = 'absolute z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg w-44 mt-2';
      const placementClasses = {
        bottom: 'top-full left-0',
        top: 'bottom-full left-0 mb-2',
        left: 'right-full top-0 mr-2',
        right: 'left-full top-0 ml-2'
      };
      
      return `${baseClasses} ${placementClasses[this.placement]}`;
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    this.$on('item-click', this.closeDropdown);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
    this.$off('item-click', this.closeDropdown);
    this.clearHoverTimer();
  },
  methods: {
    handleClick() {
      if (this.trigger === 'click') {
        this.isOpen = !this.isOpen;
      }
    },
    closeDropdown() {
      this.isOpen = false;
    },
    handleMouseEnter() {
      if (this.trigger === 'hover') {
        this.clearHoverTimer();
        this.isOpen = true;
      }
    },
    handleMouseLeave() {
      if (this.trigger === 'hover') {
        this.hoverTimer = setTimeout(() => {
          this.isOpen = false;
        }, 100);
      }
    },
    handleMenuEnter() {
      if (this.trigger === 'hover') {
        this.clearHoverTimer();
      }
    },
    handleMenuLeave() {
      if (this.trigger === 'hover') {
        this.hoverTimer = setTimeout(() => {
          this.isOpen = false;
        }, 100);
      }
    },
    clearHoverTimer() {
      if (this.hoverTimer) {
        clearTimeout(this.hoverTimer);
        this.hoverTimer = null;
      }
    },
    handleClickOutside(event) {
      if (this.trigger === 'click' && this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.isOpen = false;
      }
    }
  }
};
</script>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s ease;
}

.dropdown-fade-enter {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

svg {
  transition: transform 0.2s ease;
}
</style>
