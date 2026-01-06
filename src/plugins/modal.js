import { createVNode, render } from 'vue'
import CompModal from '@/components/Feedback/CompModal.vue'

export const ModalPlugin = {
  install(_app) {
    // 也可以挂载到全局属性
    // app.config.globalProperties.$modal = ...
  },
}

/**
 * 动态创建 Modal
 * @param {Object} options - Modal 配置项 (title, content, confirmText, etc.)
 * @returns {Promise} - 点击确认 resolve(true), 点击取消/关闭 resolve(false)
 */
export function createModal(options = {}) {
  return new Promise((resolve) => {
    // 1. 创建挂载容器
    const container = document.createElement('div')
    document.body.appendChild(container)

    // 2. 定义销毁函数
    const destroy = () => {
      render(null, container) // 销毁组件
      document.body.removeChild(container) // 移除容器
      // 恢复 body 滚动 (如果 Modal 锁定了滚动)
      document.body.style.overflow = ''
    }

    // 3. 构建 Props
    const props = {
      ...options,
      modelValue: true, // 默认显示
      showFooter: true, // 编程式调用默认显示底部
      'onUpdate:modelValue': (val) => {
        if (!val) {
          destroy()
          resolve(false)
        }
      },
      onClose: () => {
        destroy()
        resolve(false)
      },
      onConfirm: () => {
        if (options.onConfirm) {
          options.onConfirm()
        }
        destroy()
        resolve(true)
      },
      onCancel: () => {
        if (options.onCancel) {
          options.onCancel()
        }
        destroy()
        resolve(false)
      },
    }

    // 4. 创建 VNode
    const vnode = createVNode(CompModal, props)

    // 5. 渲染
    render(vnode, container)
  })
}
