/**
 * Dialog 栈管理工具
 * 用于管理多层嵌套 Dialog 的 z-index 层级
 */

// Dialog 栈数组,存储当前打开的所有 Dialog 实例
const dialogStack = []

// z-index 基础值配置
const Z_INDEX_BASE = {
  BACKDROP: 40, // 遮罩层基础值
  CONTENT: 50, // 内容层基础值
  INCREMENT: 20, // 每层递增值
}

/**
 * 将 Dialog 推入栈
 * @param {string} id - Dialog 唯一标识
 * @returns {Object} 包含遮罩层和内容层 z-index 的对象
 */
export function pushDialog(id) {
  const depth = dialogStack.length
  dialogStack.push(id)

  return {
    backdropZIndex: Z_INDEX_BASE.BACKDROP + depth * Z_INDEX_BASE.INCREMENT,
    contentZIndex: Z_INDEX_BASE.CONTENT + depth * Z_INDEX_BASE.INCREMENT,
    depth,
  }
}

/**
 * 将 Dialog 从栈中移除
 * @param {string} id - Dialog 唯一标识
 */
export function popDialog(id) {
  const index = dialogStack.indexOf(id)
  if (index > -1) {
    dialogStack.splice(index, 1)
  }
}

/**
 * 获取当前栈深度
 * @returns {number} 栈深度
 */
export function getDialogStackDepth() {
  return dialogStack.length
}

/**
 * 检查是否有打开的 Dialog
 * @returns {boolean}
 */
export function hasOpenDialogs() {
  return dialogStack.length > 0
}

/**
 * 清空 Dialog 栈 (用于紧急情况)
 */
export function clearDialogStack() {
  dialogStack.length = 0
}
