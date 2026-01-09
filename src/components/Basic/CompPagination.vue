<template>
  <nav aria-label="Page navigation">
    <div class="inline-flex rounded-lg shadow-xs -space-x-px" role="group">
      <!-- Previous Button -->
      <button
        :title="$t ? $t('pagination.previous') : '上一页'"
        type="button"
        :disabled="!hasPrev"
        :class="prevButtonClasses"
        @click="handlePrev"
      >
        <svg
          class="w-4 h-4"
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
            d="m15 19-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Page Indicator -->
      <button
        type="button"
        class="inline-flex shrink-0 text-sm items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading leading-5 px-3 h-9 focus:outline-none"
      >
        {{ currentPage }} of {{ totalPages }}
      </button>

      <!-- Next Button -->
      <button
        :title="$t ? $t('pagination.next') : '下一页'"
        type="button"
        :disabled="!hasNext"
        :class="nextButtonClasses"
        @click="handleNext"
      >
        <svg
          class="w-4 h-4"
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
            d="m9 5 7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'CompPagination',
  props: {
    modelValue: {
      type: Number,
      default: 1,
      validator: (value) => value >= 1,
    },
    total: {
      type: Number,
      required: true,
      validator: (value) => value >= 0,
    },
    pageSize: {
      type: Number,
      default: 10,
      validator: (value) => value > 0,
    },
  },
  emits: ['update:modelValue', 'change'],
  computed: {
    currentPage() {
      return this.modelValue
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.total / this.pageSize))
    },
    hasPrev() {
      return this.currentPage > 1
    },
    hasNext() {
      return this.currentPage < this.totalPages
    },
    prevButtonClasses() {
      const baseClasses =
        'inline-flex items-center justify-center text-body bg-neutral-secondary-medium rounded-s-lg box-border border border-default-medium leading-5 w-9 h-9 focus:outline-none'
      const activeClasses =
        'hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-3 focus:ring-neutral-tertiary'
      const disabledClasses = 'opacity-50 cursor-not-allowed'

      return this.hasPrev ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${disabledClasses}`
    },
    nextButtonClasses() {
      const baseClasses =
        'inline-flex items-center justify-center text-body bg-neutral-secondary-medium rounded-e-lg box-border border border-default-medium leading-5 w-9 h-9 focus:outline-none'
      const activeClasses =
        'hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-3 focus:ring-neutral-tertiary'
      const disabledClasses = 'opacity-50 cursor-not-allowed'

      return this.hasNext ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${disabledClasses}`
    },
  },
  methods: {
    handlePrev() {
      if (this.hasPrev) {
        const newPage = this.currentPage - 1
        this.$emit('update:modelValue', newPage)
        this.$emit('change', newPage)
      }
    },
    handleNext() {
      if (this.hasNext) {
        const newPage = this.currentPage + 1
        this.$emit('update:modelValue', newPage)
        this.$emit('change', newPage)
      }
    },
  },
}
</script>
