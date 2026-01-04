<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="text-center">
      <h1 class="text-9xl font-extrabold text-blue-600 tracking-widest">404</h1>
      <div class="bg-blue-600 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button class="mt-5">
        <router-link
          to="/"
          class="relative inline-block text-sm font-medium text-blue-600 group active:text-blue-500 focus:outline-none focus:ring"
        >
          <span
            class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-600 group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>
          <span class="relative block px-8 py-3 bg-white border border-current">
            Go Home
          </span>
        </router-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "View404"
};
</script>
