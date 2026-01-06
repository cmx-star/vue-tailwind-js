import { createModal } from '@/plugins/modal'

export function useModal() {
  /**
   * 确认框
   * @param {Object} options
   * @returns {Promise<boolean>}
   */
  const confirm = (options) => {
    return createModal({
      title: '确认',
      showCancel: true,
      confirmText: '确定',
      cancelText: '取消',
      ...options,
    })
  }

  /**
   * 提示框 (无取消按钮)
   * @param {Object} options
   * @returns {Promise<void>}
   */
  const alert = (options) => {
    return createModal({
      title: '提示',
      showCancel: false,
      confirmText: '我知道了',
      ...options,
    })
  }

  return {
    confirm,
    alert,
  }
}
