<template>
  <div
    :style="containerStyle"
    class="inline-flex items-center justify-center font-medium rounded-full"
  >
    <span v-if="!image" :style="textStyle">{{ initials }}</span>
    <img v-else :src="image" :alt="name" class="w-full h-full rounded-full object-cover" />
  </div>
</template>

<script>
export default {
  name: 'CompAvatar',
  props: {
    name: {
      type: String,
      default: 'User',
    },
    size: {
      type: [String, Number],
      default: 24,
    },
    backgroundColor: {
      type: String,
      default: '#0D8ABC',
    },
    textColor: {
      type: String,
      default: '#ffffff',
    },
    image: {
      type: String,
      default: '',
    },
  },
  computed: {
    initials() {
      if (!this.name) return 'U'
      const names = this.name.trim().split(' ')
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase()
      }
      return this.name[0].toUpperCase()
    },
    sizeValue() {
      return typeof this.size === 'number' ? this.size : parseInt(this.size)
    },
    containerStyle() {
      const size = this.sizeValue
      return {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: this.backgroundColor,
        fontSize: `${size * 0.4}px`,
      }
    },
    textStyle() {
      return {
        color: this.textColor,
      }
    },
  },
}
</script>
