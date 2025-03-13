
export type AlertPriority = 'high' | 'medium' | 'low' | 'info';

export type AlertType = 
  | 'route-deviation'
  | 'weather-condition'
  | 'mechanical-issue'
  | 'traffic-congestion'
  | 'security-breach'
  | 'schedule-change'
  | 'fuel-status'
  | 'system-notification';

export type AlertStatus = 'active' | 'acknowledged' | 'resolved' | 'expired';

export interface Alert {
  id: string;
  title: string;
  description: string;
  type: AlertType;
  priority: AlertPriority;
  status: AlertStatus;
  timestamp: Date;
  expiresAt?: Date;
  actionRequired?: boolean;
  actions?: AlertAction[];
  relatedAssets?: string[]; // IDs of related vehicles, routes, etc.
  metadata?: Record<string, any>;
}

export interface AlertAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'destructive';
  handler: () => void;
}

export const SAMPLE_ALERTS: Alert[] = [
  {
    id: '1',
    title: 'Route Deviation Detected',
    description: 'Vehicle ABC-123 is 2.5km off the planned route. Estimated delay: 15 minutes.',
    type: 'route-deviation',
    priority: 'medium',
    status: 'active',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    actionRequired: true,
    actions: [
      {
        id: 'contact-driver',
        label: 'Contact Driver',
        type: 'primary',
        handler: () => console.log('Contact driver action')
      },
      {
        id: 'update-route',
        label: 'Update Route',
        type: 'secondary',
        handler: () => console.log('Update route action')
      }
    ],
    relatedAssets: ['vehicle-abc-123', 'route-45678'],
  },
  {
    id: '2',
    title: 'Severe Weather Alert',
    description: 'Heavy rainfall expected on Route 27. Recommend rerouting vehicles in the area.',
    type: 'weather-condition',
    priority: 'high',
    status: 'active',
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    actionRequired: true,
    actions: [
      {
        id: 'view-map',
        label: 'View Map',
        type: 'primary',
        handler: () => console.log('View map action')
      },
      {
        id: 'notify-drivers',
        label: 'Notify Drivers',
        type: 'secondary',
        handler: () => console.log('Notify drivers action')
      }
    ],
    relatedAssets: ['route-27', 'region-east'],
  },
  {
    id: '3',
    title: 'Engine Temperature Warning',
    description: 'Vehicle XYZ-789 reporting high engine temperature. Maintenance check recommended.',
    type: 'mechanical-issue',
    priority: 'high',
    status: 'acknowledged',
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    actionRequired: true,
    actions: [
      {
        id: 'schedule-maintenance',
        label: 'Schedule Maintenance',
        type: 'primary',
        handler: () => console.log('Schedule maintenance action')
      },
      {
        id: 'view-vehicle-details',
        label: 'Vehicle Details',
        type: 'secondary',
        handler: () => console.log('View vehicle details action')
      }
    ],
    relatedAssets: ['vehicle-xyz-789'],
  },
  {
    id: '4',
    title: 'System Update Complete',
    description: 'Fleet management system has been updated to version 3.5.2 with improved route optimization.',
    type: 'system-notification',
    priority: 'info',
    status: 'resolved',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    actionRequired: false,
  },
  {
    id: '5',
    title: 'Fuel Level Low',
    description: 'Vehicle DEF-456 fuel level below 15%. Nearest refueling station: 12km ahead.',
    type: 'fuel-status',
    priority: 'medium',
    status: 'active',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    actionRequired: true,
    actions: [
      {
        id: 'navigate-to-station',
        label: 'Navigate to Station',
        type: 'primary',
        handler: () => console.log('Navigate to station action')
      }
    ],
    relatedAssets: ['vehicle-def-456'],
  }
];

export interface PersonaType {
  id: string;
  name: string;
  description: string;
  icon: string;
  defaultAlertTypes: AlertType[];
}

export const PERSONAS: PersonaType[] = [
  {
    id: 'logistics-manager',
    name: 'Logistics Manager',
    description: 'Monitor fleet and make strategic decisions',
    icon: 'clipboard-list',
    defaultAlertTypes: ['route-deviation', 'weather-condition', 'security-breach', 'schedule-change'],
  },
  {
    id: 'driver',
    name: 'Driver/Field Operator',
    description: 'Receive actionable alerts during operations',
    icon: 'truck',
    defaultAlertTypes: ['route-deviation', 'weather-condition', 'mechanical-issue', 'fuel-status'],
  },
  {
    id: 'operations-analyst',
    name: 'Operations Analyst',
    description: 'Analyze data and optimize operations',
    icon: 'bar-chart-2',
    defaultAlertTypes: ['route-deviation', 'mechanical-issue', 'traffic-congestion', 'system-notification'],
  }
];
