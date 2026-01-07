# 主题系统文档

## 1. 主题架构概览

项目采用 **Tailwind v4 + CSS 变量** 的主题系统:

```
src/styles/
├── index.css              # 入口文件
├── main/
│   └── Primitives.Value.css  # 原始色板定义
├── theme/                 # 主题变量文件
│   ├── modern_light.css
│   ├── modern_dark.css
│   ├── enterprise_light.css
│   ├── enterprise_dark.css
│   ├── playful_light.css
│   ├── playful_dark.css
│   ├── minimal_light.css
│   ├── minimal_dark.css
│   ├── mono_light.css
│   └── mono_dark.css
└── moudles/
    ├── theme.css          # 语义变量映射 + Tailwind 配置
    ├── base.css           # 基础样式
    └── utilities.css      # 工具类
```

---

## 2. CSS 变量定义

### 2.1 @theme 块(Tailwind v4 配置)

在 `src/styles/moudles/theme.css` 中定义:

```css
@theme {
  /* 品牌色阶 */
  --color-primary: var(--color-primary-600);
  --color-primary-50: var(--color-primary-50);
  --color-primary-100: var(--color-primary-100);
  --color-primary-200: var(--color-primary-200);
  --color-primary-300: var(--color-primary-300);
  --color-primary-400: var(--color-primary-400);
  --color-primary-500: var(--color-primary-500);
  --color-primary-600: var(--color-primary-600);
  --color-primary-700: var(--color-primary-700);
  --color-primary-800: var(--color-primary-800);
  --color-primary-900: var(--color-primary-900);

  /* 状态色 */
  --color-success: var(--color-fg-success);
  --color-danger: var(--color-fg-danger);
  --color-warning: var(--color-fg-warning);
  --color-success-bg: var(--color-bg-success);
  --color-error-bg: var(--color-bg-danger);
  --color-warning-bg: var(--color-bg-warning);
}
```

**作用:** 这些变量会被 Tailwind 自动转换为工具类。

---

### 2.2 :root 块(语义变量)

```css
:root {
  /* 品牌色映射 */
  --color-primary-50: var(--colors-background-bg-brand-softer);
  --color-primary-100: var(--colors-background-bg-brand-soft);
  --color-primary-600: var(--colors-text-text-fg-brand);
  --color-primary-900: var(--colors-text-text-fg-brand-strong);

  /* 背景色映射 */
  --color-bg-primary: var(--colors-background-bg-neutral-primary);
  --color-bg-secondary: var(--colors-background-bg-neutral-secondary);
  --color-bg-tertiary: var(--colors-background-bg-neutral-tertiary);

  /* 文字颜色映射 */
  --color-text-heading: var(--colors-text-text-heading);
  --color-text-body: var(--colors-text-text-body);
  --color-text-body-subtle: var(--colors-text-text-body-subtle);

  /* 状态颜色映射 */
  --color-fg-success: var(--colors-text-text-fg-success);
  --color-fg-danger: var(--colors-text-text-fg-danger);
  --color-fg-warning: var(--colors-text-text-fg-warning);
  --color-bg-success: var(--colors-background-bg-success-soft);
  --color-bg-danger: var(--colors-background-bg-danger-soft);
  --color-bg-warning: var(--colors-background-bg-warning-soft);

  /* 边框颜色映射 */
  --color-border: var(--colors-border-border-default);
  --color-border-subtle: var(--colors-border-border-default-subtle);
  --color-border-strong: var(--colors-border-border-default-strong);

  /* 圆角 */
  --radius-base: var(--border-border-radius-rounded-base);
  --radius-xs: var(--border-border-radius-rounded-xs);
  --radius-xxs: var(--border-border-radius-rounded-xxs);
}
```

---

## 3. Tailwind 类名映射表

### 3.1 品牌色(Primary)

| CSS 变量                   | Tailwind 类名                       | 用途         |
| :------------------------- | :---------------------------------- | :----------- |
| `var(--color-primary-50)`  | `bg-primary-50` `text-primary-50`   | 极淡背景     |
| `var(--color-primary-100)` | `bg-primary-100` `text-primary-100` | 浅色背景     |
| `var(--color-primary-200)` | `bg-primary-200` `text-primary-200` | 淡色背景     |
| `var(--color-primary-300)` | `bg-primary-300` `text-primary-300` | 中淡色       |
| `var(--color-primary-400)` | `bg-primary-400` `text-primary-400` | 中等色       |
| `var(--color-primary-500)` | `bg-primary-500` `text-primary-500` | 标准色       |
| `var(--color-primary-600)` | `bg-primary` `text-primary`         | **默认主色** |
| `var(--color-primary-700)` | `bg-primary-700` `text-primary-700` | 深色         |
| `var(--color-primary-800)` | `bg-primary-800` `text-primary-800` | 更深色       |
| `var(--color-primary-900)` | `bg-primary-900` `text-primary-900` | 极深色       |

---

### 3.2 状态色

| CSS 变量                  | Tailwind 类名   | 用途     |
| :------------------------ | :-------------- | :------- |
| `var(--color-success)`    | `text-success`  | 成功文字 |
| `var(--color-success-bg)` | `bg-success-bg` | 成功背景 |
| `var(--color-danger)`     | `text-danger`   | 错误文字 |
| `var(--color-error-bg)`   | `bg-error-bg`   | 错误背景 |
| `var(--color-warning)`    | `text-warning`  | 警告文字 |
| `var(--color-warning-bg)` | `bg-warning-bg` | 警告背景 |

---

### 3.3 语义色(推荐使用)

| CSS 变量                        | Tailwind 等效                          | 说明            |
| :------------------------------ | :------------------------------------- | :-------------- |
| `var(--color-bg-primary)`       | `bg-white dark:bg-gray-900`            | 页面主背景      |
| `var(--color-bg-secondary)`     | `bg-gray-50 dark:bg-gray-800`          | 卡片/容器背景   |
| `var(--color-bg-tertiary)`      | `bg-gray-100 dark:bg-gray-700`         | 输入框/次级背景 |
| `var(--color-text-heading)`     | `text-gray-900 dark:text-white`        | 标题文字        |
| `var(--color-text-body)`        | `text-gray-600 dark:text-gray-300`     | 正文文字        |
| `var(--color-text-body-subtle)` | `text-gray-500 dark:text-gray-400`     | 辅助文字        |
| `var(--color-border)`           | `border-gray-200 dark:border-gray-700` | 默认边框        |

---

## 4. 使用方式对比

### 4.1 方式一:Tailwind 类名(推荐)

```vue
<template>
  <!-- 品牌色 -->
  <button class="bg-primary text-white hover:bg-primary-700">主要按钮</button>

  <!-- 状态色 -->
  <div class="bg-success-bg text-success p-4 rounded">操作成功!</div>

  <!-- 语义色(自动适配暗黑模式) -->
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    自适应容器
  </div>
</template>
```

**优点:**

- ✅ 简洁,无需写 CSS
- ✅ 自动 Tree-shaking
- ✅ IDE 智能提示

---

### 4.2 方式二:纯 CSS 变量

```vue
<template>
  <div class="custom-card">
    <h1 class="custom-title">标题</h1>
    <p class="custom-text">正文内容</p>
  </div>
</template>

<style scoped>
.custom-card {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  padding: 20px;
}

.custom-title {
  color: var(--color-text-heading);
  font-size: 24px;
}

.custom-text {
  color: var(--color-text-body);
}
</style>
```

**优点:**

- ✅ 完全自定义
- ✅ 自动适配主题切换
- ✅ 适合复杂样式

---

### 4.3 方式三:混合使用

```vue
<template>
  <div class="custom-wrapper">
    <button class="bg-primary text-white px-4 py-2 rounded">
      Tailwind 按钮
    </button>
  </div>
</template>

<style scoped>
.custom-wrapper {
  /* 使用 CSS 变量 */
  background-color: var(--color-bg-primary);
  padding: var(--spacing-6);

  /* 使用 @apply 调用 Tailwind */
  @apply border border-gray-200 rounded-lg;
}
</style>
```

**优点:**

- ✅ 灵活性最高
- ✅ 兼顾简洁和自定义

---

## 5. 主题切换机制

### 5.1 暗黑模式

通过在 `<html>` 标签添加 `.dark` 类实现:

```javascript
// src/stores/theme.js
export const useThemeStore = defineStore("theme", {
  actions: {
    toggleDark() {
      this.isDark = !this.isDark;
      if (this.isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});
```

**CSS 配置:**

```css
/* src/styles/moudles/theme.css */
@variant dark (&:where(.dark, .dark *));
```

---

### 5.2 主题预设切换

通过 `data-theme` 属性切换:

```javascript
// src/stores/theme.js
setThemeStyle(style) {
  this.themeStyle = style
  if (style === 'default') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', style)
  }
}
```

**可用主题:**

- `modern` (默认)
- `enterprise`
- `playful`
- `minimal`
- `mono`

---

## 6. 完整变量清单

### 6.1 品牌色系

```css
--color-primary-50   /* 极淡 */
--color-primary-100  /* 很淡 */
--color-primary-200  /* 淡 */
--color-primary-300  /* 较淡 */
--color-primary-400  /* 中等偏淡 */
--color-primary-500  /* 标准 */
--color-primary-600  /* 默认主色 */
--color-primary-700  /* 深 */
--color-primary-800  /* 很深 */
--color-primary-900  /* 极深 */
```

---

### 6.2 背景色系

```css
--color-bg-primary      /* 页面主背景 */
--color-bg-secondary    /* 卡片/侧边栏背景 */
--color-bg-tertiary     /* 输入框/次级背景 */
```

---

### 6.3 文字色系

```css
--color-text-heading       /* 标题文字 */
--color-text-body          /* 正文文字 */
--color-text-body-subtle   /* 辅助/次要文字 */
```

---

### 6.4 状态色系

```css
/* 前景色(文字/图标) */
--color-fg-success   /* 成功 */
--color-fg-danger    /* 错误 */
--color-fg-warning   /* 警告 */

/* 背景色(区域底色) */
--color-bg-success   /* 成功背景 */
--color-bg-danger    /* 错误背景 */
--color-bg-warning   /* 警告背景 */
```

---

### 6.5 边框与圆角

```css
/* 边框 */
--color-border          /* 默认边框 */
--color-border-subtle   /* 浅色边框 */
--color-border-strong   /* 深色边框 */

/* 圆角 */
--radius-xxs   /* 2px */
--radius-xs    /* 4px */
--radius-base  /* 8px */
```

---

## 7. 实战示例

### 7.1 卡片组件

```vue
<template>
  <div class="stat-card">
    <div class="stat-icon bg-primary-500">
      <svg><!-- icon --></svg>
    </div>
    <div class="stat-content">
      <h3 class="stat-title">总用户</h3>
      <p class="stat-value">12,345</p>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  padding: 20px;
  display: flex;
  gap: 16px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-base);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-title {
  color: var(--color-text-body-subtle);
  font-size: 14px;
}

.stat-value {
  color: var(--color-text-heading);
  font-size: 24px;
  font-weight: bold;
}
</style>
```

---

### 7.2 状态提示

```vue
<template>
  <div class="alert alert-success">
    <svg class="alert-icon"><!-- icon --></svg>
    <span>操作成功!</span>
  </div>
</template>

<style scoped>
.alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-base);
}

.alert-success {
  background-color: var(--color-bg-success);
  color: var(--color-fg-success);
  border: 1px solid var(--color-fg-success);
}

.alert-icon {
  width: 20px;
  height: 20px;
}
</style>
```

---

## 8. 最佳实践

### 8.1 优先使用语义变量

```css
/* ✅ 推荐:语义化 */
background-color: var(--color-bg-primary);
color: var(--color-text-heading);

/* ❌ 不推荐:硬编码 */
background-color: #ffffff;
color: #1a1a1a;
```

---

### 8.2 避免直接使用原始色板

```css
/* ✅ 推荐:使用映射后的变量 */
color: var(--color-primary-600);

/* ❌ 不推荐:直接使用原始变量 */
color: var(--colors-brand-600);
```

---

### 8.3 暗黑模式适配

```vue
<!-- ✅ 推荐:使用语义变量(自动适配) -->
<div style="background-color: var(--color-bg-primary)">
  内容
</div>

<!-- ❌ 不推荐:手动写暗黑模式 -->
<div class="bg-white dark:bg-gray-900">
  内容
</div>
```

---

## 9. 总结

| 特性         | 实现方式               | 说明                     |
| :----------- | :--------------------- | :----------------------- |
| **变量定义** | `@theme` + `:root`     | Tailwind 配置 + 语义映射 |
| **类名生成** | Tailwind v4            | 自动生成工具类           |
| **暗黑模式** | `.dark` 类             | 自动切换变量值           |
| **主题切换** | `data-theme` 属性      | 5 套预设主题             |
| **使用方式** | 类名 / CSS 变量 / 混合 | 灵活选择                 |

**核心优势:**

- ✅ 一套变量,多种用法
- ✅ 自动适配主题和暗黑模式
- ✅ 语义化命名,易于维护
