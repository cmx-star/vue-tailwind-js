/**
 * @desc 动态路由加载
 * @author maanpeng
 */
import { h } from "vue";
import { RouterView } from "vue-router";

export function loadRoutes(name, urlStr) {
  switch (name) {
    // 基础组件
    case "Layout":
      return () => import("@/layout/index.vue");

    // 业务组件 (对应 Mock 的 permissionValue)
    // Overview (概览)
    case "Dashboard":
    case "ViewDashboard":
      return () => import("@/views/overview/ViewDashboard.vue");

    // Network (网络)
    case "Network":
      return () => import("@/views/network/ViewNetwork.vue");
    case "NetworkManager":
      return () =>
        import("@/views/network/networkManager/ViewNetworkManager.vue");
    case "TupoManager":
      return () => import("@/views/network/tupoManager/ViewTupoManager.vue");

    // VPN
    case "VPN":
      return () => import("@/views/vpn/ViewVPN.vue");
    case "VPNConfig":
      return () => import("@/views/vpn/vpnConfig/ViewVPNConfig.vue");
    case "UserManager":
      return () => import("@/views/vpn/ViewVPN.vue"); // VPN下的用户管理，暂时使用ViewVPN
    case "UserList":
      return () => import("@/views/vpn/userManager/ViewUserList.vue");
    case "UserRoles":
      return () => import("@/views/vpn/userManager/ViewUserRoles.vue");

    // Edge Computing (边缘计算)
    case "EdgeComputing":
      return () => import("@/views/edge/ViewEdgeComputing.vue");
    case "AnalyticsManager":
      return () => import("@/views/edge/analyticsManager/ViewAnalytics.vue");
    case "NodeManager":
      return () => import("@/views/edge/nodeManager/ViewNodeManagement.vue");

    // System Management (系统管理)
    case "SystemManagement":
      return () => import("@/views/system/ViewSystemManagement.vue");
    case "SettingsManager":
      return () => import("@/views/system/settingsManager/ViewSettings.vue");
    case "LogManager":
      return () => import("@/views/system/logManager/ViewLogManagement.vue");

    // Setup Wizard (设置向导)
    case "SetupWizard":
      return () => import("@/views/wizard/examplesManager/ViewExamples.vue");
    case "ExamplesManager":
      return () => import("@/views/wizard/examplesManager/ViewExamples.vue");
    case "QuickManager":
      return () => import("@/views/wizard/quickManager/ViewQuickSetup.vue");

    // Common (公共页面)
    case "NotFound":
    case "404":
    case "disappear":
      return () => import("@/views/common/View404.vue");
    case "ViewLogin":
      return () => import("@/views/common/ViewLogin.vue");

    default:
      console.warn(
        `[asyncFile] Cannot find component for permissionValue: "${name}"`
      );
      // 如果没有匹配到，返回一个 RouterView 作为兜底
      return {
        name: "RouterViewFallback",
        render: () => h(RouterView),
      };
  }
}
