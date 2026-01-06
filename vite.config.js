import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

/**
 * 核心优化目标：
 * 1. 极致体积控制 (500KB以内)
 * 2. 精致交互支持 (Floating-UI & VueUse 预构建)
 * 3. 生产环境清理 (移除所有 Console & Debugger)
 */
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      tailwindcss(), // Tailwind v4 官方 Vite 插件
      // 自动引入组件
      Components({
        dirs: ['src/components'], // 搜索组件的目录
        extensions: ['vue'],
        deep: true,
        dts: false, // 如果需要 TS 支持可以开启，JS 项目建议关闭或按需开启
      }),
      // 自动导入 Vue 常用函数
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
        dts: false,
      }),
      // 打包分析工具 (仅在 analyze 模式下启用: npm run build:report)
      mode === 'analyze' &&
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: 'dist/stats.html',
        }),
    ].filter(Boolean),

    resolve: {
      alias: {
        // 快捷路径指向
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      port: 3001,
      host: true,
      open: true,
    },

    build: {
      target: 'es2015', // 保证在旧版平板和手机上的兼容性
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,

      /**
       * 极致代码分割策略
       * 目的：确保首屏 Index.js 最小，非核心组件按需加载
       */
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // Unovis 图表库
              if (id.includes('@unovis')) {
                return 'chart-vendor'
              }
              // 2. Vue 核心全家桶（不含图表库）
              if (id.includes('vue') || id.includes('vue-router') || id.includes('pinia')) {
                return 'vue-core'
              }
              // 3. 较重的日期选择器独立分包，避免阻塞主包
              if (id.includes('@vuepic/vue-datepicker')) {
                return 'datepicker-vendor'
              }
              // 4. UI 框架类
              if (id.includes('flowbite') || id.includes('@heroicons')) {
                return 'ui-vendor'
              }
              // 5. 国际化与时间处理工具
              if (id.includes('axios') || id.includes('dayjs') || id.includes('vue-i18n')) {
                return 'utils-vendor'
              }
              // 其他第三方依赖
              return 'vendor'
            }
          },
          // 资源文件精细化分类命名
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },

      /**
       * Terser 极致压缩配置
       * 生产环境移除所有调试信息，减小体积并提升代码安全性
       */
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // 移除所有 console.*
          drop_debugger: true,
          pure_funcs: [
            'console.log',
            'console.info',
            'console.debug',
            'console.warn',
            'console.error',
          ],
          dead_code: true,
          unused: true,
        },
        format: {
          comments: false, // 移除所有代码注释
        },
      },

      // 开启 CSS 代码分割，提升样式加载效率
      cssCodeSplit: true,
      // 500KB 警告限制
      chunkSizeWarningLimit: 500,
    },

    /**
     * 依赖预构建配置
     * 包含三端适配的核心库，提升开发环境响应速度
     */
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'pinia',
        'vue-i18n',
        'dayjs',
        'axios',
        '@floating-ui/vue', // 碰撞检测核心
        '@vueuse/core', // 三端监听核心
      ],
    },
  }
})
