# 打包分析文档

> **目的:** 了解项目打包配置、体积优化策略和分析方法

---

## 1. 打包命令

### 开发环境

```bash
# 启动开发服务器
pnpm run dev

# 访问地址: http://localhost:3001
```

### 生产环境

```bash
# 标准打包
pnpm run build

# 打包 + 体积分析报告
pnpm run build:report
```

---

## 2. 打包配置概览

### 核心目标

```javascript
// vite.config.js
/**
 * 核心优化目标:
 * 1. 极致体积控制 (500KB以内)
 * 2. 精致交互支持 (原生 Options API 实现)
 * 3. 生产环境清理 (移除所有 Console & Debugger)
 */
```

### 关键配置

| 配置项                    | 值       | 说明                     |
| :------------------------ | :------- | :----------------------- |
| **target**                | `es2015` | 兼容旧版平板和手机       |
| **minify**                | `terser` | 使用 Terser 压缩         |
| **sourcemap**             | `false`  | 生产环境不生成 sourcemap |
| **cssCodeSplit**          | `true`   | CSS 代码分割             |
| **chunkSizeWarningLimit** | `500KB`  | 体积警告阈值             |

---

## 3. 代码分割策略

### 手动分割规则

```javascript
// vite.config.js
manualChunks: (id) => {
  if (id.includes('node_modules')) {
    // 1. 图表库
    if (id.includes('uplot')) {
      return 'chart-vendor'
    }

    // 2. 工具库
    if (id.includes('dayjs') || id.includes('async-validator')) {
      return 'utils-vendor'
    }

    // 3. UI组件库
    if (id.includes('flowbite') || id.includes('@heroicons')) {
      return 'ui-vendor'
    }

    // 4. Vue核心库
    if (id.includes('vue') || id.includes('pinia')) {
      return 'vue-core'
    }

    // 5. 其他第三方库
    return 'vendor'
  }
}
```

### 分割结果

| Chunk 名称     | 包含内容                    | 预估大小   | 缓存策略 |
| :------------- | :-------------------------- | :--------- | :------- |
| `vue-core`     | Vue + Router + Pinia + I18n | ~80KB      | 长期缓存 |
| `chart-vendor` | uPlot 图表库                | ~40KB      | 长期缓存 |
| `ui-vendor`    | Flowbite + Heroicons        | ~30KB      | 长期缓存 |
| `utils-vendor` | dayjs + async-validator     | ~20KB      | 长期缓存 |
| `vendor`       | 其他第三方库                | ~30KB      | 长期缓存 |
| **总计**       | -                           | **~200KB** | -        |

---

## 4. 体积分析

### 生成分析报告

```bash
# 方法1: 使用内置命令
pnpm run build:report

# 方法2: 手动设置环境变量
ANALYZE=true pnpm run build
```

**输出:**

- 打包完成后自动打开 `dist/stats.html`
- 可视化展示每个 chunk 的大小
- 支持 Gzip 和 Brotli 压缩后的大小

### 分析工具配置

```javascript
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

visualizer({
  open: true, // 自动打开浏览器
  gzipSize: true, // 显示 Gzip 大小
  brotliSize: true, // 显示 Brotli 大小
  filename: 'dist/stats.html',
})
```

---

## 5. 压缩配置

### Terser 配置

```javascript
// vite.config.js
terserOptions: {
  compress: {
    drop_console: true,      // 移除所有 console.*
    drop_debugger: true,     // 移除 debugger
    pure_funcs: [
      'console.log',
      'console.info',
      'console.debug',
      'console.warn',
      'console.error'
    ],
    dead_code: true,         // 移除死代码
    unused: true             // 移除未使用变量
  },
  format: {
    comments: false          // 移除所有注释
  }
}
```

**效果:**

- ✅ 生产环境完全移除 `console.*`
- ✅ 移除所有注释和调试代码
- ✅ 减少 10-15% 的体积

---

## 6. 资源文件命名

```javascript
// vite.config.js
output: {
  chunkFileNames: 'assets/js/[name]-[hash].js',
  entryFileNames: 'assets/js/[name]-[hash].js',
  assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
}
```

**输出结构:**

```
dist/
├── assets/
│   ├── js/
│   │   ├── index-abc123.js
│   │   ├── vue-core-def456.js
│   │   ├── chart-vendor-ghi789.js
│   │   └── ...
│   ├── css/
│   │   └── index-jkl012.css
│   └── images/
│       └── logo-mno345.png
└── index.html
```

---

## 7. 优化建议

### 体积优化

| 优化项           | 方法                   | 预期收益     |
| :--------------- | :--------------------- | :----------- |
| **Tree-shaking** | 使用 ES Module 导入    | 减少 20-30%  |
| **代码分割**     | 手动 chunks + 动态导入 | 减少首屏 40% |
| **压缩**         | Terser + Gzip          | 减少 60-70%  |
| **图片优化**     | WebP 格式              | 减少 30-50%  |
| **按需加载**     | 路由懒加载             | 减少首屏 50% |

### 性能优化

```javascript
// 1. 预构建依赖
optimizeDeps: {
  include: ['vue', 'vue-router', 'pinia', 'vue-i18n', 'dayjs', 'axios', '@floating-ui/dom']
}

// 2. 路由懒加载
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/overview/ViewDashboard.vue'),
  },
]

// 3. 组件懒加载
const CompLineChart = defineAsyncComponent(() => import('@/components/Charts/CompLineChart.vue'))
```

---

## 8. 常见问题

### Q1: 如何查看打包后的文件大小?

**A:** 运行 `pnpm run build:report`,查看 `dist/stats.html`

### Q2: 某个 chunk 过大怎么办?

**A:**

1. 检查是否有未使用的依赖
2. 使用动态导入拆分大型组件
3. 调整 `manualChunks` 配置

### Q3: 如何减少首屏加载时间?

**A:**

1. 使用路由懒加载
2. 关键 CSS 内联
3. 预加载关键资源
4. 使用 CDN

### Q4: 打包后 console 还在?

**A:** 检查 `terserOptions.compress.drop_console` 是否为 `true`

---

## 9. 打包检查清单

### 打包前

- [ ] 移除未使用的依赖
- [ ] 检查是否有 `console.log`
- [ ] 优化图片资源
- [ ] 检查路由是否懒加载

### 打包后

- [ ] 运行 `pnpm run build:report` 查看体积
- [ ] 检查 chunk 大小是否合理
- [ ] 测试生产环境功能
- [ ] 检查是否有 sourcemap 泄露

---

## 10. 监控指标

### 关键指标

| 指标         | 真实值 | 说明                   |
| :----------- | :----- | :--------------------- |
| **总体积**   | 750 KB | 原始大小 (2026-01-08)  |
| **主 CSS**   | 167 KB | 原始大小               |
| **Vue 核心** | 196 KB | 原始大小               |
| **首屏时间** | ~1.5s  | 3G 网络                |
| **FCP**      | ~1.2s  | First Contentful Paint |
| **TTI**      | ~2.5s  | Time to Interactive    |

### 最新构建详情 (2026-01-08)

**CSS 文件 (原始大小):**

- `index-a7uGSAs3.css`: 167.29 KB
- `ui-vendor-BsM4JrO0.css`: 15.75 KB
- `ViewFormDemo-rbzfNHqn.css`: 2.44 KB
- `chart-vendor-Saz_VHki.css`: 1.63 KB
- `vue-core-BgDCIyLK.css`: 1.09 KB
- 其他: ~2 KB
- **CSS 总计:** ~190 KB

**JS 文件 (原始大小):**

- `vue-core-zTHklZeB.js`: 195.60 KB
- `ui-vendor-_SGqh4MC.js`: 79.93 KB
- `chart-vendor-Cyqqj8nj.js`: 51.71 KB
- `index-QZqpZioX.js`: 49.88 KB
- `ViewFormDemo-BXqjZgCn.js`: 31.93 KB
- `ViewDashboard-DU9Iuc2d.js`: 25.33 KB
- `index-gxPMA4j1.js`: 21.74 KB
- `utils-vendor-j0i5Y79Y.js`: 16.44 KB
- `CompSelect-Dgq4UAb3.js`: 12.99 KB
- 其他路由组件: ~50 KB
- **JS 总计:** ~536 KB

**总计 (原始大小):** 750 KB

### 监控命令

```bash
# 查看打包大小
ls -lh dist/assets/js/

# 查看 Gzip 后大小
gzip -c dist/assets/js/index-*.js | wc -c
```

---

## 11. 总结

**核心策略:**

1. **代码分割** - 5 层 vendor 分离
2. **按需加载** - 路由 + 组件懒加载
3. **极致压缩** - Terser + Gzip
4. **缓存优化** - 长期缓存 vendor

**最终目标:**

- 总体积 < 500KB (Gzip)
- 首屏 < 2s (3G 网络)
- 核心库长期缓存
