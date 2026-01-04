<template>
  <div class="flex items-center space-x-1">
    <svg
      v-for="star in totalStars"
      :key="star"
      :class="starClasses(star)"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
      @click="handleStarClick(star)"
    >
      <path
        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'CompRating',
  props: {
    rating: {
      type: Number,
      required: true,
      validator: (value) => value >= 0 && value <= 5,
    },
    totalStars: {
      type: Number,
      default: 5,
    },
    size: {
      type: String,
      default: 'base',
      validator: (value) => ['sm', 'base', 'md', 'lg'].includes(value),
    },
    readonly: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    sizeClasses() {
      const sizeMap = {
        sm: 'w-5 h-5',
        base: 'w-6 h-6',
        md: 'w-7 h-7',
        lg: 'w-8 h-8',
      }
      return sizeMap[this.size]
    },
  },
  methods: {
    starClasses(starIndex) {
      const filled = starIndex <= this.rating
      const colorClass = filled
        ? 'text-yellow-400 dark:text-yellow-300'
        : 'text-gray-300 dark:text-gray-600'
      const cursorClass = this.readonly
        ? ''
        : 'cursor-pointer hover:text-yellow-500 transition-colors'

      return `${this.sizeClasses} ${colorClass} ${cursorClass}`
    },
    handleStarClick(starIndex) {
      if (!this.readonly) {
        this.$emit('update:rating', starIndex)
        this.$emit('change', starIndex)
      }
    },
  },
}
</script>
