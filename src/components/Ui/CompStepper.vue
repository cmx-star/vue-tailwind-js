<template>
  <ol :class="containerClasses">
    <li v-for="(step, index) in steps" :key="index" :class="stepClasses(index)">
      <span :class="iconContainerClasses(index)">
        <!-- Completed Icon -->
        <svg
          v-if="index < currentStep"
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 11.917 9.724 16.5 19 7.5"
          />
        </svg>
        <!-- Step Number -->
        <span v-else>{{ index + 1 }}</span>
      </span>
      <span v-if="layout === 'vertical'">
        <h3 class="font-medium leading-tight">{{ step.title }}</h3>
        <p v-if="step.description" class="text-sm">{{ step.description }}</p>
      </span>
      <span v-else class="flex items-center">
        {{ step.title }}
        <span v-if="step.subtitle" class="hidden sm:inline-flex sm:ms-2">{{ step.subtitle }}</span>
      </span>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'CompStepper',
  props: {
    steps: {
      type: Array,
      required: true,
      validator: (steps) => steps.every((step) => step.title),
    },
    currentStep: {
      type: Number,
      default: 0,
    },
    layout: {
      type: String,
      default: 'horizontal',
      validator: (value) => ['horizontal', 'vertical'].includes(value),
    },
  },
  computed: {
    containerClasses() {
      if (this.layout === 'vertical') {
        return 'items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse'
      }
      return 'flex items-center w-full text-sm font-medium text-center text-gray-700 dark:text-gray-400 sm:text-base'
    },
  },
  methods: {
    stepClasses(index) {
      const isCompleted = index < this.currentStep
      const isActive = index === this.currentStep
      const isLast = index === this.steps.length - 1

      if (this.layout === 'vertical') {
        const textColor =
          isCompleted || isActive
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-700 dark:text-gray-400'
        return `flex items-center ${textColor} space-x-3 rtl:space-x-reverse`
      }

      const textColor = isCompleted || isActive ? 'text-blue-600 dark:text-blue-400' : ''
      const afterClasses = !isLast
        ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 dark:after:border-gray-700 after:border-px after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10"
        : ''
      const slashClasses = !isLast
        ? "after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-400"
        : ''

      return `flex md:w-full items-center ${textColor} ${afterClasses} ${slashClasses}`.trim()
    },
    iconContainerClasses(index) {
      const isCompleted = index < this.currentStep
      const isActive = index === this.currentStep

      if (this.layout === 'vertical') {
        const bgColor =
          isCompleted || isActive
            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
        return `flex items-center justify-center w-10 h-10 ${bgColor} rounded-full lg:h-12 lg:w-12 shrink-0`
      }

      return 'flex items-center me-1.5'
    },
  },
}
</script>
