export default {
  system: {
    settings: {
      title: '系统设置模块',
      description: '这是一个基于 Vue3 的演示页面,展示了项目的组件自动引入能力。',
    },
    users: {
      title: '用户管理',
      description: '管理系统登录用户及其基本信息。',
    },
    roles: {
      title: '角色管理',
      description: '管理系统权限角色及菜单分配。',
    },
    personalSettings: {
      title: '个人中心',
      description: '管理您的个人信息、密码及偏好设置。',
    },
    info: {
      title: '系统信息',
      description: '查看设备硬件信息、软件版本及系统运行状态。',
    },
    logs: {
      title: '操作日志',
      description: '系统内部操作记录与安全审计日志。',
      table: {
        time: '操作时间',
        user: '操作人',
        action: '操作行为',
        ip: 'IP 地址',
      },
      mock: {
        loginSuccess: '登录成功',
      },
    },
    manager: {
      title: '系统管理',
      description: '配置系统基础运行参数。',
    },
    timeSetting: {
      title: '时间设置',
      description: '配置系统时区、NTP 同步及手动对时。',
    },
    httpPort: {
      title: 'HTTP 端口',
      description: '配置 Web 管理界面的访问端口及协议。',
    },
    backUpdate: {
      title: '备份升级',
      description: '系统配置备份、还原及固件在线/本地升级。',
    },
    timeReboot: {
      title: '定时重启',
      description: '配置系统在指定时间自动执行重启任务。',
    },
    reboot: {
      title: '系统重启',
      description: '即时执行系统重启操作。',
    },
    log: {
      title: '系统日志',
      description: '查看系统底层运行日志及故障诊断信息。',
    },
    firewall: {
      port: {
        title: '端口转发',
        description: '配置外部访问重定向到内部局域网特定服务。',
      },
      rule: {
        title: '通信规则',
        description: '管理进出系统的流量访问控制策略。',
      },
      limit: {
        title: '流量控制',
        description: '对特定的 IP 或端口执行上下行限速。',
      },
      diy: {
        title: '自定义规则',
        description: '通过直接编写 iptables 脚本实现复杂防火墙功能。',
      },
      setting: {
        title: '基本设置',
        description: '配置防火墙全局缺省策略及攻击防御选项。',
      },
    },
    service: {
      usr: {
        title: 'USR 服务',
        description: '配置 USR 协议相关的增强型网络服务。',
      },
      ddns: {
        title: '动态域名',
        description: '将动态分配的 IP 地址映射到固定的域名。',
      },
      snmpd: {
        title: 'SNMP 服务',
        description: '配置简单网络管理协议以支持远程监控。',
      },
    },
    statistics: {
      title: '数据统计',
      description: '查看系统当前的网络统计数据及连接列表。',
      summary: '指标概览',
      arpCount: 'ARP 条目数',
      connCount: '当前连接',
      upFlow: '上行流量',
      downFlow: '下行流量',
      tabs: {
        table: '数据表格',
        form: '配置表单',
      },
      dialogTitle: '操作确认',
      dialogContent: '您可以通过此弹窗执行高级操作，输入内容将模拟写入系统日志。',
      placeholder: {
        input: '请输入一些内容...',
      },
      messages: {
        pageSwitched: '切换至第 {page} 页',
        applied: '配置已应用',
        validateSuccess: '表单校验通过，保存成功！',
        validateFailed: '表单校验失败，请检查输入',
        reset: '表单已重置',
        exporting: '正在导出配置数据...',
        addSuccess: '新增记录成功: {val}',
        noInput: '未输入任何内容',
      },
      arpTable: 'ARP 表',
      arpTableDesc: '地址解析协议 (ARP) 缓存列表。',
      activeConnections: '活动连接',
      activeConnectionsDesc: '当前经过系统的活跃网络连接。',
      activeConnectionsLAN: 'LAN 层连接',
      activeConnectionsLANDesc: '本地域名内的连接信息。',
      ipv6List: 'IPv6 列表',
      ipv6ListDesc: '系统检测到的 IPv6 客户端地址。',
      ipAddress: 'IP 地址',
      macAddress: 'MAC 地址',
      port: '接口',
      name: '名称',
      intranet: '内网地址',
      remoteAddress: '远程地址',
      originalAddress: '原始地址',
      remark: '备注',
      sourceAddress: '源地址',
      ipv6Address: 'IPv6 地址',
    },
  },
}
