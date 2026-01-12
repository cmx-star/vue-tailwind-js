export default {
  vpn: {
    status: {
      description: '查看 VPN 连接状态和客户端信息',
      openVpnClients: 'OpenVPN Clients',
      vpnConnections: 'VPN 连接',
      name: '名称',
      commonName: '通用名称',
      realAddress: '真实地址',
      bytesReceived: '接收字节',
      bytesSent: '发送字节',
      connectedSince: '连接时间',
      vpnType: 'VPN 类型',
      status: '状态',
      remoteAddress: '远程地址',
      localAddress: '本地地址',
    },
    l2tp: {
      description: '配置 L2TP VPN 参数',
    },
    ipsec: {
      description: '配置 IPsec VPN 参数',
    },
    gre: {
      description: '配置 GRE 隧道参数',
    },
    pptp: {
      title: 'PPTP 设置',
      description: '配置 PPTP 服务器参数',
      serverTitle: 'PPTP 服务器',
      serverName: 'PPTP 服务器',
      status: '状态',
      remarks: '备注',
      enabled: '启用',
      disabled: '禁用',
    },
  },
}
