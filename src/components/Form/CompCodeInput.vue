<template>
  <div :class="containerClass">
    <div class="flex mb-2 space-x-2 rtl:space-x-reverse">
      <div v-for="(digit, index) in length" :key="index">
        <label :for="`code-${index}`" class="sr-only">Code {{ index + 1 }}</label>
        <input
          :id="`code-${index}`"
          :ref="`input-${index}`"
          type="text"
          maxlength="1"
          :value="code[index] || ''"
          :class="inputClasses"
          @input="handleInput(index, $event)"
          @keydown="handleKeydown(index, $event)"
          @paste="handlePaste"
          required
        />
      </div>
    </div>
    <p v-if="helperText" class="mt-2.5 text-sm text-gray-700 dark:text-gray-400">
      {{ helperText }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CompCodeInput',
  props: {
    length: {
      type: Number,
      default: 6
    },
    helperText: {
      type: String,
      default: ''
    },
    containerClass: {
      type: String,
      default: 'mb-6'
    }
  },
  data() {
    return {
      code: Array(this.length).fill('')
    };
  },
  computed: {
    inputClasses() {
      return 'block bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 h-10 w-10 shadow-sm';
    }
  },
  methods: {
    handleInput(index, event) {
      const value = event.target.value;
      
      // 只允许数字
      if (!/^\d*$/.test(value)) {
        event.target.value = this.code[index] || '';
        return;
      }
      
      this.code[index] = value;
      
      // 自动跳转到下一个输入框
      if (value && index < this.length - 1) {
        this.focusInput(index + 1);
      }
      
      // 触发更新
      this.emitValue();
    },
    handleKeydown(index, event) {
      // 退格键
      if (event.key === 'Backspace') {
        if (!this.code[index] && index > 0) {
          // 如果当前为空，删除前一个并聚焦
          this.code[index - 1] = '';
          this.focusInput(index - 1);
        } else {
          this.code[index] = '';
        }
        this.emitValue();
      }
      // 左箭头
      else if (event.key === 'ArrowLeft' && index > 0) {
        this.focusInput(index - 1);
      }
      // 右箭头
      else if (event.key === 'ArrowRight' && index < this.length - 1) {
        this.focusInput(index + 1);
      }
    },
    handlePaste(event) {
      event.preventDefault();
      const pastedData = event.clipboardData.getData('text').trim();
      
      // 只允许数字
      if (!/^\d+$/.test(pastedData)) {
        return;
      }
      
      // 填充输入框
      const digits = pastedData.split('').slice(0, this.length);
      digits.forEach((digit, index) => {
        this.code[index] = digit;
      });
      
      // 聚焦到最后一个填充的输入框
      const lastIndex = Math.min(digits.length - 1, this.length - 1);
      this.focusInput(lastIndex);
      
      this.emitValue();
    },
    focusInput(index) {
      this.$nextTick(() => {
        const input = this.$refs[`input-${index}`];
        if (input && input[0]) {
          input[0].focus();
        }
      });
    },
    emitValue() {
      const value = this.code.join('');
      this.$emit('input', value);
      
      // 如果所有输入框都填满了，触发 complete 事件
      if (value.length === this.length) {
        this.$emit('complete', value);
      }
    },
    clear() {
      this.code = Array(this.length).fill('');
      this.focusInput(0);
      this.emitValue();
    }
  }
};
</script>
