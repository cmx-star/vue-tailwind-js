import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    createVuePlugin(),
    tailwindcss(),
    process.env.ANALYZE === "true" &&
      visualizer({
        open: true,
        filename: "dist/stats.html",
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  server: {
    port: 3001,
    host: true,
    open: true,
  },

  build: {
    target: "es2015",
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1].toLowerCase();
          if (
            /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)
          ) {
            return `assets/media/[name]-[hash].[ext]`;
          }
          if (/\.(png|jpe?g|gif|svg|ico|webp)(\?.*)?$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].[ext]`;
          }
          if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            return `assets/font/[name]-[hash].[ext]`;
          }
          if (ext === "css") {
            return `assets/css/[name]-[hash].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("frappe-charts")) {
              return "vendor-charts";
            }
            if (id.includes("flatpickr")) {
              return "vendor-calendar";
            }
            if (
              id.includes("vue") ||
              id.includes("vue-router") ||
              id.includes("vuex") ||
              id.includes("vue-i18n") ||
              id.includes("dayjs")
            ) {
              return "vendor-core";
            }
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },

  optimizeDeps: {
    include: [
      "vue",
      "vue-router",
      "vuex",
      "vue-i18n",
      "dayjs",
      "@floating-ui/vue",
      "frappe-charts",
    ],
  },
});
