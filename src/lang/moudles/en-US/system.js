export default {
  system: {
    settings: {
      title: 'System Settings Module',
      description:
        "This is a Vue3-based demo page showcasing the project's auto-import capabilities.",
    },
    users: {
      title: 'User Management',
      description: 'Manage system login users and their basic information.',
    },
    roles: {
      title: 'Role Management',
      description: 'Manage system permission roles and menu assignments.',
    },
    personalSettings: {
      title: 'Profile Settings',
      description: 'Manage your personal information, password, and preferences.',
    },
    info: {
      title: 'System Information',
      description:
        'View device hardware information, software version, and system operation status.',
    },
    logs: {
      title: 'Operation Log',
      description: 'System internal operation records and security audit logs.',
      table: {
        time: 'Time',
        user: 'User',
        action: 'Action',
        ip: 'IP Address',
      },
      mock: {
        loginSuccess: 'Login Success',
      },
    },
    manager: {
      title: 'System Manager',
      description: 'Configure basic system operation parameters.',
    },
    timeSetting: {
      title: 'Time Settings',
      description: 'Configure system time zone, NTP synchronization, and manual time setting.',
    },
    httpPort: {
      title: 'HTTP Port',
      description: 'Configure Web management interface access port and protocol.',
    },
    backUpdate: {
      title: 'Backup & Update',
      description: 'System configuration backup, restore, and firmware online/local upgrade.',
    },
    timeReboot: {
      title: 'Scheduled Reboot',
      description: 'Configure system to automatically reboot at specific times.',
    },
    reboot: {
      title: 'System Reboot',
      description: 'Execute immediate system reboot.',
    },
    log: {
      title: 'System Log',
      description: 'View low-level system operation logs and diagnostic information.',
    },
    firewall: {
      port: {
        title: 'Port Mapping',
        description: 'Redirect external access to specific services in the internal LAN.',
      },
      rule: {
        title: 'Traffic Rules',
        description: 'Manage access control policies for traffic entering or leaving the system.',
      },
      limit: {
        title: 'Traffic Limit',
        description: 'Apply upload/download speed limits to specific IPs or ports.',
      },
      diy: {
        title: 'Custom Rules',
        description: 'Implement complex firewall functions by writing iptables scripts directly.',
      },
      setting: {
        title: 'General Settings',
        description: 'Configure firewall global default policies and attack defense options.',
      },
    },
    service: {
      usr: {
        title: 'USR Service',
        description: 'Configure enhanced network services related to USR protocol.',
      },
      ddns: {
        title: 'Dynamic DNS',
        description: 'Map dynamic IP addresses to fixed domain names.',
      },
      snmpd: {
        title: 'SNMP Service',
        description: 'Configure Simple Network Management Protocol to support remote monitoring.',
      },
    },
    statistics: {
      title: 'Data Statistics',
      description: 'View current system network statistics and connection lists.',
      arpTable: 'ARP Table',
      arpTableDesc: 'List of Address Resolution Protocol (ARP) cache.',
      activeConnections: 'Active Connections',
      activeConnectionsDesc: 'Active network connections currently passing through the system.',
      activeConnectionsLAN: 'LAN Layer Connections',
      activeConnectionsLANDesc: 'Connection information within the local domain.',
      ipv6List: 'IPv6 List',
      ipv6ListDesc: 'IPv6 client addresses detected by the system.',
      ipAddress: 'IP Address',
      macAddress: 'MAC Address',
      port: 'Interface',
      name: 'Name',
      intranet: 'LAN Address',
      remoteAddress: 'Remote Address',
      originalAddress: 'Original Address',
      remark: 'Remark',
      sourceAddress: 'Source Address',
      ipv6Address: 'IPv6 Address',
    },
  },
}
