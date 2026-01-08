# Vue 组件封装实战教程

> **示例组件:** CompCounter (计数器) 和 CompCard (卡片)  
> **技术栈:** Vue 3 + Tailwind CSS v4  
> **演示页面:** [ViewComponentDemo.vue](file:///Users/cmx/WebstormProjects/vue-admin-js/src/views/demo/ViewComponentDemo.vue)

---

## 📋 核心原则

### 开发规范 (必须遵守)

1. **颜色** → 使用 CSS 变量 (`var(--color-bg-primary)`)
2. **间距** → 直接写在 template (`p-6`, `gap-2`, `mb-4`)
3. **组件复用** → 使用已有组件 (如 `CompBaseButton`)
4. **❌ 不使用 @apply** → 降低可读性,增加 CSS 体积

---

## 1. CompCounter 计数器组件

### 需求

一个简单的计数器:

- 显示当前数值
- 增加/减少按钮
- 支持禁用状态

### 代码实现

```vue
<template>
  <div class="inline-flex items-center gap-2">
    <!-- 减少按钮 -->
    <CompBaseButton type="secondary" size="sm" :disabled="disabled" @click="decrease">
      -
    </CompBaseButton>

    <!-- 数值显示 -->
    <span class="counter-value w-12 text-center font-medium">
      {{ modelValue }}
    </span>

    <!-- 增加按钮 -->
    <CompBaseButton type="secondary" size="sm" :disabled="disabled" @click="increase">
      +
    </CompBaseButton>

    <!-- 图表按钮 -->
    <CompBaseButton type="primary" size="sm" :disabled="disabled" @click="showChart">
      📊
    </CompBaseButton>
  </div>
</template>

<script>
export default {
  name: 'CompCounter',
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  methods: {
    decrease() {
      const newValue = this.modelValue - 1
      this.$emit('update:modelValue', newValue)
    },
    increase() {
      const newValue = this.modelValue + 1
      this.$emit('update:modelValue', newValue)
    },
    // 图表按钮点击,触发 change 事件
    showChart() {
      this.$emit('change', this.modelValue)
    },
    // 供父组件调用的方法
    reset() {
      this.$emit('update:modelValue', 0)
    },
  },
}
</script>

<style scoped>
.counter-value {
  color: var(--color-text-heading);
}
</style>
```

### 设计要点

✅ **组件复用** - 使用 `CompBaseButton` 而不是原生 `<button>`  
✅ **间距在 template** - `gap-2`, `w-12` 直接写在 class  
✅ **颜色在 style** - 用 CSS 变量 `var(--color-text-heading)`  
✅ **方法封装** - 使用 `decrease()`, `increase()`, `showChart()` 方法  
✅ **事件分离** - `update:modelValue` 用于值更新,`change` 仅由图表按钮触发  
✅ **图表按钮** - 专门用于触发 change 事件,通知父组件  
✅ **简洁** - 只有 2 个 props,核心功能

---

## 2. CompCard 卡片组件

### 需求

一个简单的卡片容器:

- 可选标题
- 内容插槽
- 支持暗黑模式

### 代码实现

```vue
<template>
  <div class="card-container rounded-lg border shadow-sm p-6">
    <!-- 标题 -->
    <h3 v-if="title" class="card-title text-lg font-semibold mb-4">
      {{ title }}
    </h3>

    <!-- 内容 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CompCard',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.card-container {
  background-color: var(--color-bg-primary);
  border-color: var(--color-border);
}

.card-title {
  color: var(--color-text-heading);
}
</style>
```

### 设计要点

✅ **间距在 template** - `p-6`, `mb-4` 直接写在 class  
✅ **颜色在 style** - CSS 变量写在 `<style scoped>`  
✅ **布局用 Tailwind** - `rounded-lg`, `border`, `shadow-sm`  
✅ **简洁** - 只有 1 个 prop,1 个插槽

---

## 3. 使用示例

### 基础使用

```vue
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">组件封装示例</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CompCard title="计数器">
        <div class="text-center space-y-4">
          <!-- 使用 ref 和 @change 事件 -->
          <CompCounter ref="counterRef" v-model="count" @change="handleChange" />
          <p class="text-sm text-gray-600 dark:text-gray-400">当前值: {{ count }}</p>
          <button
            class="px-4 py-2 text-sm text-white bg-primary-600 rounded hover:bg-primary-700"
            @click="resetCounter"
          >
            重置计数器
          </button>
        </div>
      </CompCard>

      <CompCard title="卡片示例">
        <p>这是一个简单的卡片组件</p>
      </CompCard>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    // 子组件触发 change 事件,父组件显示 toast
    handleChange(value) {
      this.$toast.success(`当前值: ${value}`)
    },
    // 调用子组件的 reset 方法
    resetCounter() {
      this.$refs.counterRef.reset()
    },
  },
}
</script>
```

### 事件流程

1. **用户点击 +/- 按钮** → 值变化 → **不触发 change 事件**
2. **用户点击 📊 按钮** → 触发 `change` 事件 → 父组件显示 toast
3. **父组件调用 reset()** → 子组件重置为 0 → **不触发 change 事件**

> **设计理念:** 图表按钮专门用于触发事件通知父组件,而不是每次值变化都触发。

---

## 4. 开发规范总结

### ✅ 正确做法

```vue
<!-- ✅ 颜色用变量 -->
<style scoped>
.card {
  background-color: var(--color-bg-primary);
}
</style>

<!-- ✅ 间距直接写在 template -->
<div class="p-6 mb-4 gap-2">

<!-- ✅ 组件复用 -->
<CompBaseButton type="primary">按钮</CompBaseButton>
```

### ❌ 错误做法

```vue
<!-- ❌ 硬编码颜色 -->
<div class="bg-[#ffffff] text-[#333333]">

<!-- ❌ 使用 @apply -->
<style>
.card {
  @apply p-6 mb-4;
}
</style>

<!-- ❌ 不复用组件 -->
<button class="px-4 py-2 bg-blue-500">按钮</button>
```

---

## 5. 关键要点

1. **简单就是美** - 不要过度设计
2. **遵守规范** - 颜色变量,间距类名
3. **组件复用** - 优先使用已有组件
4. **不用 @apply** - 直接写类名更直观
5. **暗黑模式** - CSS 变量自动适配

---

## 📚 参考

- [开发规范](file:///Users/cmx/WebstormProjects/vue-admin-js/docs/development-standards.md)
- [组件系统](file:///Users/cmx/WebstormProjects/vue-admin-js/docs/component-system.md)
