import { AlertType, AlertPriority, AlertStatus } from '@/utils/alertTypes';

export const en = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    readMore: 'Read More',
  },
  components: {
    sidebar: {
      dashboard: 'Dashboard',
      alerts: 'Alerts',
      configuration: 'Configuration',
      userManagement: 'User Management',
      logout: 'Logout',
    },
    filters: {
      priority: 'Priority',
      status: 'Status',
      type: 'Type',
      applyFilters: 'Apply Filters',
      resetFilters: 'Reset Filters',
      search: 'Search',
    },
  },
  pages: {
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Overview of your fleet',
      totalAlerts: 'Total Alerts',
      activeAlerts: 'Active Alerts',
      acknowledgedAlerts: 'Acknowledged Alerts',
    },
    alerts: {
      title: 'Alerts',
      subtitle: 'Manage and monitor your fleet alerts',
      priority: {
        high: 'High',
        medium: 'Medium',
        low: 'Low',
        info: 'Info',
      },
      status: {
        active: 'Active',
        acknowledged: 'Acknowledged',
        resolved: 'Resolved',
        expired: 'Expired',
      },
      type: {
        'route-deviation': 'Route Deviation',
        'weather-condition': 'Weather Condition',
        'mechanical-issue': 'Mechanical Issue',
        'traffic-congestion': 'Traffic Congestion',
        'security-breach': 'Security Breach',
        'schedule-change': 'Schedule Change',
        'fuel-status': 'Fuel Status',
        'system-notification': 'System Notification',
      },
    },
    configuration: {
      title: 'Configuration',
      subtitle: 'Manage your application settings',
    },
    userManagement: {
      title: 'User Management',
      subtitle: 'Manage users and roles',
    },
    notFound: {
      title: 'Page Not Found',
      subtitle: 'The page you are looking for does not exist.',
      returnHome: 'Return to Home',
    },
  },
  alerts: {
    acknowledge: 'Acknowledge',
    markResolved: 'Mark as Resolved',
    deleteAlert: 'Delete Alert',
  },
  driver: {
    preview: {
      title: "Driver Preview",
      description: "This is an example of how alerts will appear in the driver's app.",
      alertTitle: "Smartphone View",
      alertDescription: "This preview simulates how alerts are displayed in the driver's mobile app."
    },
    mobileApp: {
      title: "FleetAlert Driver",
      subtitle: "Priority alerts",
      alertsHeading: "Active Alerts",
      alertsDescription: "Alerts that require your attention"
    },
    alertExample: {
      title: "Route Deviation Detected",
      description: "You are 2.5km off the planned route. Estimated delay: 15 minutes."
    },
    actions: {
      viewMap: "View Map",
      acknowledge: "Acknowledge"
    },
    nav: {
      alerts: "Alerts",
      routes: "Routes",
      profile: "Profile"
    }
  },
};
