<template>
  <div :class="containerClass">
    <label v-if="label" :for="inputId" class="block mb-2.5 text-sm font-medium text-gray-900 dark:text-white">
      {{ label }}
    </label>
    
    <input
      :id="inputId"
      type="range"
      :value="value"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :class="rangeClasses"
      @input="handleInput"
    >
    
    <div v-if="showValue" class="flex justify-between text-xs text-gray-700 dark:text-gray-400 mt-2">
      <span>{{ min }}</span>
      <span class="font-medium text-gray-900 dark:text-white">{{ value }}</span>
      <span>{{ max }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompRange',
  props: {
    value: {
      type: Number,
      default: 50
    },
    label: {
      type: String,
      default: ''
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showValue: {
      type: Boolean,
      default: false
    },
    containerClass: {
      type: String,
      default: 'mb-6'
    }
  },
  computed: {
    inputId() {
      return `range-${Math.random().toString(36).substr(2, 9)}`;
    },
    rangeClasses() {
      const baseClasses = 'w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer';
      const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : '';
      
      return `${baseClasses} ${disabledClasses}`;
    }
  },
  methods: {
    handleInput(event) {
      const value = parseInt(event.target.value);
      this.$emit('input', value);
    }
  }
};
</script>

<style scoped>
/* Chrome, Safari, Edge */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #3b82f6;
  cursor: pointer;
  border-radius: 50%;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #2563eb;
}

/* Firefox */
input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #3b82f6;
  cursor: pointer;
  border-radius: 50%;
  border: none;
}

input[type="range"]::-moz-range-thumb:hover {
  background: #2563eb;
}

/* Track styling */
input[type="range"]::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 4px;
}

input[type="range"]::-moz-range-track {
  height: 8px;
  border-radius: 4px;
}

/* Disabled state */
input[type="range"]:disabled::-webkit-slider-thumb {
  background: #9ca3af;
  cursor: not-allowed;
}

input[type="range"]:disabled::-moz-range-thumb {
  background: #9ca3af;
  cursor: not-allowed;
}
</style>
