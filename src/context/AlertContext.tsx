
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert, AlertPriority, AlertStatus, AlertType, SAMPLE_ALERTS } from '@/utils/alertTypes';
import { toast } from 'sonner';

interface AlertContextType {
  alerts: Alert[];
  filteredAlerts: Alert[];
  activeFilters: {
    priority: AlertPriority[];
    status: AlertStatus[];
    type: AlertType[];
  };
  setFilter: (filterType: 'priority' | 'status' | 'type', values: string[]) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
  updateAlertStatus: (id: string, status: AlertStatus) => void;
  deleteAlert: (id: string) => void;
  processingInterval: number;
  setProcessingInterval: (interval: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [processingInterval, setProcessingInterval] = useState<number>(5); // Default 5 minutes
  const [activeFilters, setActiveFilters] = useState<AlertContextType['activeFilters']>({
    priority: [],
    status: [],
    type: [],
  });

  // Load sample alerts on mount
  useEffect(() => {
    setAlerts(SAMPLE_ALERTS);
  }, []);
  
  // Filtered alerts based on active filters
  const filteredAlerts = React.useMemo(() => {
    return alerts.filter(alert => {
      const priorityMatch = activeFilters.priority.length === 0 || 
        activeFilters.priority.includes(alert.priority);
      
      const statusMatch = activeFilters.status.length === 0 || 
        activeFilters.status.includes(alert.status);
      
      const typeMatch = activeFilters.type.length === 0 || 
        activeFilters.type.includes(alert.type);
      
      return priorityMatch && statusMatch && typeMatch;
    });
  }, [alerts, activeFilters]);

  // Set filters for alerts
  const setFilter = (filterType: 'priority' | 'status' | 'type', values: string[]) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: values as any, // Type casting as appropriate type
    }));
  };

  // Add a new alert
  const addAlert = (alertData: Omit<Alert, 'id' | 'timestamp'>) => {
    const newAlert: Alert = {
      ...alertData,
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };
    
    setAlerts(prev => [newAlert, ...prev]);
    
    // Show toast notification for new alert
    toast(`New Alert: ${newAlert.title}`, {
      description: newAlert.description,
      action: {
        label: "View",
        onClick: () => console.log("View alert", newAlert.id),
      },
    });
  };

  // Update the status of an alert
  const updateAlertStatus = (id: string, status: AlertStatus) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, status } : alert
      )
    );
  };

  // Delete an alert
  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <AlertContext.Provider
      value={{
        alerts,
        filteredAlerts,
        activeFilters,
        setFilter,
        addAlert,
        updateAlertStatus,
        deleteAlert,
        processingInterval,
        setProcessingInterval,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
}
