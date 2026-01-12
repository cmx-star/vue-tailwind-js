/**
 * 图标工具函数
 * 用于动态获取图标组件
 */
import {
  HomeIcon,
  TableCellsIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ChartBarIcon,
  CpuChipIcon,
  SignalIcon,
  ShieldExclamationIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ServerIcon,
  InformationCircleIcon,
  UserPlusIcon,
  ChartPieIcon,
  ClockIcon,
  ServerStackIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  PowerIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/vue/24/outline'

// 图标映射表
const iconMap = {
  HomeIcon,
  TableCellsIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ChartBarIcon,
  CpuChipIcon,
  SignalIcon,
  ShieldExclamationIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ServerIcon,
  InformationCircleIcon,
  UserPlusIcon,
  ChartPieIcon,
  ClockIcon,
  ServerStackIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  PowerIcon,
  ClipboardDocumentListIcon,
  // 别名映射与 Mock 数据名对齐
  Dashboard: HomeIcon,
  house: HomeIcon,
  TableExample: TableCellsIcon,
  FormExample: DocumentTextIcon,
  Settings: Cog6ToothIcon,
  gears: Cog6ToothIcon,
  UserList: UserGroupIcon,
  UserRoles: UserGroupIcon,
  Analytics: ChartBarIcon,
  System: Cog6ToothIcon,
  Examples: DocumentTextIcon,
  microchip: CpuChipIcon,
  'network-wired': SignalIcon,
  'shield-virus': ShieldExclamationIcon,
  'shield-halved': ShieldCheckIcon,
  'wand-magic-sparkles': SparklesIcon,
  server: ServerIcon,
  'information-circle': InformationCircleIcon,
  'user-plus': UserPlusIcon,
  'chart-pie': ChartPieIcon,
  clock: ClockIcon,
  'server-stack': ServerStackIcon,
  'arrow-path': ArrowPathIcon,
  'calendar-days': CalendarDaysIcon,
  power: PowerIcon,
  'clipboard-document-list': ClipboardDocumentListIcon,
}

/**
 * 根据图标名称获取图标组件
 * @param {string} iconName - 图标名称
 * @returns {Component|null} 图标组件
 */
export function getIcon(iconName) {
  if (!iconName) return null
  return iconMap[iconName] || null
}
