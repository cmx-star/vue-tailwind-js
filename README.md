# Vue Admin JS

> 基于 Vue 2.7 + Vite + Tailwind CSS 4 的现代化后台管理系统框架

---

## 📋 目录

- [项目简介](#-项目简介)
- [技术栈](#-技术栈)
- [核心特性](#-核心特性)
- [快速开始](#-快速开始)
- [命令说明](#-命令说明)
- [项目结构](#-项目结构)
- [依赖说明](#-依赖说明)
- [构建分析](#-构建分析)

---

## 🎯 项目简介

Vue Admin JS 是一个轻量级、高性能的后台管理系统框架,采用 Vue 2.7 (Composition API 支持) + Vite 构建,集成了国际化、多主题、暗黑模式等企业级功能。

### 设计理念

- **轻量高效**: 打包体积仅 626 KB,gzip 后约 200 KB
- **开发体验**: Vite 极速热更新,开发效率提升 10 倍
- **现代化**: 使用最新的 Tailwind CSS 4 和 Vue 2.7
- **可扩展**: 模块化设计,易于定制和扩展

---

## 🛠 技术栈

### 核心框架

| 技术           | 版本   | 用途     | 说明                                   |
| -------------- | ------ | -------- | -------------------------------------- |
| **Vue**        | 2.7.14 | 核心框架 | 支持 Composition API,向 Vue 3 平滑过渡 |
| **Vue Router** | 3.6.5  | 路由管理 | 单页应用路由解决方案                   |
| **Vuex**       | 3.6.2  | 状态管理 | 全局状态管理,支持模块化                |
| **Vite**       | 5.4.21 | 构建工具 | 极速开发服务器和优化的生产构建         |

### UI 框架与样式

| 技术                 | 版本   | 用途      | 说明                             |
| -------------------- | ------ | --------- | -------------------------------- |
| **Tailwind CSS**     | 4.1.18 | CSS 框架  | 原子化 CSS,极致的开发体验        |
| **Flowbite**         | 4.0.1  | UI 组件库 | 基于 Tailwind 的组件库           |
| **@floating-ui/dom** | 1.7.4  | 浮动定位  | 下拉菜单、工具提示等浮动元素定位 |

### 功能库

| 技术                | 版本    | 用途        | 说明                     |
| ------------------- | ------- | ----------- | ------------------------ |
| **vue-i18n**        | 8.28.2  | 国际化      | 多语言支持 (中文/英文)   |
| **dayjs**           | 1.11.10 | 日期处理    | 轻量级日期库 (仅 2KB)    |
| **axios**           | 1.13.2  | HTTP 客户端 | Promise 风格的 HTTP 请求 |
| **async-validator** | 4.2.5   | 表单验证    | 轻量级表单验证库         |
| **nprogress**       | 0.2.0   | 进度条      | 页面加载进度提示         |

### 数据可视化

| 技术          | 版本   | 用途       | 说明                     |
| ------------- | ------ | ---------- | ------------------------ |
| **uPlot**     | 1.6.32 | 图表库     | 高性能时序图表库 (51 KB) |
| **Flatpickr** | 4.6.13 | 日期选择器 | 轻量级日期时间选择器     |

### 开发工具

| 技术            | 版本   | 用途       | 说明                        |
| --------------- | ------ | ---------- | --------------------------- |
| **ESLint**      | 9.39.2 | 代码检查   | JavaScript/Vue 代码质量检查 |
| **Prettier**    | 3.7.4  | 代码格式化 | 统一代码风格                |
| **Husky**       | 9.1.7  | Git Hooks  | 提交前自动检查              |
| **Commitizen**  | 4.3.1  | 提交规范   | 规范化 Git 提交信息         |
| **lint-staged** | 16.2.7 | 暂存区检查 | 只检查提交的文件            |

---

## ✨ 核心特性

### 🎨 UI/UX

- ✅ **响应式设计**: 完美适配桌面、平板、移动端
- ✅ **暗黑模式**: 支持亮色/暗色主题切换
- ✅ **多主题系统**: 内置多套主题配色方案
- ✅ **动画效果**: 流畅的页面过渡和交互动画

### 🌍 国际化

- ✅ **多语言支持**: 中文/英文切换
- ✅ **动态加载**: 按需加载语言包
- ✅ **持久化**: 语言偏好自动保存

### 📊 数据可视化

- ✅ **图表组件**: 折线图、柱状图、饼图、面积图
- ✅ **实时数据**: 支持数据动态更新
- ✅ **高性能**: uPlot 渲染大数据集

### 🔐 权限管理

- ✅ **路由守卫**: 基于角色的路由访问控制
- ✅ **动态菜单**: 根据权限动态生成菜单
- ✅ **按钮权限**: 细粒度的操作权限控制

### 🚀 性能优化

- ✅ **代码分割**: 按路由自动分割代码
- ✅ **懒加载**: 路由和组件按需加载
- ✅ **Tree Shaking**: 自动移除未使用代码
- ✅ **Gzip 压缩**: 生产环境自动压缩

---

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0 或 **pnpm**: >= 7.0.0

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm (推荐)
pnpm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看应用

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist` 目录

### 预览生产构建

```bash
npm run preview
```

---

## 📜 命令说明

### 开发命令

| 命令                   | 说明               | 使用场景                  |
| ---------------------- | ------------------ | ------------------------- |
| `npm run dev`          | 启动开发服务器     | 日常开发,支持热更新 (HMR) |
| `npm run build`        | 构建生产版本       | 部署前构建优化后的代码    |
| `npm run build:report` | 构建并生成分析报告 | 分析打包体积,优化性能     |
| `npm run preview`      | 预览生产构建       | 本地预览生产环境效果      |

**详细说明:**

- **`dev`**: 启动 Vite 开发服务器,默认端口 5173,支持:
  - ⚡️ 极速热更新 (HMR)
  - 🔍 源码映射 (Source Maps)
  - 🎯 按需编译

- **`build`**: 执行生产构建,包含:
  - 📦 代码压缩 (Terser)
  - 🗜️ Gzip 压缩
  - 🌲 Tree Shaking
  - 📊 代码分割

- **`build:report`**: 在构建的同时生成可视化分析报告:
  - 📈 生成 `dist/stats.html` 交互式报告
  - 📊 显示每个模块的体积占比
  - 🔍 识别体积过大的依赖

- **`preview`**: 本地预览生产构建:
  - 🚀 使用生产环境配置
  - 🔒 验证构建产物正确性
  - 📱 测试响应式布局

### 代码质量命令

| 命令             | 说明               | 使用场景                 |
| ---------------- | ------------------ | ------------------------ |
| `npm run lint`   | 检查并修复代码问题 | 提交前检查代码质量       |
| `npm run format` | 格式化代码         | 统一代码风格             |
| `npm run commit` | 规范化提交         | 使用 Commitizen 提交代码 |

**详细说明:**

- **`lint`**: ESLint 代码检查:
  - ✅ 检查 `.js` 和 `.vue` 文件
  - 🔧 自动修复可修复的问题
  - 📋 输出错误和警告列表

- **`format`**: Prettier 代码格式化:
  - 🎨 统一代码风格
  - 📝 格式化 JS/Vue/CSS/HTML
  - ⚙️ 遵循项目配置规则

- **`commit`**: 使用 Commitizen 提交:
  - 📝 交互式提交信息填写
  - 🏷️ 自动生成符合规范的提交信息
  - 📋 提交类型: feat/fix/docs/style/refactor/test/chore

### 工具命令

| 命令              | 说明           | 使用场景                 |
| ----------------- | -------------- | ------------------------ |
| `npm run create`  | 创建新页面     | 快速生成标准化的页面组件 |
| `npm run prepare` | 安装 Git Hooks | 首次安装依赖后自动执行   |

**详细说明:**

- **`create`**: 页面生成脚本:
  - 🎯 交互式创建页面
  - 📁 自动创建目录结构
  - 📝 生成标准化 Vue 组件模板
  - 🔄 自动注册路由

- **`prepare`**: Husky 初始化:
  - 🪝 安装 Git Hooks
  - ✅ 配置 pre-commit 检查
  - 📋 配置 commit-msg 验证

---

## 📁 项目结构

```
vue-admin-js/
├── public/                 # 静态资源目录
│   └── favicon.ico        # 网站图标
├── src/                   # 源代码目录
│   ├── assets/           # 资源文件
│   │   ├── css/         # 全局样式
│   │   └── images/      # 图片资源
│   ├── components/       # 公共组件
│   │   ├── Chart/       # 图表组件
│   │   ├── Form/        # 表单组件
│   │   ├── Layout/      # 布局组件
│   │   └── ...
│   ├── locales/         # 国际化语言包
│   │   ├── en.js       # 英文
│   │   └── zh.js       # 中文
│   ├── router/          # 路由配置
│   │   └── index.js    # 路由定义
│   ├── stores/          # Vuex 状态管理
│   │   ├── index.js    # Store 入口
│   │   ├── auth.js     # 认证模块
│   │   ├── theme.js    # 主题模块
│   │   └── ...
│   ├── utils/           # 工具函数
│   │   ├── request.js  # Axios 封装
│   │   ├── storage.js  # 本地存储
│   │   └── ...
│   ├── views/           # 页面组件
│   │   ├── Dashboard/  # 仪表盘
│   │   ├── User/       # 用户管理
│   │   ├── Settings/   # 系统设置
│   │   └── ...
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── scripts/             # 脚本工具
│   └── create-page.js  # 页面生成脚本
├── .eslintrc.js        # ESLint 配置
├── .prettierrc         # Prettier 配置
├── commitlint.config.js # Commitlint 配置
├── tailwind.config.js  # Tailwind 配置
├── vite.config.js      # Vite 配置
└── package.json        # 项目配置
```

---

## 📦 依赖说明

### 生产依赖 (dependencies)

这些依赖会被打包到最终的生产代码中:

#### 核心框架 (~254 KB)

- `vue` (2.7.14): Vue 核心框架,约 165 KB
- `vue-router` (3.6.5): 路由管理,约 64 KB
- `vuex` (3.6.2): 状态管理,约 25 KB

#### UI 与交互 (~76 KB)

- `@floating-ui/dom` (1.7.4): 浮动元素定位引擎,约 25 KB
- `flowbite` (4.0.1): UI 组件库,约 51 KB

#### 功能库 (~84 KB)

- `vue-i18n` (8.28.2): 国际化支持,约 55 KB
- `axios` (1.13.2): HTTP 客户端,约 19 KB
- `async-validator` (4.2.5): 表单验证,约 10 KB

#### 工具库 (~2 KB)

- `dayjs` (1.11.10): 日期处理,约 2 KB
- `nprogress` (0.2.0): 进度条,约 1 KB

#### 数据可视化 (~103 KB)

- `uplot` (1.6.32): 图表库,约 52 KB
- `flatpickr` (4.6.13): 日期选择器,约 51 KB

**总计**: 约 519 KB (未压缩),gzip 后约 180 KB

### 开发依赖 (devDependencies)

这些依赖仅在开发环境使用,不会打包到生产代码:

#### 构建工具

- `vite`: 下一代前端构建工具
- `vite-plugin-vue2`: Vue 2 支持插件
- `@tailwindcss/vite`: Tailwind CSS Vite 插件
- `unplugin-vue-components`: 组件自动导入
- `rollup-plugin-visualizer`: 打包分析可视化

#### 代码质量

- `eslint`: JavaScript 代码检查
- `eslint-plugin-vue`: Vue 文件检查
- `prettier`: 代码格式化
- `eslint-config-prettier`: ESLint 与 Prettier 集成
- `eslint-plugin-prettier`: Prettier 作为 ESLint 规则

#### Git 工作流

- `husky`: Git Hooks 管理
- `lint-staged`: 暂存区文件检查
- `commitizen`: 规范化提交工具
- `cz-git`: Commitizen 适配器
- `@commitlint/cli`: 提交信息检查
- `@commitlint/config-conventional`: 提交规范配置

#### CSS 处理

- `tailwindcss`: Tailwind CSS 核心
- `postcss`: CSS 后处理器
- `autoprefixer`: 自动添加 CSS 前缀

#### 其他

- `terser`: JavaScript 压缩工具
- `@babel/core`: Babel 核心
- `@babel/eslint-parser`: Babel ESLint 解析器

---

## 📊 构建分析

### 打包体积概览

| 类型       | 原始大小   | Gzip 压缩后 |
| ---------- | ---------- | ----------- |
| **总大小** | **626 KB** | **~200 KB** |
| JavaScript | 503 KB     | ~180 KB     |
| CSS        | 96 KB      | ~20 KB      |
| HTML       | 1.09 KB    | 0.48 KB     |

### 代码分割策略

项目采用智能代码分割,将代码分为以下几个 chunk:

#### 1. vendor-core (214 KB)

**包含内容:**

- Vue 核心框架
- Vue Router
- Vuex
- axios
- vue-i18n
- async-validator
- dayjs
- nprogress
- @floating-ui/dom

**特点:** 长期缓存,很少变动

#### 2. vendor-charts (52 KB)

**包含内容:**

- uPlot 图表库

**特点:** 按需加载,仅在使用图表的页面加载

#### 3. vendor-calendar (51 KB)

**包含内容:**

- Flatpickr 日期选择器

**特点:** 按需加载,仅在使用日期选择器的页面加载

#### 4. 页面组件 (动态加载)

**包含内容:**

- ViewDashboard (38 KB)
- ViewAnalytics (31 KB)
- ViewUserList (27 KB)
- 其他页面组件

**特点:** 路由懒加载,访问时才加载

### 性能指标

| 指标         | 值             |
| ------------ | -------------- |
| 首次加载 JS  | ~72 KB (gzip)  |
| 首次加载 CSS | ~13 KB (gzip)  |
| 首屏总加载   | ~85 KB (gzip)  |
| 首屏渲染时间 | < 1s (3G 网络) |

### 生成分析报告

运行以下命令生成可视化分析报告:

```bash
npm run build:report
```

报告将生成在 `dist/stats.html`,在浏览器中打开即可查看:

- 📊 每个模块的体积占比
- 🔍 依赖关系树状图
- 📈 代码分割效果
- 🎯 优化建议

---

## 🎨 主题定制

### 修改主题颜色

编辑 `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
}
```

### 切换暗黑模式

```javascript
// 在组件中使用
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
themeStore.toggleDarkMode()
```

---

## 🌍 国际化

### 添加新语言

1. 在 `src/locales/` 创建语言文件,如 `ja.js`
2. 在 `src/main.js` 中导入并注册
3. 在语言切换组件中添加选项

### 使用翻译

```vue
<template>
  <div>
    <!-- 模板中 -->
    <h1>{{ $t('dashboard.title') }}</h1>

    <!-- 带参数 -->
    <p>{{ $t('user.welcome', { name: userName }) }}</p>
  </div>
</template>

<script>
export default {
  methods: {
    showMessage() {
      // JS 中
      const message = this.$t('common.success')
      console.log(message)
    },
  },
}
</script>
```

---

## 🔧 配置说明

### Vite 配置

主要配置项 (`vite.config.js`):

```javascript
export default {
  // 开发服务器
  server: {
    port: 5173,
    open: true,
  },

  // 构建配置
  build: {
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-core': ['vue', 'vue-router', 'vuex'],
          'vendor-charts': ['uplot'],
          'vendor-calendar': ['flatpickr'],
        },
      },
    },

    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
}
```

### ESLint 配置

主要规则 (`.eslintrc.js`):

```javascript
export default {
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
```

---

## 📝 开发规范

### 组件命名

- **页面组件**: `View` 前缀,如 `ViewDashboard.vue`
- **公共组件**: `Comp` 前缀,如 `CompButton.vue`、`CompDropdown.vue`
- **布局组件**: `Layout` 前缀,如 `LayoutSidebar.vue`

### 文件组织

```
ComponentName/
├── index.vue          # 组件主文件
├── components/        # 子组件
│   ├── SubComponent1.vue
│   └── SubComponent2.vue
└── hooks/            # 组合式函数
    └── useFeature.js
```

### Git 提交规范

使用 Commitizen 提交:

```bash
npm run commit
```

提交类型:

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具相关

---

## 🚀 部署

### 构建生产版本

```bash
npm run build
```

### 环境变量

如需配置环境变量,可在项目根目录创建 `.env.production` 文件:

```env
VITE_API_BASE_URL=https://api.your-domain.com
VITE_APP_TITLE=Vue Admin JS
```

> 注: 当前项目暂未使用环境变量,可根据实际需求添加

---

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Flowbite](https://flowbite.com/) - Tailwind CSS 组件库

---
