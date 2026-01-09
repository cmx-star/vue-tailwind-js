/**
 * 验证工具函数
 */

// 验证整数，不包含小数
export function isInteger(str) {
  const regCn = /^[0-9]+$/
  return regCn.test(str)
}

// 验证数字（包含小数）
export function isNumber(str) {
  const regCn = /^[0-9]+(\.[0-9]+)?$/
  return regCn.test(str)
}

// 验证 IP 地址
export function isIP(str) {
  const regCn = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/
  return regCn.test(str)
}

// 验证子网掩码
export function netmaskCheck(str) {
  const regCn =
    /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/
  return regCn.test(str)
}

// 验证域名
export function isDomainName(str) {
  const regCn = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i
  return regCn.test(str)
}

// 验证特殊字符（用户名/密码）
export function isSpecialCharacterUP(str) {
  const regCn = /^[a-zA-Z0-9_@.-]+$/
  return regCn.test(str)
}
