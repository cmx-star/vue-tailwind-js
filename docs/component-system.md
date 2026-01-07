# 组件系统文档

## 1. 组件目录结构

项目组件位于 `src/components/` 目录下,按功能分类:

```
src/components/
├── Basic/          # 基础组件
│   └── CompBaseButton.vue
├── Charts/         # 图表组件
│   ├── CompAreaChart.vue
│   ├── CompBarChart.vue
│   ├── CompLineChart.vue
│   └── CompPieChart.vue
├── Data/           # 数据展示组件
│   └── CompDataTable.vue
├── Feedback/       # 反馈组件
│   ├── CompModal.vue
│   ├── CompToast.vue
│   └── CompLoading.vue
└── Form/           # 表单组件
    ├── CompForm.vue
    ├── CompInput.vue
    ├── CompSelect.vue
    ├── CompDatePicker.vue
    ├── CompCascader.vue
    ├── CompCheckbox.vue
    ├── CompRadio.vue
    ├── CompSwitch.vue
    └── CompTextarea.vue
```

---

## 2. 组件自动注册机制

### 2.1 自动注册配置

项目**已启用**全局自动注册,使用 `unplugin-vue-components`:

```javascript
// vite.config.js
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({
      dirs: ['src/components'], // 扫描目录
      extensions: ['vue'], // 文件类型
      deep: true, // 深度扫描子目录
      dts: false, // JS项目关闭TS类型生成
    }),
  ],
})
```

**工作原理:**

1. Vite 启动时自动扫描 `src/components/` 目录
2. 将所有 `.vue` 组件注册为全局组件
3. 在模板中直接使用,无需手动 `import`

---

### 2.2 使用方式(无需导入)

**项目使用 Options API,组件自动注册后可直接在模板使用:**

```vue
<template>
  <!-- ✅ 直接使用,无需 import -->
  <CompSelect v-model="selectedValue" :options="options" />
  <CompDatePicker v-model="date" mode="date" />
  <CompLineChart :data="chartData" :height="300" />
</template>

<script>
export default {
  name: 'MyPage',
  data() {
    return {
      selectedValue: '',
      date: null,
      chartData: [
        { x: '周一', y: 30 },
        { x: '周二', y: 45 },
      ],
      options: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ],
    }
  },
}
</script>
```

**优点:**

- ✅ 开发体验极佳,无需手动导入
- ✅ 代码更简洁
- ✅ 自动按需打包(见 2.3 节)

---

### 2.3 按需打包机制

虽然是全局注册,但 **Vite 会自动按需打包**:

1. **编译时分析:** `unplugin-vue-components` 扫描模板,识别实际使用的组件
2. **Tree-shaking:** 未使用的组件不会被打包
3. **代码分割:** 大型组件(如图表)会被分割成独立 chunk

**示例:**

```vue
<template>
  <!-- 仅使用了 CompSelect -->
  <CompSelect v-model="value" />
</template>

<script>
export default {
  data() {
    return {
      value: '',
    }
  },
}
</script>
```

**打包结果:**

- ✅ `CompSelect.vue` → 被打包
- ❌ `CompDatePicker.vue` → 不被打包
- ❌ `CompLineChart.vue` → 不被打包

---

## 3. 按需打包配置

### 3.1 组件按需打包

项目使用 `unplugin-vue-components` 实现**真正的按需打包**:

**工作流程:**

```mermaid
graph LR
    A[编写模板] --> B[编译时扫描]
    B --> C[识别使用的组件]
    C --> D[仅打包使用的组件]
    D --> E[未使用组件被移除]
```

**示例对比:**

```vue
<!-- 页面A: 仅使用 CompSelect -->
<template>
  <CompSelect v-model="value" />
</template>
```

```vue
<!-- 页面B: 使用多个组件 -->
<template>
  <CompSelect v-model="value" />
  <CompDatePicker v-model="date" />
  <CompLineChart :data="chartData" />
</template>
```

**打包结果:**

- 页面 A 的 chunk: 仅包含 `CompSelect`
- 页面 B 的 chunk: 包含 `CompSelect` + `CompDatePicker` + `CompLineChart`

---

### 3.2 代码分割策略

项目在 `vite.config.js` 中配置了精细的代码分割:

```javascript
// vite.config.js
build: {
  rollupOptions: {
    output: {
      manualChunks: (id) => {
        if (id.includes('node_modules')) {
          // 图表库单独分割
          if (id.includes('uplot')) {
            return 'chart-vendor'
          }
          // 工具库分割
          if (id.includes('dayjs') || id.includes('async-validator')) {
            return 'utils-vendor'
          }
          // UI组件库分割
          if (id.includes('flowbite') || id.includes('@heroicons')) {
            return 'ui-vendor'
          }
          // Vue核心库分割
          if (id.includes('vue') || id.includes('pinia')) {
            return 'vue-core'
          }
          return 'vendor'
        }
      }
    }
  }
}
```

**分割结果:**

| Chunk 名称     | 包含内容                    | 大小估算 |
| :------------- | :-------------------------- | :------- |
| `vue-core`     | Vue + Router + Pinia + I18n | ~80KB    |
| `chart-vendor` | uPlot 图表库                | ~40KB    |
| `ui-vendor`    | Flowbite + Heroicons        | ~30KB    |
| `utils-vendor` | dayjs + async-validator     | ~20KB    |
| `vendor`       | 其他第三方库                | ~30KB    |

**优势:**

- ✅ 首屏加载更快(核心库优先)
- ✅ 浏览器缓存更高效(库文件不常变)
- ✅ 按需加载非核心功能

---

### 3.3 动态导入进阶优化

对于大型组件,可以使用动态导入进一步优化:

```vue
<template>
  <component :is="asyncChart" :data="chartData" />
</template>

<script>
export default {
  data() {
    return {
      asyncChart: null,
      chartData: [],
    }
  },
  mounted() {
    // ✅ 懒加载图表组件(仅在需要时加载)
    import('@/components/Charts/CompLineChart.vue').then((module) => {
      this.asyncChart = module.default
    })
  },
}
</script>
```

**适用场景:**

- 图表组件(CompLineChart, CompBarChart)
- 富文本编辑器
- 大型表单组件

---

## 4. 组件命名规范

### 4.1 文件命名

- **格式:** `Comp{功能名}.vue`
- **示例:** `CompSelect.vue`, `CompDatePicker.vue`
- **原因:** 避免与原生 HTML 标签冲突,提高可识别性

### 4.2 组件使用

```vue
<!-- ✅ 推荐:PascalCase -->
<CompSelect v-model="value" />

<!-- ❌ 不推荐:kebab-case -->
<comp-select v-model="value" />
```

---

## 5. 常用组件 API

### 5.1 CompSelect (下拉选择器)

```vue
<template>
  <CompSelect
    v-model="selectedValue"
    :options="options"
    :placeholder="'请选择'"
    :clearable="true"
    label="label"
  />
</template>

<script>
export default {
  data() {
    return {
      selectedValue: '',
      options: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ],
    }
  },
}
</script>
```

**Props:**

- `modelValue` - 绑定值
- `options` - 选项数组
- `placeholder` - 占位文本
- `clearable` - 是否可清空
- `label` - 选项显示字段名

---

### 5.2 CompDatePicker (日期选择器)

```vue
<template>
  <CompDatePicker v-model="date" mode="date" :range="false" :clearable="true" />
</template>

<script>
export default {
  data() {
    return {
      date: null,
    }
  },
}
</script>
```

**Props:**

- `modelValue` - 绑定值
- `mode` - 模式: `'date'` | `'time'` | `'dateTime'`
- `range` - 是否为范围选择
- `clearable` - 是否可清空

---

### 5.3 CompLineChart (折线图)

```vue
<template>
  <CompLineChart :data="chartData" :height="300" color="#3B82F6" :smooth="true" />
</template>

<script>
export default {
  data() {
    return {
      chartData: [
        { x: '周一', y: 30 },
        { x: '周二', y: 45 },
        { x: '周三', y: 35 },
      ],
    }
  },
}
</script>
```

**Props:**

- `data` - 图表数据
- `height` - 图表高度
- `color` - 线条颜色
- `smooth` - 是否平滑曲线

---

## 6. 性能优化建议

### 6.1 懒加载大型组件

对于图表、富文本编辑器等大型组件,建议使用动态导入:

```vue
<script>
export default {
  data() {
    return {
      ChartComponent: null,
    }
  },
  mounted() {
    // 仅在需要时加载
    import('@/components/Charts/CompLineChart.vue').then((module) => {
      this.ChartComponent = module.default
    })
  },
}
</script>

<template>
  <component v-if="ChartComponent" :is="ChartComponent" :data="chartData" />
</template>
```

### 6.2 组件缓存

对于频繁切换的组件,使用 `<KeepAlive>`:

```vue
<template>
  <KeepAlive>
    <component :is="currentComponent" />
  </KeepAlive>
</template>

<script>
export default {
  data() {
    return {
      currentComponent: 'CompSelect',
    }
  },
}
</script>
```

---

## 7. 扩展组件库

### 7.1 添加新组件

1. 在对应分类目录下创建 `.vue` 文件
2. 遵循命名规范: `Comp{功能名}.vue`
3. 自动注册,无需手动配置

**示例:**

```bash
# 创建新组件
touch src/components/Form/CompUpload.vue
```

```vue
<!-- src/components/Form/CompUpload.vue -->
<template>
  <div class="upload-wrapper">
    <input type="file" @change="handleChange" />
  </div>
</template>

<script>
export default {
  name: 'CompUpload',
  props: {
    modelValue: [String, Array],
    accept: String,
    multiple: Boolean,
  },
  methods: {
    handleChange(event) {
      const files = event.target.files
      this.$emit('update:modelValue', files)
    },
  },
}
</script>
```

### 7.2 使用新组件

```vue
<template>
  <!-- ✅ 自动注册,直接使用 -->
  <CompUpload v-model="files" accept="image/*" :multiple="true" />
</template>

<script>
export default {
  data() {
    return {
      files: [],
    }
  },
}
</script>
```

---

## 8. 总结

| 特性         | 实现方式     | 说明                            |
| :----------- | :----------- | :------------------------------ |
| **注册方式** | ✅ 自动注册  | `unplugin-vue-components`       |
| **使用方式** | 无需导入     | 模板中直接使用组件名            |
| **按需打包** | ✅ 自动      | 编译时分析,仅打包使用的组件     |
| **代码分割** | ✅ 精细配置  | 5 个 vendor chunks + 动态导入   |
| **API 风格** | Options API  | `data()`, `methods`, `computed` |
| **命名规范** | `Comp{Name}` | 避免与原生标签冲突              |

**核心优势:**

- ✅ 开发体验极佳(无需手动导入)
- ✅ 打包体积最优(自动按需)
- ✅ 代码分割精细(5 层 vendor 分离)
- ✅ 首屏加载快速(核心库优先)

**推荐做法:**

- 常规组件 → 直接在模板使用(自动注册)
- 大型组件 → 使用动态 `import()` 懒加载
- 保持 `Comp{Name}` 命名规范
- 使用 Options API 编写组件逻辑
