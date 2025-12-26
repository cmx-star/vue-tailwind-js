import { ref, reactive, computed } from "vue";
import { useI18n as useVueI18n } from "vue-i18n";

/**
 * 表单验证 Composable
 */
export function useFormValidation(initialValues = {}) {
  const { t } = useVueI18n();

  // 表单数据
  const formData = reactive({ ...initialValues });

  // 验证规则
  const rules = ref({});

  // 错误信息
  const errors = reactive({});

  // 是否正在验证
  const validating = ref(false);

  /**
   * 设置验证规则
   */
  const setRules = (newRules) => {
    rules.value = newRules;
  };

  /**
   * 验证单个字段
   */
  const validateField = async (field) => {
    const fieldRules = rules.value[field];
    if (!fieldRules || !Array.isArray(fieldRules)) {
      delete errors[field];
      return true;
    }

    const value = formData[field];

    for (const rule of fieldRules) {
      const { validator, message, params } = rule;

      // 执行验证
      const isValid =
        typeof validator === "function" ? await validator(value) : true;

      if (!isValid) {
        // 翻译错误信息
        errors[field] = params ? t(message, params) : t(message);
        return false;
      }
    }

    delete errors[field];
    return true;
  };

  /**
   * 验证所有字段
   */
  const validate = async () => {
    validating.value = true;

    const fields = Object.keys(rules.value);
    const results = await Promise.all(
      fields.map((field) => validateField(field))
    );

    validating.value = false;
    return results.every((result) => result === true);
  };

  /**
   * 重置表单
   */
  const resetForm = () => {
    Object.keys(formData).forEach((key) => {
      formData[key] = initialValues[key] || "";
    });
    Object.keys(errors).forEach((key) => {
      delete errors[key];
    });
  };

  /**
   * 清除错误
   */
  const clearErrors = () => {
    Object.keys(errors).forEach((key) => {
      delete errors[key];
    });
  };

  // 是否有错误
  const hasErrors = computed(() => Object.keys(errors).length > 0);

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
  };
}
