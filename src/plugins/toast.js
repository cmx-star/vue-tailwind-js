import { createVNode, render } from 'vue'
import CompToast from '@/components/Feedback/CompToast.vue'

// 保持单例
let toastInstance = null

export const ToastPlugin = {
  install(app) {
    // 1. 创建挂载点
    const container = document.createElement('div')
    document.body.appendChild(container)

    // 2. 创建虚拟节点
    const vnode = createVNode(CompToast)

    // 3. 渲染组件到挂载点
    render(vnode, container)

    // 4. 获取组件实例 (Options API 使用 proxy)
    toastInstance = vnode.component.proxy

    // 5. 挂载到全局属性 (可选，适配 Options API)
    app.config.globalProperties.$toast = toastInstance
  },
}

// 导出实例供 Composable 使用
export function getToastInstance() {
  return toastInstance
}
