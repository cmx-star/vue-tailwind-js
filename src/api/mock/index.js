/**
 * @desc Mock API
 * @use 此文件只是在API接口未开发完成，前端调试使用
 * @warning 无用的case请及时注释掉
 * @author maanpeng
 */
export default function mockApi(url) {
  switch (url) {
    case "/api/auth/login":
    case "/api/user/login": {
      return {
        code: 200,
        data: {
          token: "mock_token_" + Date.now(),
          userInfo: {
            id: 1,
            username: "admin",
            email: "admin@example.com",
            avatar: "https://ui-avatars.com/api/?name=admin",
            role: "admin",
          },
        },
      };
    }
    case "/api/user/info": {
      return {
        code: 200,
        data: {
          userInfo: {
            id: 1,
            username: "admin",
            email: "admin@example.com",
            avatar: "https://ui-avatars.com/api/?name=admin",
            role: "admin",
          },
          roles: ["admin"],
          permissions: ["*"],
        },
      };
    }
    case "/api/menu/list": {
      return {
        code: 200,
        data: [
          // 概览 - 没有左侧导航，直接显示仪表盘
          {
            id: 1,
            name: "nav.overview",
            uri: "/dashboard",
            permissionValue: "Dashboard",
            icon: "HomeIcon",
            show: "1",
            type: "1",
            aside: "0", // 概览不显示左侧导航
            topNav: 0, // 顶部导航标识 0-5
            subMenu: [],
          },
          // 网络 - 有左侧导航
          {
            id: 2,
            name: "nav.network",
            uri: "/network",
            permissionValue: "Network",
            icon: "DocumentTextIcon",
            show: "1",
            type: "1",
            aside: "1",
            topNav: 1,
            subMenu: [
              {
                id: 21,
                name: "nav.network",
                uri: "networkManager",
                permissionValue: "NetworkManager",
                icon: "TableCellsIcon",
                show: "1",
                type: "1",
                aside: "1",
                subMenu: [],
              },
              {
                id: 22,
                name: "nav.tupoManager",
                uri: "tupoManager",
                permissionValue: "TupoManager",
                icon: "DocumentTextIcon",
                show: "1",
                type: "1",
                aside: "1",
                subMenu: [],
              },
            ],
          },
          // VPN - 有左侧导航
          {
            id: 3,
            name: "nav.vpn",
            uri: "/vpn",
            permissionValue: "VPN",
            icon: "Cog6ToothIcon",
            show: "1",
            type: "1",
            aside: "1",
            topNav: 2,
            subMenu: [
              {
                id: 31,
                name: "nav.vpnConfig",
                uri: "vpnConfig",
                permissionValue: "VPNConfig",
                icon: "Cog6ToothIcon",
                show: "1",
                type: "1",
                aside: "1",
                subMenu: [],
              },
              {
                id: 32,
                name: "nav.userManager",
                uri: "userManager",
                permissionValue: "UserManager",
                icon: "UserGroupIcon",
                show: "1",
                type: "1",
                aside: "1",
                subMenu: [
                  {
                    id: 321,
                    name: "nav.userList",
                    uri: "list",
                    permissionValue: "UserList",
                    icon: "",
                    show: "1",
                    type: "1",
                    aside: "1",
                    subMenu: [],
                  },
                  {
                    id: 322,
                    name: "nav.userRoles",
                    uri: "roles",
                    permissionValue: "UserRoles",
                    icon: "",
                    show: "1",
                    type: "1",
                    aside: "1",
                    subMenu: [],
                  },
                ],
              },
            ],
          },
          // 边缘计算 - 有左侧导航
          {
            id: 4,
            name: "nav.edgeComputing",
            uri: "/edge",
            permissionValue: "EdgeComputing",
            icon: "ChartBarIcon",
            show: "1",
            type: "1",
            aside: "1",
            topNav: 3,
            subMenu: [
              {
                id: 41,
                name: "nav.analyticsManager",
                uri: "analyticsManager",
                permissionValue: "AnalyticsManager",
                icon: "ChartBarIcon",
                show: "1",
                type: "1",
                aside: "1",
                subMenu: [],
              },
              {
                id: 42,
                name: "nav.nodeManager",
                uri: "nodeManager",
                permissionValue: "NodeManager",
                icon: "ServerIcon",
                show: "1",
                type: "1",
                aside: "1",
                subMenu: [],
              },
            ],
          },
          // 系统管理 - 有左侧导航
          {
            id: 5,
            name: "nav.systemManagement",
            uri: "/system",
            permissionValue: "SystemManagement",
            icon: "Cog6ToothIcon",
            show: "1",
            type: "1",
            aside: "1",
            topNav: 4,
            subMenu: [
              {
                id: 51,
                name: "nav.settingsManager",
                uri: "settingsManager",
                permissionValue: "SettingsManager",
                icon: "Cog6ToothIcon",
                show: "1",
                type: "1",
                aside: "1",
                subMenu: [],
              },
              {
                id: 52,
                name: "nav.logManager",
                uri: "logManager",
                permissionValue: "LogManager",
                icon: "DocumentTextIcon",
                show: "1",
                type: "1",
                aside: "1",
                subMenu: [],
              },
            ],
          },
          // 设置向导 - 有左侧导航
          {
            id: 6,
            name: "nav.setupWizard",
            uri: "/wizard",
            permissionValue: "SetupWizard",
            icon: "DocumentTextIcon",
            show: "1",
            type: "1",
            aside: "1",
            topNav: 5,
            subMenu: [
              {
                id: 61,
                name: "nav.examplesManager",
                uri: "examplesManager",
                permissionValue: "ExamplesManager",
                icon: "DocumentTextIcon",
                show: "1",
                type: "1",
                aside: "1",
                subMenu: [],
              },
              {
                id: 62,
                name: "nav.quickManager",
                uri: "quickManager",
                permissionValue: "QuickManager",
                icon: "BoltIcon",
                show: "1",
                type: "1",
                aside: "1",
                subMenu: [],
              },
            ],
          },
        ],
      };
    }
    case "/api/user/list": {
      return {
        code: 200,
        data: {
          list: [
            {
              id: 1,
              username: "admin",
              email: "admin@example.com",
              role: "admin",
              createTime: "2024-01-01 00:00:00",
            },
            {
              id: 2,
              username: "user",
              email: "user@example.com",
              role: "user",
              createTime: "2024-01-02 00:00:00",
            },
          ],
          total: 2,
        },
      };
    }
    case "/api/system/config": {
      return {
        code: 200,
        data: {
          siteName: "后台管理系统",
          logo: "",
          theme: "blue",
        },
      };
    }
    // 添加更多mock数据...
  }
  return false;
}
