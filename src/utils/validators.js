/**
 * 表单验证规则
 */

/**
 * 验证邮箱
 */
export function validateEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(value)
}

/**
 * 验证手机号 (中国大陆)
 */
export function validatePhone(value) {
  const pattern = /^1[3-9]\d{9}$/
  return pattern.test(value)
}

/**
 * 验证 URL
 */
export function validateURL(value) {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

/**
 * 验证密码强度
 * 至少 6 位，包含字母和数字
 */
export function validatePassword(value) {
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  return pattern.test(value)
}

/**
 * 验证用户名
 * 4-20 位，字母、数字、下划线
 */
export function validateUsername(value) {
  const pattern = /^[a-zA-Z0-9_]{4,20}$/
  return pattern.test(value)
}

/**
 * 验证 IP 地址
 */
export function validateIP(value) {
  const pattern = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/
  return pattern.test(value)
}

/**
 * 通用验证规则工厂 (适配 async-validator)
 */
export const validators = {
  required: (message = 'common.validation.required') => ({
    required: true,
    message,
    whitespace: true,
  }),

  email: (message = 'common.validation.email') => ({
    type: 'email',
    message,
  }),

  phone: (message = 'common.validation.phone') => ({
    pattern: /^1[3-9]\d{9}$/,
    message,
  }),

  url: (message = 'common.validation.url') => ({
    type: 'url',
    message,
  }),

  password: (message = 'common.validation.password') => ({
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    message,
  }),

  username: (message = 'common.validation.username') => ({
    pattern: /^[a-zA-Z0-9_]{4,20}$/,
    message,
  }),

  minLength: (min, message = 'common.validation.minLength') => ({
    min,
    message,
  }),

  maxLength: (max, message = 'common.validation.maxLength') => ({
    max,
    message,
  }),

  pattern: (pattern, message = 'common.validation.pattern') => ({
    pattern,
    message,
  }),

  ip: (message = 'IP 格式不正确') => ({
    pattern: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    message,
  }),

  custom: (validator, message) => ({
    validator,
    message,
  }),
}
