export const componentMap = {
  Layout: () => import("@/layout/index.vue"),
  ParentView: () => import("@/layout/components/ParentView.vue"),
  // Common
  ViewLogin: () => import("@/views/common/ViewLogin/ViewLogin.vue"),
  View404: () => import("@/views/common/View404/View404.vue"),
  // Overview
  ViewDashboard: () =>
    import("@/views/overview/ViewDashboard/ViewDashboard.vue"),
  // Edge
  ViewAnalytics: () =>
    import("@/views/edge/border/ViewAnalytics/ViewAnalytics.vue"),
  ViewNodeManagement: () =>
    import("@/views/edge/border/ViewNodeManagement/ViewNodeManagement.vue"),
  // Network
  ViewNetworkManager: () =>
    import("@/views/network/ViewNetworkManager/ViewNetworkManager.vue"),
  ViewInterfaceConfig: () =>
    import(
      "@/views/network/interface/ViewInterfaceConfig/ViewInterfaceConfig.vue"
    ),
  ViewFirewallSettings: () =>
    import(
      "@/views/network/safe/firewall/ViewFirewallSettings/ViewFirewallSettings.vue"
    ),
  // System
  ViewLogManagement: () =>
    import("@/views/system/manager/ViewLogManagement/ViewLogManagement.vue"),
  ViewSettings: () =>
    import("@/views/system/manager/ViewSettings/ViewSettings.vue"),
  ViewSystemSettings: () =>
    import("@/views/system/ViewSystemSettings/ViewSystemSettings.vue"),
  // VPN
  ViewUserList: () =>
    import("@/views/vpn/service/ViewUserList/ViewUserList.vue"),
  // Wizard
  ViewQuickSetup: () =>
    import("@/views/wizard/guard/ViewQuickSetup/ViewQuickSetup.vue"),
};

export function loadRoutes(componentName) {
  const component = componentMap[componentName];

  if (!component) {
    console.error(`[Router Error]: 找不到组件映射 "${componentName}"`);
    return componentMap["View404"];
  }

  return component;
}
