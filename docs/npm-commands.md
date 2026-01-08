# NPM 命令说明文档

> **目的:** 了解项目中所有可用的 npm 命令及其用途

---

## 📋 命令列表

### 开发命令

#### `pnpm run dev`

**用途:** 启动开发服务器

**说明:**

- 使用 Vite 启动本地开发服务器
- 支持热模块替换 (HMR)
- 默认端口: `5173` (可在 `vite.config.js` 中修改)

**使用:**

```bash
pnpm run dev
```

**访问:** http://localhost:5173

---

### 构建命令

#### `pnpm run build`

**用途:** 构建生产环境代码

**说明:**

- 编译并打包所有代码
- 压缩 JS/CSS
- 移除 console 和 debugger
- 输出到 `dist/` 目录

**使用:**

```bash
pnpm run build
```

**输出:**

```
dist/
├── assets/
│   ├── js/
│   ├── css/
│   └── images/
└── index.html
```

---

#### `pnpm run build:report`

**用途:** 构建 + 生成体积分析报告

**说明:**

- 执行标准构建
- 生成可视化体积分析报告
- 自动打开 `dist/stats.html`

**使用:**

```bash
pnpm run build:report
```

**报告内容:**

- 每个 chunk 的大小
- Gzip 压缩后大小
- Brotli 压缩后大小
- 依赖关系树状图

---

#### `pnpm run preview`

**用途:** 预览生产环境构建

**说明:**

- 启动本地服务器预览 `dist/` 目录
- 用于测试生产环境构建结果

**使用:**

```bash
# 先构建
pnpm run build

# 再预览
pnpm run preview
```

---

### 代码生成命令

#### `pnpm run create`

**用途:** 创建新页面

**说明:**

- 交互式创建新的 Vue 页面
- 自动生成标准模板
- 支持嵌套目录

**使用:**

```bash
pnpm run create
```

**交互流程:**

1. 输入页面路径 (如 `user/profile`)
2. 输入页面名称 (如 `UserProfile`)
3. 自动生成 `src/views/user/ViewUserProfile.vue`

**生成的模板包含:**

- Options API 结构
- 基础 props、data、computed、methods
- 生命周期钩子
- 响应式布局示例

---

### 代码质量命令

#### `pnpm run lint`

**用途:** ESLint 代码检查 + 自动修复

**说明:**

- 检查 `src/` 目录下所有 JS/Vue 文件
- 自动修复可修复的问题
- 基于 ESLint + Vue 插件

**使用:**

```bash
pnpm run lint
```

**检查内容:**

- 语法错误
- 代码风格
- Vue 最佳实践
- 潜在 bug

---

#### `pnpm run format`

**用途:** Prettier 代码格式化

**说明:**

- 格式化所有 JS/Vue/CSS/HTML 文件
- 统一代码风格

**使用:**

```bash
pnpm run format
```

**格式化内容:**

- 缩进 (2 空格)
- 引号 (单引号)
- 分号 (无分号)
- 行宽 (100 字符)

---

### Git 相关命令

#### `pnpm run commit`

**用途:** 规范化 Git 提交

**说明:**

- 使用 Commitizen 交互式提交
- 自动生成符合规范的提交信息

**使用:**

```bash
pnpm run commit
```

**交互流程:**

1. 选择提交类型 (feat/fix/docs/style/refactor/test/chore)
2. 输入影响范围 (可选)
3. 输入简短描述
4. 输入详细描述 (可选)
5. 是否有 Breaking Changes (可选)
6. 关联 Issue (可选)

**提交格式:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**示例:**

```
feat(auth): 添加用户登录功能

- 实现登录表单
- 集成 JWT 认证
- 添加记住密码功能

Closes #123
```

---

#### `pnpm run prepare`

**用途:** 安装 Git hooks

**说明:**

- 由 Husky 自动执行
- 在 `pnpm install` 后自动运行
- 设置 pre-commit 和 commit-msg hooks

**Git Hooks:**

- **pre-commit:** 运行 `lint-staged` (检查暂存区文件)
- **commit-msg:** 运行 `commitlint` (检查提交信息格式)

---

## 🔄 工作流程

### 日常开发

```bash
# 1. 启动开发服务器
pnpm run dev

# 2. 创建新页面 (可选)
pnpm run create

# 3. 开发...

# 4. 提交前检查
pnpm run lint          # 代码检查

# 5. 格式化代码
pnpm run format

# 6. 提交代码
git add .
pnpm run commit
```

---

### 发布前

```bash
# 1. 构建生产环境
pnpm run build

# 2. 预览构建结果
pnpm run preview

# 3. 生成体积分析报告
pnpm run build:report

# 4. 检查体积是否合理
# 查看 dist/stats.html
```

---

## 📊 命令对比

| 命令           | 用途       | 运行时间 | 何时使用 |
| :------------- | :--------- | :------- | :------- |
| `dev`          | 开发服务器 | -        | 日常开发 |
| `build`        | 生产构建   | ~30s     | 发布前   |
| `build:report` | 构建+分析  | ~35s     | 优化体积 |
| `preview`      | 预览构建   | -        | 测试构建 |
| `create`       | 创建页面   | ~1s      | 新增页面 |
| `lint`         | 代码检查   | ~5s      | 提交前   |
| `format`       | 格式化     | ~2s      | 提交前   |
| `commit`       | 规范提交   | -        | 提交代码 |

---

## 🚀 快速参考

### 最常用命令

```bash
# 开发
pnpm run dev

# 提交前
pnpm run lint
pnpm run format

# 提交
pnpm run commit
```

### 新增页面

```bash
pnpm run create
```

### 检查体积

```bash
pnpm run build:report
```

---

## 💡 提示

1. **开发时:** 只需运行 `pnpm run dev`
2. **提交前:** 运行 `pnpm run lint` 和 `pnpm run format`
3. **发布前:** 运行 `pnpm run build:report` 检查体积
4. **使用 `pnpm run commit`** 而非 `git commit`,确保提交信息规范

---

## 🔗 相关文档

- [打包分析文档](./build-analysis.md) - 详细的构建配置说明
- [开发规范文档](./development-standards.md) - 代码规范和最佳实践
- [依赖文档](./dependencies.md) - 项目依赖说明
