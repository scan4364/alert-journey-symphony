import React from 'react';
import { useAlerts } from '@/context/AlertContext';
import { AlertTriangle, Bell, CheckCircle2 } from 'lucide-react';

const DriverView = () => {
  const { filteredAlerts } = useAlerts();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center p-4">
        <h1 className="text-4xl font-bold mb-4">Alertas Atuais</h1>
        {filteredAlerts.length > 0 ? (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className="p-4 rounded-lg text-lg font-semibold"
                style={{ 
                  backgroundColor: alert.priority === 'high' ? 'red' : 
                                   alert.priority === 'medium' ? 'orange' : 'green'
                }}
              >
                {alert.priority === 'high' && <AlertTriangle className="inline-block mr-2" />}
                {alert.priority === 'medium' && <Bell className="inline-block mr-2" />}
                {alert.priority === 'low' && <CheckCircle2 className="inline-block mr-2" />}
                {alert.title}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-400">Sem alertas no momento</p>
        )}
      </div>
    </div>
  );
};

export default DriverView;
