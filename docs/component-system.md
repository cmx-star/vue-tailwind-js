# 组件系统文档

> **最后更新:** 2026-01-08  
> **状态:** ✅ 已验证所有组件 API 与实际代码一致

本文档详细说明了项目中所有可复用组件的 API、使用方法和最佳实践。

---

## 📋 目录

### 基础组件

- [CompBaseButton](#compbasebutton) - 按钮组件

### 表单组件

- [CompInput](#compinput) - 输入框
- [CompSelect](#compselect) - 下拉选择器
- [CompDatePicker](#compdatepicker) - 日期选择器
- [CompRadio](#compradio) - 单选框组
- [CompCheckbox](#compcheckbox) - 多选框组
- [CompSwitch](#compswitch) - 开关
- [CompCascader](#compcascader) - 级联选择器
- [CompTransfer](#comptransfer) - 穿梭框
- [CompForm](#compform) - 表单容器

### 数据展示

- [CompDataTable](#compdatatable) - 数据表格

### 反馈组件

- [CompModal](#compmodal) - 模态框
- [CompToast](#comptoast) - 消息提示
- [CompTipPopover](#comptippopover) - 提示气泡

### 图表组件

- [CompLineChart](#complinechart) - 折线图
- [CompAreaChart](#compareachart) - 面积图
- [CompBarChart](#compbarchart) - 柱状图

---

## 基础组件

### CompBaseButton

**用途:** 通用按钮组件,支持多种样式和状态

**Props:**

| 属性         | 类型    | 默认值      | 说明                                                             |
| :----------- | :------ | :---------- | :--------------------------------------------------------------- |
| `type`       | String  | `'primary'` | 按钮类型: `primary`, `secondary`, `success`, `danger`, `warning` |
| `size`       | String  | `'md'`      | 尺寸: `sm`, `md`, `lg`                                           |
| `nativeType` | String  | `'button'`  | 原生 type 属性: `button`, `submit`, `reset`                      |
| `disabled`   | Boolean | `false`     | 禁用状态                                                         |
| `loading`    | Boolean | `false`     | 加载状态                                                         |

**Events:**

- `@click` - 点击事件

**Slots:**

- `default` - 按钮内容

**示例:**

```vue
<template>
  <CompBaseButton type="primary" size="md" @click="handleClick"> 提交 </CompBaseButton>
  <CompBaseButton type="danger" :loading="isLoading"> 删除 </CompBaseButton>
</template>
```

---

## 表单组件

### CompInput

**用途:** 文本输入框,支持多行文本和验证

**Props:**

| 属性           | 类型    | 默认值   | 说明                                                        |
| :------------- | :------ | :------- | :---------------------------------------------------------- |
| `modelValue`   | String  | -        | v-model 绑定值                                              |
| `label`        | String  | -        | 标签文本                                                    |
| `type`         | String  | `'text'` | 输入类型: `text`, `textarea`, `password`, `email`, `number` |
| `placeholder`  | String  | -        | 占位符                                                      |
| `disabled`     | Boolean | `false`  | 禁用状态                                                    |
| `required`     | Boolean | `false`  | 必填标记                                                    |
| `error`        | String  | -        | 错误提示                                                    |
| `hint`         | String  | -        | 辅助文本                                                    |
| `autocomplete` | String  | `'off'`  | 自动完成属性                                                |
| `rows`         | Number  | `4`      | 多行文本行数 (type='textarea' 时有效)                       |
| `maxlength`    | Number  | -        | 最大字符长度                                                |

**Events:**

- `@update:modelValue` - 值变化
- `@blur` - 失焦事件

**示例:**

```vue
<template>
  <CompInput
    v-model="username"
    label="用户名"
    placeholder="请输入用户名"
    :required="true"
    :error="usernameError"
    :maxlength="20"
  />

  <CompInput v-model="description" type="textarea" label="描述" :rows="6" hint="最多200字" />
</template>
```

---

### CompSelect

**用途:** 下拉选择器,支持搜索和多选

**Props:**

| 属性                | 类型                       | 默认值    | 说明                           |
| :------------------ | :------------------------- | :-------- | :----------------------------- |
| `modelValue`        | String/Number/Array/Object | -         | v-model 绑定值                 |
| `options`           | Array                      | `[]`      | 选项数组: `[{ label, value }]` |
| `label`             | String                     | -         | 标签文本                       |
| `placeholder`       | String                     | -         | 占位符                         |
| `disabled`          | Boolean                    | `false`   | 禁用状态                       |
| `required`          | Boolean                    | `false`   | 必填标记                       |
| `error`             | String                     | -         | 错误提示                       |
| `hint`              | String                     | -         | 辅助文本                       |
| `searchable`        | Boolean                    | `false`   | 是否可搜索                     |
| `searchPlaceholder` | String                     | -         | 搜索占位符                     |
| `noOptionsText`     | String                     | -         | 无选项时的提示文本             |
| `optionLabel`       | String/Function            | `'label'` | 选项显示字段或函数             |
| `optionValue`       | String/Function            | `'value'` | 选项值字段或函数               |
| `multiple`          | Boolean                    | `false`   | 是否多选                       |

**Events:**

- `@update:modelValue` - 值变化
- `@change` - 选择变化

**示例:**

```vue
<template>
  <!-- 基础用法 -->
  <CompSelect v-model="selectedCity" :options="cities" label="城市" placeholder="请选择城市" />

  <!-- 可搜索下拉框 -->
  <CompSelect
    v-model="selectedProvince"
    :options="provinces"
    label="省份"
    placeholder="请选择省份"
    searchable
    searchPlaceholder="输入省份名称搜索"
    noOptionsText="未找到匹配的省份"
  />

  <!-- 多选下拉框 -->
  <CompSelect
    v-model="selectedTags"
    :options="tags"
    label="标签"
    placeholder="请选择标签"
    multiple
    hint="可选择多个标签"
  />

  <!-- 可搜索 + 多选 -->
  <CompSelect
    v-model="selectedSkills"
    :options="skills"
    label="技能"
    placeholder="请选择技能"
    searchable
    multiple
    searchPlaceholder="搜索技能"
    hint="支持搜索和多选"
  />
</template>

<script>
export default {
  data() {
    return {
      selectedCity: '',
      selectedProvince: '',
      selectedTags: [],
      selectedSkills: [],
      cities: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
      ],
      provinces: [
        { label: '广东省', value: 'guangdong' },
        { label: '浙江省', value: 'zhejiang' },
        { label: '江苏省', value: 'jiangsu' },
        { label: '四川省', value: 'sichuan' },
      ],
      tags: [
        { label: 'Vue', value: 'vue' },
        { label: 'React', value: 'react' },
        { label: 'Angular', value: 'angular' },
      ],
      skills: [
        { label: 'JavaScript', value: 'js' },
        { label: 'TypeScript', value: 'ts' },
        { label: 'Python', value: 'python' },
        { label: 'Java', value: 'java' },
        { label: 'Go', value: 'go' },
      ],
    }
  },
}
</script>
```

---

### CompDatePicker

**用途:** 日期时间选择器,基于 Flatpickr

**Props:**

| 属性          | 类型              | 默认值   | 说明                                      |
| :------------ | :---------------- | :------- | :---------------------------------------- |
| `modelValue`  | String/Date/Array | -        | v-model 绑定值                            |
| `label`       | String            | -        | 标签文本                                  |
| `mode`        | String            | `'date'` | 模式: `date`, `time`, `dateTime`, `range` |
| `format`      | String            | -        | 日期格式                                  |
| `placeholder` | String            | -        | 占位符                                    |
| `disabled`    | Boolean           | `false`  | 禁用状态                                  |
| `required`    | Boolean           | `false`  | 必填标记                                  |
| `error`       | String            | -        | 错误提示                                  |
| `hint`        | String            | -        | 辅助文本                                  |

**Events:**

- `@update:modelValue` - 值变化

**示例:**

```vue
<template>
  <CompDatePicker v-model="birthday" label="生日" mode="date" placeholder="选择日期" />

  <CompDatePicker v-model="dateRange" label="日期范围" mode="range" />
</template>
```

---

### CompRadio

**用途:** 单选框组

**Props:**

| 属性         | 类型                  | 默认值      | 说明                                                       |
| :----------- | :-------------------- | :---------- | :--------------------------------------------------------- |
| `modelValue` | String/Number/Boolean | -           | v-model 绑定值                                             |
| `options`    | Array                 | `[]`        | 选项数组: `[{ label, value, disabled }]`                   |
| `name`       | String                | -           | name 属性 (必填)                                           |
| `disabled`   | Boolean               | `false`     | 禁用状态                                                   |
| `variant`    | String                | `'default'` | 样式变体: `default`, `bordered`, `list`, `list-horizontal` |
| `label`      | String                | -           | 标签文本                                                   |
| `required`   | Boolean               | `false`     | 必填标记                                                   |
| `error`      | String                | -           | 错误提示                                                   |
| `hint`       | String                | -           | 辅助文本                                                   |

**Events:**

- `@update:modelValue` - 值变化
- `@change` - 选择变化

**示例:**

```vue
<template>
  <CompRadio v-model="gender" :options="genderOptions" name="gender" variant="bordered" />
</template>

<script>
export default {
  data() {
    return {
      gender: 'male',
      genderOptions: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ],
    }
  },
}
</script>
```

---

### CompCheckbox

**用途:** 多选框组

**Props:**

| 属性         | 类型    | 默认值      | 说明                                                                   |
| :----------- | :------ | :---------- | :--------------------------------------------------------------------- |
| `modelValue` | Array   | `[]`        | v-model 绑定值(数组)                                                   |
| `options`    | Array   | `[]`        | 选项数组: `[{ label, value, disabled }]`                               |
| `name`       | String  | -           | name 属性 (必填)                                                       |
| `disabled`   | Boolean | `false`     | 禁用状态                                                               |
| `variant`    | String  | `'default'` | 样式变体: `default`, `inline`, `bordered`, `list`, `list-horizontal`   |
| `color`      | String  | `'blue'`    | 颜色主题: `blue`, `red`, `green`, `purple`, `teal`, `yellow`, `orange` |

> **注意:** 此组件不支持 `label`、`required`、`error`、`hint` 等表单验证属性。如需表单验证,请使用 `CompForm` 组件包裹。

**Events:**

- `@update:modelValue` - 值变化
- `@change` - 选择变化

**示例:**

```vue
<template>
  <CompCheckbox v-model="selectedHobbies" :options="hobbies" name="hobbies" variant="list" />
</template>

<script>
export default {
  data() {
    return {
      selectedHobbies: [],
      hobbies: [
        { label: '阅读', value: 'reading' },
        { label: '运动', value: 'sports' },
        { label: '音乐', value: 'music' },
      ],
    }
  },
}
</script>
```

---

### CompSwitch

**用途:** 开关切换

**Props:**

| 属性            | 类型    | 默认值  | 说明                               |
| :-------------- | :------ | :------ | :--------------------------------- |
| `modelValue`    | Boolean | `false` | v-model 绑定值                     |
| `disabled`      | Boolean | `false` | 禁用状态                           |
| `label`         | String  | -       | 标签文本(固定显示)                 |
| `activeText`    | String  | -       | 开启时文本(与 `inactiveText` 配合) |
| `inactiveText`  | String  | -       | 关闭时文本(与 `activeText` 配合)   |
| `activeColor`   | String  | -       | 开启时颜色                         |
| `inactiveColor` | String  | -       | 关闭时颜色                         |

> **注意:** 此组件不支持 `required`、`error`、`hint` 等表单验证属性。如需表单验证,请使用 `CompForm` 组件包裹。

**Events:**

- `@update:modelValue` - 值变化

**示例:**

```vue
<template>
  <CompSwitch v-model="isEnabled" label="启用通知" activeText="开" inactiveText="关" />
</template>
```

---

### CompCascader

**用途:** 级联选择器,支持多级选择

**Props:**

| 属性          | 类型    | 默认值            | 说明                   |
| :------------ | :------ | :---------------- | :--------------------- |
| `modelValue`  | Array   | `[]`              | v-model 绑定值(值数组) |
| `options`     | Array   | `[]`              | 选项数组(树形结构)     |
| `placeholder` | String  | `'Please select'` | 占位符                 |
| `disabled`    | Boolean | `false`           | 禁用状态               |
| `label`       | String  | -                 | 标签文本               |
| `required`    | Boolean | `false`           | 必填标记               |
| `error`       | String  | -                 | 错误提示               |
| `hint`        | String  | -                 | 辅助文本               |
| `separator`   | String  | `' / '`           | 显示值分隔符           |

**Events:**

- `@update:modelValue` - 值变化
- `@change` - 选择变化

**示例:**

```vue
<template>
  <CompCascader v-model="selectedRegion" :options="regions" label="地区" placeholder="请选择地区" />
</template>

<script>
export default {
  data() {
    return {
      selectedRegion: [],
      regions: [
        {
          label: '广东省',
          value: 'guangdong',
          children: [
            {
              label: '广州市',
              value: 'guangzhou',
              children: [
                { label: '天河区', value: 'tianhe' },
                { label: '海珠区', value: 'haizhu' },
              ],
            },
          ],
        },
      ],
    }
  },
}
</script>
```

---

### CompTransfer

**用途:** 穿梭框,用于在两个列表间移动数据

**Props:**

| 属性         | 类型    | 默认值                           | 说明                              |
| :----------- | :------ | :------------------------------- | :-------------------------------- |
| `modelValue` | Array   | `[]`                             | v-model 绑定值(已选中的 key 数组) |
| `data`       | Array   | `[]`                             | 数据源: `[{ key, label }]`        |
| `titles`     | Array   | `['Source', 'Target']`           | 左右列表标题                      |
| `props`      | Object  | `{ key: 'key', label: 'label' }` | 数据字段映射                      |
| `label`      | String  | -                                | 标签文本                          |
| `required`   | Boolean | `false`                          | 必填标记                          |
| `error`      | String  | -                                | 错误提示                          |
| `hint`       | String  | -                                | 辅助文本                          |
| `searchable` | Boolean | `false`                          | 是否可搜索                        |

**Events:**

- `@update:modelValue` - 值变化
- `@change` - 选择变化

**示例:**

```vue
<template>
  <CompTransfer
    v-model="selectedUsers"
    :data="allUsers"
    :titles="['可选用户', '已选用户']"
    label="选择用户"
    searchable
  />
</template>

<script>
export default {
  data() {
    return {
      selectedUsers: [],
      allUsers: [
        { key: '1', label: '张三' },
        { key: '2', label: '李四' },
        { key: '3', label: '王五' },
      ],
    }
  },
}
</script>
```

---

### CompForm

**用途:** 表单容器,支持验证和布局

**Props:**

| 属性         | 类型    | 默认值    | 说明                     |
| :----------- | :------ | :-------- | :----------------------- |
| `modelValue` | Object  | `{}`      | 表单数据对象             |
| `formItems`  | Array   | `[]`      | 表单项配置数组           |
| `labelWidth` | String  | `'120px'` | 标签宽度                 |
| `inline`     | Boolean | `false`   | 是否行内表单             |
| `columns`    | Number  | `1`       | 列数: `1`, `2`, `3`, `4` |

**Events:**

- `@update:modelValue` - 表单数据变化
- `@submit` - 表单提交(验证通过后)

**Slots:**

- 动态插槽 - 通过 `formItems` 中的 `slot` 字段定义

**Methods:**

- `validate()` - 验证整个表单
- `validateField(field)` - 验证单个字段
- `resetFields()` - 重置表单
- `clearValidate(key)` - 清除验证

**formItems 配置:**

```javascript
{
  key: 'username',        // 字段名
  label: '用户名',        // 标签
  type: 'input',          // 类型: input, select, datepicker, radio, checkbox, switch
  placeholder: '请输入',  // 占位符
  required: true,         // 是否必填
  rules: [],              // async-validator 规则
  disabled: false,        // 是否禁用
  show: true,             // 是否显示(可以是函数)
  options: [],            // select/radio/checkbox 的选项
  slot: 'customSlot',     // 自定义插槽名
}
```

**示例:**

```vue
<template>
  <CompForm
    ref="formRef"
    v-model="formData"
    :form-items="formItems"
    :columns="2"
    @submit="handleSubmit"
  >
    <template #customSlot>
      <div>自定义内容</div>
    </template>
  </CompForm>

  <CompBaseButton @click="submitForm">提交</CompBaseButton>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        gender: '',
      },
      formItems: [
        {
          key: 'username',
          label: '用户名',
          type: 'input',
          required: true,
          rules: [
            { required: true, message: '请输入用户名' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符' },
          ],
        },
        {
          key: 'email',
          label: '邮箱',
          type: 'input',
          subType: 'email',
          required: true,
        },
        {
          key: 'gender',
          label: '性别',
          type: 'radio',
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
          ],
        },
      ],
    }
  },
  methods: {
    async submitForm() {
      const valid = await this.$refs.formRef.validate()
      if (valid) {
        console.log('表单数据:', this.formData)
      }
    },
    handleSubmit(data) {
      console.log('提交:', data)
    },
  },
}
</script>
```

---

## 数据展示

### CompDataTable

**用途:** 数据表格,支持自定义列和插槽

**Props:**

| 属性          | 类型    | 默认值  | 说明                                               |
| :------------ | :------ | :------ | :------------------------------------------------- |
| `columns`     | Array   | `[]`    | 列配置: `[{ key, label, headerClass, cellClass }]` |
| `data`        | Array   | `[]`    | 表格数据                                           |
| `rowKey`      | String  | `'id'`  | 行唯一标识字段                                     |
| `loading`     | Boolean | `false` | 加载状态                                           |
| `emptyText`   | String  | -       | 空状态文本                                         |
| `loadingText` | String  | -       | 加载文本                                           |

**Slots:**

- `cell-{columnKey}` - 自定义列内容,参数: `{ row, column, index }`
- `empty` - 自定义空状态

**示例:**

```vue
<template>
  <CompDataTable :columns="columns" :data="tableData" :loading="isLoading" row-key="id">
    <template #cell-status="{ row }">
      <span :class="row.status === 'active' ? 'text-success' : 'text-danger'">
        {{ row.status }}
      </span>
    </template>

    <template #cell-actions="{ row }">
      <CompBaseButton size="sm" @click="handleEdit(row)">编辑</CompBaseButton>
    </template>
  </CompDataTable>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { key: 'name', label: '姓名' },
        { key: 'email', label: '邮箱' },
        { key: 'status', label: '状态' },
        { key: 'actions', label: '操作' },
      ],
      tableData: [
        { id: 1, name: '张三', email: 'zhang@example.com', status: 'active' },
        { id: 2, name: '李四', email: 'li@example.com', status: 'inactive' },
      ],
      isLoading: false,
    }
  },
}
</script>
```

---

## 反馈组件

### CompModal

**用途:** 模态框,支持自定义内容和按钮

**Props:**

| 属性          | 类型    | 默认值          | 说明             |
| :------------ | :------ | :-------------- | :--------------- |
| `modelValue`  | Boolean | `false`         | v-model 显示状态 |
| `title`       | String  | `'Modal Title'` | 标题             |
| `content`     | String  | -               | 内容文本         |
| `showFooter`  | Boolean | `false`         | 是否显示底部     |
| `showConfirm` | Boolean | `true`          | 是否显示确认按钮 |
| `showCancel`  | Boolean | `true`          | 是否显示取消按钮 |
| `confirmText` | String  | -               | 确认按钮文本     |
| `cancelText`  | String  | -               | 取消按钮文本     |

**Events:**

- `@update:modelValue` - 显示状态变化
- `@close` - 关闭
- `@confirm` - 确认
- `@cancel` - 取消

**Slots:**

- `default` - 主体内容
- `footer` - 底部内容

**示例:**

```vue
<template>
  <CompBaseButton @click="showModal = true">打开模态框</CompBaseButton>

  <CompModal
    v-model="showModal"
    title="确认删除"
    show-footer
    @confirm="handleConfirm"
    @cancel="showModal = false"
  >
    <p>确定要删除这条记录吗?</p>
  </CompModal>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    handleConfirm() {
      console.log('确认删除')
      this.showModal = false
    },
  },
}
</script>
```

---

### CompToast

**用途:** 消息提示,全局单例组件

**使用方式:**

通过全局方法调用,无需手动添加组件

**API:**

```javascript
// 成功提示
this.$toast.success('操作成功')

// 错误提示
this.$toast.error('操作失败')

// 警告提示
this.$toast.warning('请注意')

// 普通提示
this.$toast.info('提示信息')

// 自定义
this.$toast.show({
  type: 'success',
  title: '成功',
  message: '操作完成',
  duration: 3000,
})
```

**示例:**

```vue
<script>
export default {
  methods: {
    handleSave() {
      // 保存逻辑
      this.$toast.success('保存成功')
    },
    handleError() {
      this.$toast.error('网络错误,请重试')
    },
  },
}
</script>
```

---

### CompTipPopover

**用途:** 提示气泡,用于显示帮助信息

**Props:**

| 属性           | 类型          | 默认值    | 说明                                   |
| :------------- | :------------ | :-------- | :------------------------------------- |
| `title`        | String        | -         | 标题                                   |
| `content`      | String        | -         | 内容(支持 HTML)                        |
| `slotName`     | String        | -         | 插槽名称                               |
| `placement`    | String        | `'top'`   | 位置: `top`, `right`, `bottom`, `left` |
| `tooltipStyle` | String        | `'dark'`  | 样式: `light`, `dark`                  |
| `width`        | String/Number | `'auto'`  | 宽度                                   |
| `trigger`      | String        | `'hover'` | 触发方式: `hover`, `click`             |
| `venusStyle`   | Boolean       | `false`   | 使用 Venus 风格图标                    |

**Events:**

- `@show` - 显示时触发
- `@hide` - 隐藏时触发

**Slots:**

- `trigger` - 自定义触发元素

**示例:**

```vue
<template>
  <label>
    用户名
    <CompTipPopover content="用户名长度为 3-20 个字符" placement="right" />
  </label>

  <CompTipPopover title="高级功能" content="<ul><li>功能1</li><li>功能2</li></ul>" trigger="click">
    <template #trigger>
      <button>查看详情</button>
    </template>
  </CompTipPopover>
</template>
```

---

## 图表组件

### CompLineChart

**用途:** 折线图,基于 uPlot

**Props:**

| 属性     | 类型         | 默认值                              | 说明         |
| :------- | :----------- | :---------------------------------- | :----------- |
| `data`   | Array/Object | `[]`                                | 图表数据     |
| `height` | Number       | `320`                               | 图表高度(px) |
| `colors` | Array        | `['#3B82F6', '#10B981', '#F59E0B']` | 颜色数组     |
| `smooth` | Boolean      | `true`                              | 是否平滑曲线 |

**数据格式:**

```javascript
// 格式1: 对象格式(推荐)
{
  labels: ['1月', '2月', '3月'],
  datasets: [
    { name: '销售额', values: [100, 200, 150] },
    { name: '利润', values: [50, 80, 70] },
  ],
}

// 格式2: 数组格式
[
  { x: '1月', y: 100 },
  { x: '2月', y: 200 },
]
```

**示例:**

```vue
<template>
  <CompLineChart :data="chartData" :height="400" :colors="['#3B82F6', '#10B981']" smooth />
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
        datasets: [
          {
            name: '销售额',
            values: [120, 200, 150, 180, 220, 250],
          },
          {
            name: '利润',
            values: [60, 100, 75, 90, 110, 125],
          },
        ],
      },
    }
  },
}
</script>
```

---

### CompAreaChart

**用途:** 面积图,基于 uPlot

**Props:**

| 属性     | 类型         | 默认值                              | 说明         |
| :------- | :----------- | :---------------------------------- | :----------- |
| `data`   | Array/Object | `[]`                                | 图表数据     |
| `height` | Number       | `320`                               | 图表高度(px) |
| `colors` | Array        | `['#3B82F6', '#10B981', '#F59E0B']` | 颜色数组     |
| `smooth` | Boolean      | `true`                              | 是否平滑曲线 |

**数据格式:** 与 CompLineChart 相同

**示例:**

```vue
<template>
  <CompAreaChart :data="areaData" :height="350" />
</template>
```

---

### CompBarChart

**用途:** 柱状图,基于 uPlot

**Props:**

| 属性     | 类型         | 默认值                              | 说明         |
| :------- | :----------- | :---------------------------------- | :----------- |
| `data`   | Array/Object | `[]`                                | 图表数据     |
| `height` | Number       | `320`                               | 图表高度(px) |
| `colors` | Array        | `['#3B82F6', '#10B981', '#F59E0B']` | 颜色数组     |

**数据格式:** 与 CompLineChart 相同

**示例:**

```vue
<template>
  <CompBarChart :data="barData" :height="300" :colors="['#3B82F6', '#10B981', '#F59E0B']" />
</template>

<script>
export default {
  data() {
    return {
      barData: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          { name: '2023', values: [100, 120, 140, 160] },
          { name: '2024', values: [110, 130, 150, 180] },
        ],
      },
    }
  },
}
</script>
```

---

## 最佳实践

### 1. 表单验证

使用 `CompForm` 配合 `async-validator` 进行表单验证:

```javascript
import { emailRule, phoneRule } from '@/utils/validators'

formItems: [
  {
    key: 'email',
    label: '邮箱',
    type: 'input',
    rules: [emailRule()],
  },
  {
    key: 'phone',
    label: '手机号',
    type: 'input',
    rules: [phoneRule()],
  },
]
```

### 2. 组件自动注册

所有组件通过 `unplugin-vue-components` 自动注册,无需手动导入:

```vue
<template>
  <!-- 直接使用,无需 import -->
  <CompInput v-model="value" />
  <CompBaseButton @click="handleClick">提交</CompBaseButton>
</template>
```

### 3. 国际化

组件内部已集成 `vue-i18n`,支持多语言:

```javascript
// 组件内部使用
this.$t('common.confirm')
this.$t('common.cancel')
```

### 4. 主题适配

所有组件自动适配暗色模式,使用 Tailwind 的 `dark:` 前缀:

```vue
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  内容
</div>
```

---

## 常见问题

### Q: 如何自定义表单验证规则?

A: 在 `src/utils/validators.js` 中添加自定义规则:

```javascript
export const customRule = (message = '验证失败') => ({
  validator: (rule, value) => {
    // 自定义验证逻辑
    return value.length > 5
  },
  message,
})
```

### Q: 如何全局配置 Toast 默认参数?

A: 在 `src/main.js` 中配置:

```javascript
app.config.globalProperties.$toast.config({
  duration: 5000,
  position: 'top-right',
})
```

### Q: 图表组件如何响应式调整大小?

A: 图表组件已内置 `ResizeObserver`,会自动响应容器大小变化。

---

## 更新日志

### 2026-01-08

- ✅ 验证所有 17 个组件的 API 与实际代码一致
- ✅ 修复 `CompDatePicker` 文档错误(删除不存在的 props)
- ✅ 补充 `CompSelect`, `CompSwitch`, `CompCheckbox` 缺失的 props
- ✅ 新增 `CompCascader` 和 `CompTransfer` 完整文档

### 2026-01-07

- ✅ 修复 `CompInput` 的 `maxlength` 属性
- ✅ 修正 `CompBaseButton` 的 `type` 可选值
- ✅ 新增所有组件的完整 API 文档
