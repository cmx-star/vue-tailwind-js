/**
 * @desc 统一导出通用模块 (Common/Auth)
 *
 * 业务模块建议直接按需引入，例如：
 * import { getUserList } from '@/api/system/user'
 * import { getOrderList } from '@/api/order/list'
 */

// 认证与基础接口
export * from './auth'

// 如果需要统一挂载，可以在这里导出，但建议按模块引入以利用 Tree-shaking
// export * as system from './system'
