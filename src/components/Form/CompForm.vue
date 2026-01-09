<template>
  <form class="CompForm" autocomplete="off" @submit.prevent="handleSubmit">
    <div :class="[inline ? 'flex flex-row flex-wrap gap-4' : 'space-y-4', gridClass]">
      <template v-for="(item, index) in formItems" :key="index">
        <!-- Regular form field -->
        <div v-if="!item.slot && controlShow(item.show)" :class="fieldClass">
          <div class="relative">
            <!-- Label with optional tip icon - 由 CompForm 统一渲染 -->
            <label
              v-if="item.label"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {{ item.label }}
              <span
                v-if="item.required || (item.rules && item.rules.length > 0)"
                class="text-danger"
                >*</span
              >

              <!-- Tip icon -->
              <CompTipPopover
                v-if="item.tip"
                :content="item.tip"
                :venus-style="true"
                class="ml-1"
              />
            </label>

            <!-- Input field -->
            <CompInput
              v-if="item.type === 'input'"
              :model-value="getFieldValue(item.key)"
              :type="item.subType || 'text'"
              :placeholder="resolveValue(item.placeholder) || ''"
              :disabled="resolveValue(item.disabled)"
              @update:model-value="handleFieldChange($event, item)"
              @blur="validateField(item.key)"
            />

            <!-- Select field -->
            <CompSelect
              v-else-if="item.type === 'select'"
              :model-value="getFieldValue(item.key)"
              :options="resolveValue(item.options) || []"
              :placeholder="resolveValue(item.placeholder) || ''"
              :disabled="resolveValue(item.disabled)"
              :multiple="item.multiple"
              :searchable="item.filterable"
              @update:model-value="handleFieldChange($event, item)"
            />

            <!-- Date picker field -->
            <CompDatePicker
              v-else-if="item.type === 'datepicker'"
              :model-value="getFieldValue(item.key)"
              :mode="item.mode || 'date'"
              :placeholder="resolveValue(item.placeholder) || ''"
              :disabled="resolveValue(item.disabled)"
              :range="item.range"
              @update:model-value="handleFieldChange($event, item)"
            />

            <!-- Radio group -->
            <CompRadio
              v-else-if="item.type === 'radio'"
              :model-value="getFieldValue(item.key)"
              :options="resolveValue(item.options) || []"
              :name="item.key"
              :disabled="resolveValue(item.disabled)"
              @update:model-value="handleFieldChange($event, item)"
            />

            <!-- Checkbox group -->
            <CompCheckbox
              v-else-if="item.type === 'checkbox'"
              :model-value="getFieldValue(item.key)"
              :options="resolveValue(item.options) || []"
              :name="item.key"
              :disabled="resolveValue(item.disabled)"
              @update:model-value="handleFieldChange($event, item)"
            />

            <!-- Switch -->
            <CompSwitch
              v-else-if="item.type === 'switch'"
              :model-value="getFieldValue(item.key)"
              :disabled="resolveValue(item.disabled)"
              :active-text="item.activeText"
              :inactive-text="item.inactiveText"
              @update:model-value="handleFieldChange($event, item)"
            />

            <!-- Error message -->
            <p v-if="getFieldError(item.key)" class="mt-1 text-sm text-danger">
              {{ getFieldError(item.key) }}
            </p>
            <!-- Hint message -->
            <p v-else-if="item.hint" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {{ item.hint }}
            </p>

            <!-- Error message -->
            <!-- 错误信息已由各个子组件自己显示,这里不需要重复显示 -->
          </div>
        </div>

        <!-- Custom slot -->
        <div v-else-if="item.slot && controlShow(item.show)" :class="fieldClass">
          <slot :name="item.slot"></slot>
        </div>
      </template>
    </div>
  </form>
</template>

<script>
import Schema from 'async-validator'

export default {
  name: 'CompForm',
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    formItems: {
      type: Array,
      required: true,
    },
    labelWidth: {
      type: String,
      default: '120px',
    },
    inline: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Number,
      default: 1,
      validator: (value) => [1, 2, 3, 4].includes(value),
    },
  },
  emits: ['update:modelValue', 'submit'],
  data() {
    return {
      errors: {},
    }
  },
  computed: {
    gridClass() {
      if (this.inline) return ''
      const gridCols = {
        1: 'grid grid-cols-1',
        2: 'grid grid-cols-1 md:grid-cols-2 gap-4',
        3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
        4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
      }
      return gridCols[this.columns]
    },
    fieldClass() {
      return this.inline ? '' : ''
    },
    // 构建验证规则对象
    validationRules() {
      const rules = {}
      this.formItems.forEach((item) => {
        if (item.rules && item.rules.length > 0) {
          rules[item.key] = item.rules
        } else if (item.required) {
          // 如果只有 required,自动创建规则
          rules[item.key] = [
            {
              required: true,
              message: `${item.label || item.key} is required`,
            },
          ]
        }
      })
      return rules
    },
  },
  methods: {
    controlShow(show) {
      if (show === undefined || show === true) {
        return true
      }
      if (typeof show === 'function') {
        return show(this.modelValue)
      }
      return false
    },
    resolveValue(value) {
      if (typeof value === 'function') {
        return value(this.modelValue)
      }
      return value
    },
    getFieldValue(key) {
      // Support nested keys like 'user.name'
      const keys = key.split('.')
      let value = this.modelValue
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = value[k]
        } else {
          return undefined
        }
      }
      return value
    },
    setFieldValue(key, value) {
      const keys = key.split('.')
      const newValue = { ...this.modelValue }
      let current = newValue

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      this.$emit('update:modelValue', newValue)
    },
    handleFieldChange(value, item) {
      this.setFieldValue(item.key, value)

      // Clear error when field changes
      if (this.errors[item.key]) {
        this.errors = { ...this.errors, [item.key]: null }
      }

      // Emit custom event if specified
      if (item.emit) {
        this.$emit(item.emit, value)
      }
    },
    getFieldError(key) {
      return this.errors[key]
    },
    // 验证单个字段
    async validateField(field) {
      if (!this.validationRules[field]) {
        return true
      }

      const descriptor = { [field]: this.validationRules[field] }
      const validator = new Schema(descriptor)
      const fieldValue = this.getFieldValue(field)

      try {
        await validator.validate({ [field]: fieldValue })
        this.errors = { ...this.errors, [field]: '' }
        return true
      } catch ({ errors }) {
        if (errors && errors[0]) {
          this.errors = { ...this.errors, [field]: errors[0].message }
        }
        return false
      }
    },
    // 验证整个表单
    async validate() {
      if (Object.keys(this.validationRules).length === 0) {
        return true
      }

      const validator = new Schema(this.validationRules)

      // 重置错误
      this.errors = {}

      // 构建验证数据对象
      const dataToValidate = {}
      Object.keys(this.validationRules).forEach((key) => {
        dataToValidate[key] = this.getFieldValue(key)
      })

      try {
        await validator.validate(dataToValidate)
        return true
      } catch ({ errors }) {
        if (errors) {
          errors.forEach((error) => {
            this.errors[error.field] = error.message
          })
        }
        this.errors = { ...this.errors }
        return false
      }
    },
    resetFields() {
      this.errors = {}
      // Reset all fields to their initial values
      const resetValue = {}
      this.formItems.forEach((item) => {
        if (item.type === 'checkbox' || item.multiple) {
          resetValue[item.key] = []
        } else if (item.type === 'switch') {
          resetValue[item.key] = false
        } else {
          resetValue[item.key] = ''
        }
      })
      this.$emit('update:modelValue', resetValue)
    },
    clearValidate(key) {
      if (key) {
        this.errors = { ...this.errors, [key]: null }
      } else {
        this.errors = {}
      }
    },
    handleSubmit() {
      this.validate().then((valid) => {
        if (valid) {
          this.$emit('submit', this.modelValue)
        }
      })
    },
  },
}
</script>

<style scoped>
/* Additional form styles if needed */
</style>
