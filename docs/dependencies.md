# 项目依赖文档

> **目的:** 了解项目使用的所有依赖包、版本和用途

---

## 1. 技术栈概览

| 技术             | 版本    | 用途     |
| :--------------- | :------ | :------- |
| **Vue 3**        | ^3.5.26 | 前端框架 |
| **Vite**         | ^5.4.21 | 构建工具 |
| **Tailwind CSS** | v4.1.18 | 样式框架 |
| **Vue Router**   | ^4.6.4  | 路由管理 |
| **Pinia**        | ^2.3.1  | 状态管理 |
| **Vue I18n**     | ^10.0.8 | 国际化   |

---

## 2. 核心依赖 (dependencies)

### UI 框架

| 包名         | 版本    | 用途       | 文档                                      |
| :----------- | :------ | :--------- | :---------------------------------------- |
| `vue`        | ^3.5.26 | Vue 3 核心 | [官方文档](https://cn.vuejs.org/)         |
| `vue-router` | ^4.6.4  | 路由管理   | [官方文档](https://router.vuejs.org/zh/)  |
| `pinia`      | ^2.3.1  | 状态管理   | [官方文档](https://pinia.vuejs.org/zh/)   |
| `vue-i18n`   | ^10.0.8 | 国际化     | [官方文档](https://vue-i18n.intlify.dev/) |

---

### UI 组件库

| 包名               | 版本   | 用途      | 文档                                 |
| :----------------- | :----- | :-------- | :----------------------------------- |
| `flowbite`         | ^4.0.1 | UI 组件库 | [官方文档](https://flowbite.com/)    |
| `@heroicons/vue`   | ^2.2.0 | 图标库    | [官方文档](https://heroicons.com/)   |
| `@floating-ui/dom` | ^1.7.4 | 浮动定位  | [官方文档](https://floating-ui.com/) |

---

### 图表库

| 包名    | 版本    | 用途         | 文档                                          |
| :------ | :------ | :----------- | :-------------------------------------------- |
| `uplot` | ^1.6.32 | 轻量级图表库 | [官方文档](https://github.com/leeoniya/uPlot) |

**选择理由:**

- ✅ 体积小 (~45KB)
- ✅ 性能好 (百万数据点)
- ✅ 高度可定制

---

### 工具库

| 包名              | 版本     | 用途      | 文档                                                  |
| :---------------- | :------- | :-------- | :---------------------------------------------------- |
| `axios`           | ^1.13.2  | HTTP 请求 | [官方文档](https://axios-http.com/)                   |
| `dayjs`           | ^1.11.10 | 日期处理  | [官方文档](https://day.js.org/)                       |
| `async-validator` | ^4.2.5   | 表单验证  | [GitHub](https://github.com/yiminghe/async-validator) |
| `spark-md5`       | ^3.0.2   | MD5 加密  | [GitHub](https://github.com/satazor/js-spark-md5)     |
| `nprogress`       | ^0.2.0   | 进度条    | [GitHub](https://github.com/rstacruz/nprogress)       |

---

### 日期选择器

| 包名        | 版本    | 用途           | 文档                                  |
| :---------- | :------ | :------------- | :------------------------------------ |
| `flatpickr` | ^4.6.13 | 日期时间选择器 | [官方文档](https://flatpickr.js.org/) |

---

## 3. 开发依赖 (devDependencies)

### 构建工具

| 包名                 | 版本     | 用途             |
| :------------------- | :------- | :--------------- |
| `vite`               | ^5.4.21  | 构建工具         |
| `@vitejs/plugin-vue` | ^5.2.4   | Vue 插件         |
| `@tailwindcss/vite`  | ^4.1.18  | Tailwind v4 插件 |
| `tailwindcss`        | ^4.1.18  | Tailwind CSS     |
| `postcss`            | ^8.4.35  | CSS 后处理器     |
| `autoprefixer`       | ^10.4.18 | CSS 自动前缀     |

---

### 代码质量

| 包名                     | 版本    | 用途                 |
| :----------------------- | :------ | :------------------- |
| `eslint`                 | ^9.39.2 | 代码检查             |
| `eslint-plugin-vue`      | ^10.6.2 | Vue ESLint 插件      |
| `eslint-plugin-prettier` | ^5.5.4  | Prettier ESLint 插件 |
| `prettier`               | ^3.7.4  | 代码格式化           |
| `vue-eslint-parser`      | ^10.2.0 | Vue 解析器           |

---

### Git 工具

| 包名                              | 版本    | 用途              |
| :-------------------------------- | :------ | :---------------- |
| `husky`                           | ^9.1.7  | Git hooks         |
| `lint-staged`                     | ^16.2.7 | 暂存区检查        |
| `commitizen`                      | ^4.3.1  | 规范提交          |
| `cz-git`                          | ^1.12.0 | Commitizen 适配器 |
| `@commitlint/cli`                 | ^20.3.0 | 提交信息检查      |
| `@commitlint/config-conventional` | ^20.3.0 | 提交规范配置      |

---

### 打包优化

| 包名                       | 版本    | 用途     |
| :------------------------- | :------ | :------- |
| `terser`                   | ^5.44.1 | JS 压缩  |
| `rollup-plugin-visualizer` | ^6.0.5  | 打包分析 |

---

### 自动化工具

| 包名                      | 版本    | 用途         |
| :------------------------ | :------ | :----------- |
| `unplugin-vue-components` | ^30.0.0 | 组件自动注册 |

---

## 4. 依赖关系图

```mermaid
graph TD
    A[Vue 3 App] --> B[Vue Router]
    A --> C[Pinia]
    A --> D[Vue I18n]
    A --> E[Flowbite]
    A --> F[uPlot]

    E --> G[Tailwind CSS]
    E --> H[@heroicons/vue]

    A --> I[axios]
    A --> J[dayjs]

    K[Vite] --> L[@vitejs/plugin-vue]
    K --> M[@tailwindcss/vite]
    K --> N[unplugin-vue-components]
```

---

## 5. 版本说明

### 主要版本选择

| 依赖     | 当前版本 | 最新版本 | 是否需要升级 |
| :------- | :------- | :------- | :----------- |
| Vue      | 3.5.26   | 3.5.x    | ✅ 保持最新  |
| Vite     | 5.4.21   | 5.x.x    | ✅ 保持最新  |
| Tailwind | 4.1.18   | 4.x.x    | ✅ 使用 v4   |
| Pinia    | 2.3.1    | 2.x.x    | ✅ 保持最新  |

### 版本锁定策略

```json
{
  "dependencies": {
    "vue": "^3.5.26", // 允许小版本更新
    "flowbite": "^4.0.1" // 允许小版本更新
  }
}
```

**说明:**

- `^` 符号: 允许不改变最左边非零数字的版本更新
- 例如: `^3.5.26` 允许 `3.5.x` 和 `3.x.x`,但不允许 `4.0.0`

---

## 6. 依赖安装

### 安装所有依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 使用 npm
npm install

# 使用 yarn
yarn install
```

### 安装单个依赖

```bash
# 生产依赖
pnpm add <package-name>

# 开发依赖
pnpm add -D <package-name>

# 指定版本
pnpm add <package-name>@<version>
```

---

## 7. 依赖更新

### 检查过时依赖

```bash
# 查看所有过时依赖
pnpm outdated

# 查看特定依赖
pnpm outdated vue
```

### 更新依赖

```bash
# 更新所有依赖到最新版本
pnpm update

# 更新特定依赖
pnpm update vue

# 更新到最新主版本 (谨慎!)
pnpm update --latest
```

### 更新建议

| 更新类型                     | 风险 | 建议           |
| :--------------------------- | :--- | :------------- |
| **补丁版本** (1.0.0 → 1.0.1) | 低   | 可直接更新     |
| **小版本** (1.0.0 → 1.1.0)   | 中   | 查看 CHANGELOG |
| **大版本** (1.0.0 → 2.0.0)   | 高   | 仔细测试       |

---

## 8. 依赖审计

### 安全审计

```bash
# 检查安全漏洞
pnpm audit

# 自动修复
pnpm audit --fix
```

### 许可证检查

```bash
# 安装许可证检查工具
pnpm add -D license-checker

# 生成许可证报告
npx license-checker --summary
```

---

## 9. 常见问题

### Q1: 为什么使用 pnpm 而不是 npm?

**A:**

- ✅ 更快的安装速度
- ✅ 更少的磁盘空间占用
- ✅ 更严格的依赖管理

### Q2: 如何锁定依赖版本?

**A:** 使用 `pnpm-lock.yaml` 文件,提交到 Git

### Q3: 依赖冲突怎么办?

**A:**

1. 删除 `node_modules` 和 `pnpm-lock.yaml`
2. 运行 `pnpm install`
3. 如果还有问题,检查 `package.json` 中的版本范围

### Q4: 如何减少依赖体积?

**A:**

1. 移除未使用的依赖
2. 使用按需导入
3. 使用轻量级替代品

---

## 10. 依赖替换建议

### 可优化的依赖

| 当前依赖 | 替代方案    | 体积对比 | 建议                   |
| :------- | :---------- | :------- | :--------------------- |
| `axios`  | `fetch` API | -10KB    | 如果不需要拦截器可替换 |
| `dayjs`  | 原生 `Intl` | -5KB     | 简单场景可替换         |

---

## 11. 新增依赖流程

### 添加前检查

- [ ] 是否有更轻量的替代方案?
- [ ] 是否可以自己实现?
- [ ] 是否支持 Tree-shaking?
- [ ] 最后更新时间是否在 6 个月内?
- [ ] GitHub Star 数是否 > 1000?

### 添加步骤

```bash
# 1. 安装依赖
pnpm add <package-name>

# 2. 更新文档
# 在本文档中添加依赖说明

# 3. 检查打包体积
pnpm run build:report

# 4. 提交代码
git add package.json pnpm-lock.yaml docs/dependencies.md
git commit -m "feat: add <package-name>"
```

---

## 12. 总结

**核心依赖:**

- Vue 3 生态 (Vue + Router + Pinia + I18n)
- Tailwind CSS v4 + Flowbite
- uPlot 图表库
- 工具库 (axios, dayjs, etc.)

**开发依赖:**

- Vite 构建工具
- ESLint + Prettier 代码质量
- Husky + Commitizen Git 工具

**依赖管理原则:**

1. 保持依赖最新
2. 定期安全审计
3. 谨慎添加新依赖
4. 优先使用轻量级方案
