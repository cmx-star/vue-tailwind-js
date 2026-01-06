<template>
  <form class="CompForm" autocomplete="off" @submit.prevent="handleSubmit">
    <div :class="[inline ? 'flex flex-wrap gap-4' : 'space-y-4', gridClass]">
      <template v-for="(item, index) in formItems" :key="index">
        <!-- Regular form field -->
        <div v-if="!item.slot && controlShow(item.show)" :class="fieldClass">
          <div class="relative">
            <!-- Label with optional tip icon -->
            <label
              v-if="item.label"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {{ item.label }}
              <span
                v-if="item.required || (item.rules && item.rules.length > 0)"
                class="text-red-500"
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
              :placeholder="item.placeholder || ''"
              :disabled="item.disabled"
              :required="item.required"
              :error="getFieldError(item.key)"
              @update:model-value="handleFieldChange($event, item)"
              @blur="validateField(item.key)"
            />

            <!-- Select field -->
            <CompSelect
              v-else-if="item.type === 'select'"
              :model-value="getFieldValue(item.key)"
              :options="item.options || []"
              :placeholder="item.placeholder || ''"
              :disabled="item.disabled"
              :multiple="item.multiple"
              :searchable="item.filterable"
              @update:model-value="handleFieldChange($event, item)"
            />

            <!-- Date picker field -->
            <CompDatePicker
              v-else-if="item.type === 'datepicker'"
              :model-value="getFieldValue(item.key)"
              :mode="item.mode || 'date'"
              :placeholder="item.placeholder || ''"
              :disabled="item.disabled"
              :range="item.range"
              @update:model-value="handleFieldChange($event, item)"
            />

            <!-- Radio group -->
            <div v-else-if="item.type === 'radio'" class="space-y-2">
              <label
                v-for="(option, optIndex) in item.options"
                :key="optIndex"
                class="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  :name="item.key"
                  :value="option.value"
                  :checked="getFieldValue(item.key) === option.value"
                  :disabled="option.disabled || item.disabled"
                  class="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  @change="handleFieldChange(option.value, item)"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">
                  {{ option.label }}
                </span>
              </label>
            </div>

            <!-- Checkbox group -->
            <div v-else-if="item.type === 'checkbox'" class="space-y-2">
              <label
                v-for="(option, optIndex) in item.options"
                :key="optIndex"
                class="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  :value="option.value"
                  :checked="isChecked(item.key, option.value)"
                  :disabled="option.disabled || item.disabled"
                  class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  @change="handleCheckboxChange($event, item, option.value)"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">
                  {{ option.label }}
                </span>
              </label>
            </div>

            <!-- Switch -->
            <div v-else-if="item.type === 'switch'" class="flex items-center space-x-3">
              <button
                type="button"
                :disabled="item.disabled"
                :class="[
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  getFieldValue(item.key) ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700',
                  item.disabled ? 'opacity-50 cursor-not-allowed' : '',
                ]"
                @click="handleFieldChange(!getFieldValue(item.key), item)"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    getFieldValue(item.key) ? 'translate-x-5' : 'translate-x-0',
                  ]"
                />
              </button>
              <span
                v-if="item.activeText || item.inactiveText"
                class="text-sm text-gray-700 dark:text-gray-300"
              >
                {{ getFieldValue(item.key) ? item.activeText : item.inactiveText }}
              </span>
            </div>

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
    handleCheckboxChange(event, item, value) {
      const currentValue = this.getFieldValue(item.key) || []
      let newValue

      if (event.target.checked) {
        newValue = [...currentValue, value]
      } else {
        newValue = currentValue.filter((v) => v !== value)
      }

      this.handleFieldChange(newValue, item)
    },
    isChecked(key, value) {
      const fieldValue = this.getFieldValue(key)
      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(value)
      }
      return false
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
