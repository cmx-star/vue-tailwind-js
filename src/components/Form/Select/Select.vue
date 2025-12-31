<template>
  <div class="relative inline-block w-full">
    <button
      ref="referenceEl"
      @click="toggleDropdown"
      :disabled="disabled"
      class="w-full px-4 py-2 text-sm text-left rounded-lg border transition-colors flex items-center justify-between"
      :class="buttonClasses"
    >
      <span>{{ displayValue }}</span>
      <svg
        class="w-4 h-4 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- 下拉菜单 -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        ref="floatingEl"
        :style="floatingStyles"
        class="rounded-lg shadow-lg z-[100] border min-w-full"
        :class="[
          isDark
            ? 'bg-[#1f2937] border-gray-700'
            : 'bg-white border-gray-200'
        ]"
      >
        <div class="py-1 max-h-60 overflow-auto">
          <button
            v-for="option in options"
            :key="getOptionValue(option)"
            @click="selectOption(option)"
            type="button"
            class="w-full text-left px-4 py-2 text-sm transition-colors whitespace-nowrap option-item"
            :class="{ 'selected': isSelected(option), 'dark-mode': isDark }"
          >
            {{ getOptionLabel(option) }}
          </button>
        </div>
      </div>
    </transition>

    <!-- 点击外部关闭 -->
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script>
import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';

export default {
  name: 'CompSelect',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      required: true,
      // options: [{ label: '本周', value: 'week' }, ...]
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    optionLabel: {
      type: String,
      default: 'label'
    },
    optionValue: {
      type: String,
      default: 'value'
    }
  },
  data() {
    return {
      isOpen: false,
      floatingStyles: {
        position: 'absolute',
        top: '0',
        left: '0'
      },
      cleanup: null
    };
  },
  computed: {
    isDark() {
      return this.$store.state.theme.isDark;
    },
    displayValue() {
      const selected = this.options.find(opt => this.getOptionValue(opt) === this.value);
      return selected ? this.getOptionLabel(selected) : this.placeholder;
    },
    buttonClasses() {
      if (this.disabled) {
        return this.isDark
          ? 'bg-gray-800 border-gray-600 text-gray-400 cursor-not-allowed'
          : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed';
      }
      return this.isDark
        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50';
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.updatePosition();
        });
      } else {
        if (this.cleanup) {
          this.cleanup();
          this.cleanup = null;
        }
      }
    }
  },
  beforeDestroy() {
    if (this.cleanup) {
      this.cleanup();
    }
  },
  methods: {
    toggleDropdown() {
      if (!this.disabled) {
        this.isOpen = !this.isOpen;
      }
    },
    async updatePosition() {
      if (!this.$refs.referenceEl || !this.$refs.floatingEl) return;

      const update = async () => {
        const { x, y } = await computePosition(
          this.$refs.referenceEl,
          this.$refs.floatingEl,
          {
            placement: 'bottom-start',
            middleware: [
              offset(4),
              flip(),
              shift({ padding: 8 })
            ]
          }
        );

        this.floatingStyles = {
          position: 'absolute',
          top: `${y}px`,
          left: `${x}px`
        };
      };

      // 初始定位
      await update();

      // 自动更新定位
      this.cleanup = autoUpdate(
        this.$refs.referenceEl,
        this.$refs.floatingEl,
        update
      );
    },
    getOptionLabel(option) {
      if (typeof option === 'object' && option !== null) {
        return option[this.optionLabel] || String(option);
      }
      return String(option);
    },
    getOptionValue(option) {
      if (typeof option === 'object' && option !== null) {
        return option[this.optionValue];
      }
      return option;
    },
    isSelected(option) {
      return this.getOptionValue(option) === this.value;
    },
    selectOption(option) {
      const value = this.getOptionValue(option);
      this.$emit('input', value);
      this.$emit('change', value);
      this.isOpen = false;
    }
  }
};
</script>

<style scoped>
/* 基础样式 (明亮模式默认) */
.option-item {
  color: #374151; /* gray-700 */
}

.option-item:hover {
  background-color: var(--color-primary-50) !important;
  color: var(--color-primary-600) !important;
}

.option-item.selected {
  background-color: var(--color-primary-50) !important;
  color: var(--color-primary-600) !important;
}

/* 暗黑模式适配 (通过 class 强制生效) */
.option-item.dark-mode {
  color: #d1d5db; /* gray-300 */
}

/* 悬浮状态：使用 500 (稍亮/稍浅) 以区分选中状态 */
.option-item.dark-mode:hover {
  background-color: var(--color-primary-500) !important;
  color: white !important;
}

/* 选中状态：使用 600 (品牌主色) */
.option-item.dark-mode.selected {
  background-color: var(--color-primary-600) !important;
  color: white !important;
}
</style>
