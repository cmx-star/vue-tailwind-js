import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      tailwindcss(),
      // 打包分析工具 (仅在 analyze 模式下启用)
      mode === "analyze" &&
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: "dist/stats.html",
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

      // 代码分割策略
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // // ECharts 单独打包
            // if (id.includes("echarts")) {
            //   return "echarts-vendor";
            // }
            // Vue 核心库
            if (id.includes("node_modules")) {
              if (
                id.includes("vue") ||
                id.includes("vue-router") ||
                id.includes("pinia")
              ) {
                return "vue-vendor";
              }
              // UI 库
              if (id.includes("flowbite")) {
                return "ui-vendor";
              }
              // 工具库
              if (
                id.includes("axios") ||
                id.includes("dayjs") ||
                id.includes("vue-i18n")
              ) {
                return "utils-vendor";
              }
              // 其他 node_modules
              return "vendor";
            }
          },
          // 资源文件命名
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },

      // 压缩配置
      minify: "terser",
      terserOptions: {
        compress: {
          // 移除所有 console 语句
          drop_console: true,
          // 移除 debugger 语句
          drop_debugger: true,
          // 移除指定的纯函数调用（额外的安全措施）
          pure_funcs: [
            "console.log",
            "console.info",
            "console.debug",
            "console.warn",
            "console.error",
            "console.trace",
            "console.table",
            "console.group",
            "console.groupEnd",
            "console.time",
            "console.timeEnd",
          ],
          // 移除未使用的代码
          dead_code: true,
          // 移除未使用的变量
          unused: true,
        },
        format: {
          // 移除注释
          comments: false,
        },
      },

      // CSS 代码分割
      cssCodeSplit: true,

      // chunk 大小警告限制
      chunkSizeWarningLimit: 500,
    },

    // 优化依赖预构建
    optimizeDeps: {
      include: ["vue", "vue-router", "pinia", "vue-i18n", "dayjs", "axios"],
    },
  };
});
