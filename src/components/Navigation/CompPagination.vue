<template>
  <nav aria-label="Page navigation" :class="containerClasses">
    <ul class="flex -space-x-px text-sm">
      <!-- Previous Button -->
      <li>
        <a
          href="#"
          :class="[prevClasses, { 'opacity-50 cursor-not-allowed': currentPage === 1 }]"
          @click.prevent="handlePrevious"
        >
          <span v-if="showText" class="sr-only md:not-sr-only">Previous</span>
          <svg
            v-else
            class="w-4 h-4 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m15 19-7-7 7-7"
            />
          </svg>
        </a>
      </li>

      <!-- Page Numbers -->
      <li v-for="page in visiblePages" :key="page">
        <a
          v-if="page !== '...'"
          href="#"
          :class="page === currentPage ? activePageClasses : pageClasses"
          :aria-current="page === currentPage ? 'page' : undefined"
          @click.prevent="handlePageClick(page)"
        >
          {{ page }}
        </a>
        <span v-else :class="pageClasses">...</span>
      </li>

      <!-- Next Button -->
      <li>
        <a
          href="#"
          :class="[nextClasses, { 'opacity-50 cursor-not-allowed': currentPage === totalPages }]"
          @click.prevent="handleNext"
        >
          <span v-if="showText" class="sr-only md:not-sr-only">Next</span>
          <svg
            v-else
            class="w-4 h-4 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </a>
      </li>
    </ul>

    <!-- Page Size Selector -->
    <select
      v-if="showPageSize"
      v-model="localPageSize"
      :class="selectClasses"
      @change="handlePageSizeChange"
    >
      <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }} per page</option>
    </select>
  </nav>
</template>

<script>
export default {
  name: 'CompPagination',
  props: {
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    maxVisiblePages: {
      type: Number,
      default: 5,
    },
    showText: {
      type: Boolean,
      default: true,
    },
    showPageSize: {
      type: Boolean,
      default: false,
    },
    pageSizeOptions: {
      type: Array,
      default: () => [10, 25, 50, 100],
    },
    size: {
      type: String,
      default: 'base',
      validator: (value) => ['sm', 'base'].includes(value),
    },
  },
  data() {
    return {
      localPageSize: this.pageSize,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.localPageSize)
    },
    containerClasses() {
      return this.showPageSize ? 'flex items-center space-x-4' : ''
    },
    baseClasses() {
      return 'flex items-center justify-center text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-150 focus:outline-none'
    },
    sizeClasses() {
      return this.size === 'sm' ? 'text-sm h-9' : 'text-sm h-10'
    },
    prevClasses() {
      const width = this.showText ? 'px-3' : this.size === 'sm' ? 'w-9' : 'w-10'
      return `${this.baseClasses} ${this.sizeClasses} ${width} rounded-s-lg`
    },
    nextClasses() {
      const width = this.showText ? 'px-3' : this.size === 'sm' ? 'w-9' : 'w-10'
      return `${this.baseClasses} ${this.sizeClasses} ${width} rounded-e-lg`
    },
    pageClasses() {
      const width = this.size === 'sm' ? 'w-9' : 'w-10'
      return `${this.baseClasses} ${this.sizeClasses} ${width}`
    },
    activePageClasses() {
      const width = this.size === 'sm' ? 'w-9' : 'w-10'
      return `flex items-center justify-center text-blue-600 bg-gray-100 dark:bg-gray-700 dark:text-blue-400 border border-gray-200 dark:border-gray-700 font-medium ${this.sizeClasses} ${width} focus:outline-none`
    },
    selectClasses() {
      return 'block w-32 px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm'
    },
    visiblePages() {
      const pages = []
      const total = this.totalPages
      const current = this.currentPage
      const max = this.maxVisiblePages

      if (total <= max) {
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        const half = Math.floor(max / 2)
        let start = current - half
        let end = current + half

        if (start < 1) {
          start = 1
          end = max
        }
        if (end > total) {
          end = total
          start = total - max + 1
        }

        if (start > 1) {
          pages.push(1)
          if (start > 2) pages.push('...')
        }

        for (let i = start; i <= end; i++) {
          pages.push(i)
        }

        if (end < total) {
          if (end < total - 1) pages.push('...')
          pages.push(total)
        }
      }

      return pages
    },
  },
  watch: {
    pageSize(newVal) {
      this.localPageSize = newVal
    },
  },
  methods: {
    handlePrevious() {
      if (this.currentPage > 1) {
        this.$emit('update:currentPage', this.currentPage - 1)
        this.$emit('change', this.currentPage - 1)
      }
    },
    handleNext() {
      if (this.currentPage < this.totalPages) {
        this.$emit('update:currentPage', this.currentPage + 1)
        this.$emit('change', this.currentPage + 1)
      }
    },
    handlePageClick(page) {
      if (page !== this.currentPage) {
        this.$emit('update:currentPage', page)
        this.$emit('change', page)
      }
    },
    handlePageSizeChange() {
      this.$emit('update:pageSize', this.localPageSize)
      this.$emit('page-size-change', this.localPageSize)
      this.$emit('update:currentPage', 1)
      this.$emit('change', 1)
    },
  },
}
</script>
