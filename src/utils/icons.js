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
} from "@heroicons/vue/24/outline";

// 图标映射表
const iconMap = {
  HomeIcon,
  TableCellsIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ChartBarIcon,
  // 别名映射
  Dashboard: HomeIcon,
  TableExample: TableCellsIcon,
  FormExample: DocumentTextIcon,
  Settings: Cog6ToothIcon,
  UserList: UserGroupIcon,
  UserRoles: UserGroupIcon,
  Analytics: ChartBarIcon,
  System: Cog6ToothIcon,
  Examples: DocumentTextIcon,
};

/**
 * 根据图标名称获取图标组件
 * @param {string} iconName - 图标名称
 * @returns {Component|null} 图标组件
 */
export function getIcon(iconName) {
  if (!iconName) return null;
  return iconMap[iconName] || null;
}

