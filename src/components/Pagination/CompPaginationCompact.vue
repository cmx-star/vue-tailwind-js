<template>
  <nav aria-label="Page navigation">
    <div class="inline-flex rounded-lg shadow-sm -space-x-px" role="group">
      <!-- Previous Button -->
      <button
        type="button"
        :class="prevButtonClasses"
        :disabled="currentPage === 1"
        @click="handlePrevious"
      >
        <svg
          class="w-4 h-4"
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
      </button>

      <!-- Page Info -->
      <button
        type="button"
        :class="pageInfoClasses"
      >
        {{ currentPage }} of {{ totalPages }}
      </button>

      <!-- Next Button -->
      <button
        type="button"
        :class="nextButtonClasses"
        :disabled="currentPage === totalPages"
        @click="handleNext"
      >
        <svg
          class="w-4 h-4"
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
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'CompPaginationCompact',
  props: {
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    baseButtonClasses() {
      return 'inline-flex items-center justify-center text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 leading-5 h-9 w-9';
    },
    prevButtonClasses() {
      return `${this.baseButtonClasses} rounded-s-lg ${this.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`;
    },
    nextButtonClasses() {
      return `${this.baseButtonClasses} rounded-e-lg ${this.currentPage === this.totalPages ? 'opacity-50 cursor-not-allowed' : ''}`;
    },
    pageInfoClasses() {
      return 'inline-flex shrink-0 text-sm items-center justify-center text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white leading-5 px-3 h-9 focus:outline-none';
    }
  },
  methods: {
    handlePrevious() {
      if (this.currentPage > 1) {
        this.$emit('update:currentPage', this.currentPage - 1);
        this.$emit('change', this.currentPage - 1);
      }
    },
    handleNext() {
      if (this.currentPage < this.totalPages) {
        this.$emit('update:currentPage', this.currentPage + 1);
        this.$emit('change', this.currentPage + 1);
      }
    }
  }
};
</script>
