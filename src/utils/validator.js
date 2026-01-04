import Schema from 'async-validator'

// 字段名称映射
const fieldNames = {
  firstName: '名字',
  lastName: '姓氏',
  email: '邮箱地址',
  phone: '电话号码',
  username: '用户名',
  password: '密码',
  confirmPassword: '确认密码',
}

// 获取字段中文名称
export function getFieldName(field) {
  return fieldNames[field] || field
}

// 创建验证规则
export function createRules(step, formData) {
  const rules = {}

  if (step === 0) {
    rules.firstName = [{ required: true, message: '名字是必填项' }]
    rules.lastName = [{ required: true, message: '姓氏是必填项' }]
    rules.email = [
      { required: true, message: '邮箱地址是必填项' },
      { type: 'email', message: '邮箱地址必须是有效的邮箱地址' },
    ]
  }

  if (step === 1) {
    rules.username = [
      { required: true, message: '用户名是必填项' },
      { min: 3, message: '用户名至少需要3个字符' },
    ]
    rules.password = [
      { required: true, message: '密码是必填项' },
      { min: 6, message: '密码至少需要6个字符' },
    ]
    rules.confirmPassword = [
      { required: true, message: '请确认密码' },
      {
        validator: (rule, value, callback) => {
          if (value !== formData.password) {
            callback(new Error('确认密码必须与密码匹配'))
          } else {
            callback()
          }
        },
      },
    ]
  }

  return rules
}

// 验证单个字段
export function validateField(validator, field, value, callback) {
  validator.validate({ [field]: value }, (errors) => {
    if (errors && errors.length > 0) {
      callback(errors[0].message)
    } else {
      callback(null)
    }
  })
}

// 验证整个步骤
export function validateStep(step, formData) {
  return new Promise((resolve, reject) => {
    const rules = createRules(step, formData)
    if (Object.keys(rules).length === 0) {
      resolve(true)
      return
    }

    const validator = new Schema(rules)
    const data = {}
    Object.keys(rules).forEach((key) => {
      data[key] = formData[key]
    })

    validator.validate(data, (errors) => {
      if (errors && errors.length > 0) {
        reject(errors)
      } else {
        resolve(true)
      }
    })
  })
}
