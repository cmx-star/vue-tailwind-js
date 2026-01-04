<template>
  <div class="flex items-center justify-center w-full">
    <label v-if="variant === 'dropzone'" :for="inputId" :class="dropzoneClasses">
      <div
        class="flex flex-col items-center justify-center text-gray-700 dark:text-gray-400 pt-5 pb-6"
      >
        <svg
          class="w-8 h-8 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
          />
        </svg>
        <p class="mb-2 text-sm">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs">{{ acceptText }}</p>
      </div>
      <input
        :id="inputId"
        type="file"
        class="hidden"
        :accept="accept"
        :multiple="multiple"
        @change="handleFileChange"
      />
    </label>

    <div
      v-else
      class="flex flex-col items-center justify-center w-full h-64 bg-gray-50 dark:bg-gray-700 border border-dashed border-gray-400 dark:border-gray-500 rounded-lg"
    >
      <div
        class="flex flex-col items-center justify-center text-gray-700 dark:text-gray-400 pt-5 pb-6"
      >
        <svg
          class="w-8 h-8 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"
          />
        </svg>
        <p class="mb-2 text-sm">Click the button below to upload</p>
        <p class="text-xs mb-4">
          Max. File Size: <span class="font-semibold">{{ maxSize }}</span>
        </p>
        <button
          type="button"
          class="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 border border-transparent focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-sm font-medium rounded-lg text-sm px-3 py-2 focus:outline-none"
          @click="$refs.fileInput.click()"
        >
          <svg
            class="w-4 h-4 me-1.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
          Browse file
        </button>
      </div>
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        :accept="accept"
        :multiple="multiple"
        @change="handleFileChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompFileUpload',
  props: {
    variant: {
      type: String,
      default: 'dropzone',
      validator: (value) => ['dropzone', 'button'].includes(value),
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    acceptText: {
      type: String,
      default: 'SVG, PNG, JPG or GIF (MAX. 800x400px)',
    },
    maxSize: {
      type: String,
      default: '30MB',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputId() {
      return `file-upload-${Math.random().toString(36).substr(2, 9)}`
    },
    dropzoneClasses() {
      return 'flex flex-col items-center justify-center w-full h-64 bg-gray-50 dark:bg-gray-700 border border-dashed border-gray-400 dark:border-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600'
    },
  },
  methods: {
    handleFileChange(event) {
      const files = event.target.files
      this.$emit('change', files)

      if (files.length > 0) {
        const fileNames = Array.from(files)
          .map((f) => f.name)
          .join(', ')
        this.$toast.success({
          title: 'File Selected',
          message: `Selected: ${fileNames}`,
          duration: 2000,
        })
      }
    },
  },
}
</script>
