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
 * 使用示例:
 * rules: [
 *   validators.required('用户名不能为空'),
 *   validators.minLength(4, '用户名至少4个字符')
 * ]
 */
export const validators = {
  // 必填验证
  required(message = '此字段为必填项') {
    return {
      required: true,
      message,
      whitespace: true,
    }
  },

  // 邮箱验证
  email(message = '请输入有效的邮箱地址') {
    return {
      type: 'email',
      message,
    }
  },

  // 手机号验证 (中国)
  phone(message = '请输入有效的手机号码') {
    return {
      pattern: /^1[3-9]\d{9}$/,
      message,
    }
  },

  // URL 验证
  url(message = '请输入有效的URL地址') {
    return {
      type: 'url',
      message,
    }
  },

  // 密码强度验证 (至少6位,包含字母和数字)
  password(message = '密码至少6位,需包含字母和数字') {
    return {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      message,
    }
  },

  // 强密码验证 (至少8位,包含大小写字母和数字)
  strongPassword(message = '密码至少8位,需包含大小写字母和数字') {
    return {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message,
    }
  },

  // 用户名验证 (4-20位,字母数字下划线)
  username(message = '用户名4-20位,只能包含字母数字下划线') {
    return {
      pattern: /^[a-zA-Z0-9_]{4,20}$/,
      message,
    }
  },

  // 最小长度验证
  minLength(min, message) {
    return {
      min,
      message: message || `最少需要 ${min} 个字符`,
    }
  },

  // 最大长度验证
  maxLength(max, message) {
    return {
      max,
      message: message || `最多允许 ${max} 个字符`,
    }
  },

  // 长度范围验证
  lengthRange(min, max, message) {
    return {
      min,
      max,
      message: message || `长度必须在 ${min} 到 ${max} 个字符之间`,
    }
  },

  // 正则表达式验证
  pattern(regex, message = '格式不正确') {
    return {
      pattern: regex,
      message,
    }
  },

  // IP地址验证
  ip(message = '请输入有效的IP地址') {
    return {
      pattern: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
      message,
    }
  },

  // 数字验证
  number(message = '请输入有效的数字') {
    return {
      type: 'number',
      message,
      transform: (value) => {
        if (value === '' || value === null || value === undefined) return value
        return Number(value)
      },
    }
  },

  // 整数验证
  integer(message = '请输入整数') {
    return {
      type: 'integer',
      message,
      transform: (value) => {
        if (value === '' || value === null || value === undefined) return value
        return Number(value)
      },
    }
  },

  // 数字范围验证
  range(min, max, message) {
    return {
      type: 'number',
      min,
      max,
      message: message || `数值必须在 ${min} 到 ${max} 之间`,
      transform: (value) => Number(value),
    }
  },

  // 身份证号验证 (中国)
  idCard(message = '请输入有效的身份证号码') {
    return {
      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      message,
    }
  },

  // 仅中文验证
  chinese(message = '只能输入中文字符') {
    return {
      pattern: /^[\u4e00-\u9fa5]+$/,
      message,
    }
  },

  // 仅英文验证
  english(message = '只能输入英文字符') {
    return {
      pattern: /^[a-zA-Z]+$/,
      message,
    }
  },

  // 字母和数字组合
  alphanumeric(message = '只能输入字母和数字') {
    return {
      pattern: /^[a-zA-Z0-9]+$/,
      message,
    }
  },

  // 确认密码验证
  confirmPassword(passwordField, message = '两次输入的密码不一致') {
    return {
      validator: (rule, value, callback, source) => {
        return new Promise((resolve, reject) => {
          if (value === source[passwordField]) {
            resolve()
          } else {
            reject(message)
          }
        })
      },
    }
  },

  // 数组非空验证
  arrayNotEmpty(message = '请至少选择一项') {
    return {
      type: 'array',
      min: 1,
      message,
    }
  },

  // 自定义验证器
  custom(validator, message = '验证失败') {
    return {
      validator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (validator(value)) {
            resolve()
          } else {
            reject(message)
          }
        })
      },
    }
  },
}
