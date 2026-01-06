/**
 * Form validation rules
 */

/**
 * Validate email
 */
export function validateEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(value)
}

/**
 * Validate phone number (China mainland)
 */
export function validatePhone(value) {
  const pattern = /^1[3-9]\d{9}$/
  return pattern.test(value)
}

/**
 * Validate URL
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
 * Validate password strength
 * At least 6 characters, including letters and numbers
 */
export function validatePassword(value) {
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  return pattern.test(value)
}

/**
 * Validate username
 * 4-20 characters, letters, numbers, underscores
 */
export function validateUsername(value) {
  const pattern = /^[a-zA-Z0-9_]{4,20}$/
  return pattern.test(value)
}

/**
 * Validate IP address
 */
export function validateIP(value) {
  const pattern = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/
  return pattern.test(value)
}

/**
 * Validation rule factory (compatible with async-validator)
 * Usage example:
 * rules: [
 *   validators.required(this.$t('common.validation.required')),
 *   validators.minLength(4, this.$t('common.validation.minLength', { min: 4 }))
 * ]
 */
export const validators = {
  // Required validation
  required(message = 'This field is required') {
    return {
      required: true,
      message,
      whitespace: true,
    }
  },

  // Email validation
  email(message = 'Please enter a valid email address') {
    return {
      type: 'email',
      message,
    }
  },

  // Phone validation (China)
  phone(message = 'Please enter a valid phone number') {
    return {
      pattern: /^1[3-9]\d{9}$/,
      message,
    }
  },

  // URL validation
  url(message = 'Please enter a valid URL') {
    return {
      type: 'url',
      message,
    }
  },

  // Password strength validation (at least 6 characters with letters and numbers)
  password(message = 'Password must be at least 6 characters with letters and numbers') {
    return {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      message,
    }
  },

  // Strong password validation (at least 8 characters with uppercase, lowercase and numbers)
  strongPassword(
    message = 'Password must be at least 8 characters with uppercase, lowercase and numbers',
  ) {
    return {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message,
    }
  },

  // Username validation (4-20 characters, letters, numbers, underscores)
  username(message = 'Username must be 4-20 characters, letters, numbers and underscores only') {
    return {
      pattern: /^[a-zA-Z0-9_]{4,20}$/,
      message,
    }
  },

  // Minimum length validation
  minLength(min, message) {
    return {
      min,
      message: message || `Minimum ${min} characters required`,
    }
  },

  // Maximum length validation
  maxLength(max, message) {
    return {
      max,
      message: message || `Maximum ${max} characters allowed`,
    }
  },

  // Length range validation
  lengthRange(min, max, message) {
    return {
      min,
      max,
      message: message || `Length must be between ${min} and ${max} characters`,
    }
  },

  // Regular expression validation
  pattern(regex, message = 'Invalid format') {
    return {
      pattern: regex,
      message,
    }
  },

  // IP address validation
  ip(message = 'Please enter a valid IP address') {
    return {
      pattern: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
      message,
    }
  },

  // Number validation
  number(message = 'Please enter a valid number') {
    return {
      type: 'number',
      message,
      transform: (value) => {
        if (value === '' || value === null || value === undefined) return value
        return Number(value)
      },
    }
  },

  // Integer validation
  integer(message = 'Please enter an integer') {
    return {
      type: 'integer',
      message,
      transform: (value) => {
        if (value === '' || value === null || value === undefined) return value
        return Number(value)
      },
    }
  },

  // Number range validation
  range(min, max, message) {
    return {
      type: 'number',
      min,
      max,
      message: message || `Value must be between ${min} and ${max}`,
      transform: (value) => Number(value),
    }
  },

  // ID card validation (China)
  idCard(message = 'Please enter a valid ID card number') {
    return {
      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      message,
    }
  },

  // Chinese characters only
  chinese(message = 'Only Chinese characters allowed') {
    return {
      pattern: /^[\u4e00-\u9fa5]+$/,
      message,
    }
  },

  // English characters only
  english(message = 'Only English characters allowed') {
    return {
      pattern: /^[a-zA-Z]+$/,
      message,
    }
  },

  // Alphanumeric validation
  alphanumeric(message = 'Only letters and numbers allowed') {
    return {
      pattern: /^[a-zA-Z0-9]+$/,
      message,
    }
  },

  // Confirm password validation
  confirmPassword(passwordField, message = 'Passwords do not match') {
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

  // Array not empty validation
  arrayNotEmpty(message = 'Please select at least one item') {
    return {
      type: 'array',
      min: 1,
      message,
    }
  },

  // Custom validator
  custom(validator, message = 'Validation failed') {
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
