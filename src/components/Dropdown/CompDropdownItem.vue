<template>
  <li>
    <a
      :href="href"
      :class="itemClasses"
      @click="handleClick"
    >
      <slot></slot>
    </a>
  </li>
</template>

<script>
export default {
  name: 'CompDropdownItem',
  props: {
    href: {
      type: String,
      default: '#'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    itemClasses() {
      const baseClasses = 'inline-flex items-center w-full p-2 rounded transition-colors duration-150';
      const stateClasses = this.disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white cursor-pointer';
      
      return `${baseClasses} ${stateClasses}`;
    }
  },
  methods: {
    handleClick(event) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      
      event.preventDefault();
      this.$emit('click', event);
      
      // 通知父组件关闭下拉菜单
      this.$parent.$emit('item-click');
    }
  }
};
</script>
