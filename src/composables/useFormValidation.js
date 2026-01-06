import { ref, reactive, computed } from 'vue'
import { useI18n as useVueI18n } from 'vue-i18n'
import Schema from 'async-validator'

/**
 * 表单验证 Composable - 基于 async-validator
 */
export function useFormValidation(initialValues = {}) {
  const { t } = useVueI18n()

  // 表单数据
  const formData = reactive({ ...initialValues })

  // 验证规则 (符合 async-validator 格式)
  const rules = ref({})

  // 错误信息 (k: message 映射)
  const errors = reactive({})

  // 是否正在验证
  const validating = ref(false)

  /**
   * 设置验证规则
   */
  const setRules = (newRules) => {
    rules.value = newRules
  }

  /**
   * 处理翻译逻辑
   * 如果消息是一个 i18n key，则进行翻译
   */
  const translateMessage = (message, params) => {
    if (typeof message === 'string' && message.includes('.')) {
      try {
        return t(message, params)
      } catch {
        return message
      }
    }
    return message
  }

  /**
   * 验证单个字段
   */
  const validateField = async (field) => {
    if (!rules.value[field]) {
      delete errors[field]
      return true
    }

    const descriptor = { [field]: rules.value[field] }
    const validator = new Schema(descriptor)
    const source = { [field]: formData[field] }

    try {
      await validator.validate(source)
      delete errors[field]
      return true
    } catch ({ errors: validationErrors }) {
      if (validationErrors && validationErrors.length > 0) {
        const error = validationErrors[0]
        errors[field] = translateMessage(error.message, error)
      }
      return false
    }
  }

  /**
   * 验证所有字段
   */
  const validate = async () => {
    if (Object.keys(rules.value).length === 0) return true

    validating.value = true
    const validator = new Schema(rules.value)

    try {
      await validator.validate(formData)
      // 清空所有错误
      Object.keys(errors).forEach((key) => delete errors[key])
      validating.value = false
      return true
    } catch ({ errors: validationErrors }) {
      // 先清空旧错误
      Object.keys(errors).forEach((key) => delete errors[key])

      // 填充新错误 (只取每个字段的第一个错误)
      if (validationErrors) {
        validationErrors.forEach((error) => {
          if (!errors[error.field]) {
            errors[error.field] = translateMessage(error.message, error)
          }
        })
      }
      validating.value = false
      return false
    }
  }

  /**
   * 重置表单
   */
  const resetForm = () => {
    Object.keys(formData).forEach((key) => {
      formData[key] = initialValues[key] !== undefined ? initialValues[key] : ''
    })
    clearErrors()
  }

  /**
   * 清除错误
   */
  const clearErrors = () => {
    Object.keys(errors).forEach((key) => {
      delete errors[key]
    })
  }

  // 是否有错误
  const hasErrors = computed(() => Object.keys(errors).length > 0)

  return {
    formData,
    rules,
    errors,
    validating,
    hasErrors,
    setRules,
    validateField,
    validate,
    resetForm,
    clearErrors,
  }
}
