
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertPriority, AlertStatus, AlertType } from '@/utils/alertTypes';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  CloudLightning,
  MapPin,
  AlertOctagon,
  Truck,
  Bell,
  Calendar,
  Fuel,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  type?: 'priority' | 'status' | 'type';
  value: AlertPriority | AlertStatus | AlertType;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusBadge({ 
  type = 'status', 
  value, 
  showIcon = true,
  size = 'md',
  className
}: StatusBadgeProps) {
  let icon = null;
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  let badgeText = value;
  
  // Size classes
  const sizeClasses = {
    sm: 'text-xs py-0 px-2 h-5',
    md: 'text-sm py-0.5 px-2.5',
    lg: 'text-base py-1 px-3'
  };
  
  // Handle priority badges
  if (type === 'priority') {
    switch (value) {
      case 'high':
        icon = <AlertTriangle className="mr-1" size={size === 'sm' ? 12 : 16} />;
        variant = 'destructive';
        badgeText = 'High';
        break;
      case 'medium':
        icon = <AlertCircle className="mr-1" size={size === 'sm' ? 12 : 16} />;
        variant = 'default';
        badgeText = 'Medium';
        break;
      case 'low':
        icon = <Info className="mr-1" size={size === 'sm' ? 12 : 16} />;
        variant = 'secondary';
        badgeText = 'Low';
        break;
      case 'info':
        icon = <Info className="mr-1" size={size === 'sm' ? 12 : 16} />;
        variant = 'outline';
        badgeText = 'Info';
        break;
    }
  }
  
  // Handle status badges
  if (type === 'status') {
    switch (value) {
      case 'active':
        icon = <AlertCircle className="mr-1" size={size === 'sm' ? 12 : 16} />;
        variant = 'destructive';
        badgeText = 'Active';
        break;
      case 'acknowledged':
        icon = <Clock className="mr-1" size={size === 'sm' ? 12 : 16} />;
        variant = 'default';
        badgeText = 'Acknowledged';
        break;
      case 'resolved':
        icon = <CheckCircle2 className="mr-1" size={size === 'sm' ? 12 : 16} />;
        variant = 'secondary';
        badgeText = 'Resolved';
        break;
      case 'expired':
        icon = <Clock className="mr-1" size={size === 'sm' ? 12 : 16} />;
        variant = 'outline';
        badgeText = 'Expired';
        break;
    }
  }
  
  // Handle alert type badges
  if (type === 'type') {
    variant = 'outline';
    
    switch (value) {
      case 'route-deviation':
        icon = <MapPin className="mr-1" size={size === 'sm' ? 12 : 16} />;
        badgeText = 'Route';
        break;
      case 'weather-condition':
        icon = <CloudLightning className="mr-1" size={size === 'sm' ? 12 : 16} />;
        badgeText = 'Weather';
        break;
      case 'mechanical-issue':
        icon = <AlertOctagon className="mr-1" size={size === 'sm' ? 12 : 16} />;
        badgeText = 'Mechanical';
        break;
      case 'traffic-congestion':
        icon = <Truck className="mr-1" size={size === 'sm' ? 12 : 16} />;
        badgeText = 'Traffic';
        break;
      case 'security-breach':
        icon = <AlertTriangle className="mr-1" size={size === 'sm' ? 12 : 16} />;
        badgeText = 'Security';
        break;
      case 'schedule-change':
        icon = <Calendar className="mr-1" size={size === 'sm' ? 12 : 16} />;
        badgeText = 'Schedule';
        break;
      case 'fuel-status':
        icon = <Fuel className="mr-1" size={size === 'sm' ? 12 : 16} />;
        badgeText = 'Fuel';
        break;
      case 'system-notification':
        icon = <Bell className="mr-1" size={size === 'sm' ? 12 : 16} />;
        badgeText = 'System';
        break;
    }
  }

  return (
    <Badge 
      variant={variant} 
      className={cn(
        'font-medium transition-all animate-fade-in flex items-center',
        sizeClasses[size],
        className
      )}
    >
      {showIcon && icon}
      <span>{badgeText}</span>
    </Badge>
  );
}
