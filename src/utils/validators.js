/**
 * 表单验证规则
 */

/**
 * 验证邮箱
 */
export function validateEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
}

/**
 * 验证手机号 (中国大陆)
 */
export function validatePhone(value) {
  const pattern = /^1[3-9]\d{9}$/;
  return pattern.test(value);
}

/**
 * 验证 URL
 */
export function validateURL(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * 验证密码强度
 * 至少 6 位，包含字母和数字
 */
export function validatePassword(value) {
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return pattern.test(value);
}

/**
 * 验证用户名
 * 4-20 位，字母、数字、下划线
 */
export function validateUsername(value) {
  const pattern = /^[a-zA-Z0-9_]{4,20}$/;
  return pattern.test(value);
}

/**
 * 验证 IP 地址
 */
export function validateIP(value) {
  const pattern = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
  return pattern.test(value);
}

/**
 * 通用验证规则
 */
export const validators = {
  required: (message = "common.validation.required") => ({
    validator: (value) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "string") return value.trim().length > 0;
      return value !== null && value !== undefined;
    },
    message,
  }),

  email: (message = "common.validation.email") => ({
    validator: validateEmail,
    message,
  }),

  phone: (message = "common.validation.phone") => ({
    validator: validatePhone,
    message,
  }),

  url: (message = "common.validation.url") => ({
    validator: validateURL,
    message,
  }),

  password: (message = "common.validation.password") => ({
    validator: validatePassword,
    message,
  }),

  username: (message = "common.validation.username") => ({
    validator: validateUsername,
    message,
  }),

  minLength: (min, message = "common.validation.minLength") => ({
    validator: (value) => value && value.length >= min,
    message,
    params: { min },
  }),

  maxLength: (max, message = "common.validation.maxLength") => ({
    validator: (value) => !value || value.length <= max,
    message,
    params: { max },
  }),

  pattern: (regex, message = "common.validation.pattern") => ({
    validator: (value) => regex.test(value),
    message,
  }),

  custom: (validator, message) => ({
    validator,
    message,
  }),
};
