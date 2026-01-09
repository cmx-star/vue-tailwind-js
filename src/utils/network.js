/**
 * 网络相关工具函数
 */

/**
 * 把秒转化为xx天xx时xx秒
 */
export function formatDtDHS(time) {
  if (time == undefined || time === null) return '00:00:00'
  // 转换为时分秒
  let h = parseInt(time / 60 / 60)
  h = h < 10 ? '0' + h : h
  let m = parseInt((time / 60) % 60)
  m = m < 10 ? '0' + m : m
  let s = parseInt(time % 60)
  s = s < 10 ? '0' + s : s
  return h + ':' + m + ':' + s
}

/**
 * 将数据与 KEY 值对应
 */
export const setData = (data1, data2) => {
  return data2.map((item) => {
    const newItem = { ...item }
    newItem.value = data1[item.name]
    if (item.special) {
      newItem['specialValue'] = data1[item.special]
    }
    return newItem
  })
}

/**
 * 获取 IP 的 8 位二进制字符串
 */
function _checkIput_fomartIP(ip) {
  return (Array(8).join(0) + parseInt(ip).toString(2)).slice(-8)
}

/**
 * 验证子网掩码
 */
export function netmaskCheck(MaskStr) {
  if (!MaskStr || MaskStr.length <= 0) {
    return false
  }
  var IPArray = MaskStr.split('.')
  if (IPArray.length !== 4) return false

  var ip_binary = ''
  for (var i = 0; i < 4; i++) {
    var ip = parseInt(IPArray[i])
    if (isNaN(ip) || IPArray[i].length > 3 || ip < 0 || ip > 255) {
      return false
    } else if (IPArray[i].match(/^(0|[1-9][0-9]*)$/) == null) {
      return false
    } else {
      ip_binary = ip_binary + _checkIput_fomartIP(ip)
    }
  }

  // 子网掩码逻辑：必须是连续的1后面跟着连续的0
  if (-1 != ip_binary.indexOf('01')) {
    return false
  }
  return true
}

/**
 * WAN 状态显示参数
 */
export const wanParams = [
  { key: 'type', name: 'proto', value: null },
  { key: 'ip', name: 'ip', value: null },
  { key: 'gw', name: 'gw', value: null },
  { key: 'mac', name: 'mac', value: null },
  { key: 'mask', name: 'netmask', value: null },
  { key: 'dns', name: 'dns', value: null },
  { key: 'rx', name: 'rx', value: null },
  { key: 'tx', name: 'tx', value: null },
  { key: 'uptime', name: 'uptime', value: null, isTime: true },
]
