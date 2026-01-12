export default {
  vpn: {
    status: {
      description: 'View VPN connection status and client information',
      openVpnClients: 'OpenVPN Clients',
      vpnConnections: 'VPN Connections',
      name: 'Name',
      commonName: 'Common Name',
      realAddress: 'Real Address',
      bytesReceived: 'Bytes Received',
      bytesSent: 'Bytes Sent',
      connectedSince: 'Connected Since',
      vpnType: 'VPN Type',
      status: 'Status',
      remoteAddress: 'Remote Address',
      localAddress: 'Local Address',
    },
    l2tp: {
      description: 'Configure L2TP VPN parameters',
    },
    ipsec: {
      description: 'Configure IPsec VPN parameters',
    },
    gre: {
      description: 'Configure GRE tunnel parameters',
    },
    pptp: {
      title: 'PPTP Settings',
      description: 'Configure PPTP server parameters',
      serverTitle: 'PPTP Server',
      serverName: 'PPTP Server',
      status: 'Status',
      remarks: 'Remarks',
      enabled: 'Enabled',
      disabled: 'Disabled',
    },
  },
}
