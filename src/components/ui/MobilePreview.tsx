
import React from 'react';
import { AlertCard } from './AlertCard';
import { useAlerts } from '@/context/AlertContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { Alert } from '@/utils/alertTypes';
import { BatteryMedium, Signal, Wifi } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export function MobilePreview() {
  const { t } = useLanguage();
  const { alerts } = useAlerts();
  const isMobile = useIsMobile();
  
  // Filtrar apenas alertas relevantes para o motorista (high e medium priority)
  const driverAlerts = alerts
    .filter(alert => ['high', 'medium'].includes(alert.priority) && alert.status === 'active')
    .slice(0, 3);

  // Exemplo de alerta específico para motorista se não houver nenhum
  const exampleAlert: Alert = {
    id: 'driver-example',
    title: t('driver.alertExample.title'),
    description: t('driver.alertExample.description'),
    type: 'route-deviation',
    priority: 'high',
    status: 'active',
    timestamp: new Date(),
    actionRequired: true,
    actions: [
      {
        id: 'view-map',
        label: t('driver.actions.viewMap'),
        type: 'primary',
        handler: () => console.log('View map action')
      },
      {
        id: 'acknowledge',
        label: t('driver.actions.acknowledge'),
        type: 'secondary',
        handler: () => console.log('Acknowledge action')
      }
    ]
  };

  const displayAlerts = driverAlerts.length > 0 ? driverAlerts : [exampleAlert];
  
  return (
    <div className={`flex flex-col ${isMobile ? 'w-full' : 'w-[360px]'} mx-auto`}>
      <div className="rounded-t-3xl overflow-hidden bg-black shadow-lg border border-gray-800">
        {/* Barra de status */}
        <div className="bg-black text-white p-2 flex justify-between items-center text-xs">
          <div>9:41</div>
          <div className="flex items-center space-x-1">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <BatteryMedium className="h-3 w-3" />
          </div>
        </div>
        
        {/* Cabeçalho do app */}
        <div className="bg-primary p-4 text-white">
          <h2 className="text-lg font-bold">{t('driver.mobileApp.title')}</h2>
          <p className="text-xs opacity-80">{t('driver.mobileApp.subtitle')}</p>
        </div>
        
        {/* Conteúdo principal */}
        <div className="bg-gray-100 p-3 space-y-3" style={{ minHeight: '400px' }}>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <h3 className="text-sm font-medium mb-1">{t('driver.mobileApp.alertsHeading')}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t('driver.mobileApp.alertsDescription')}</p>
            
            <div className="space-y-3">
              {displayAlerts.map(alert => (
                <AlertCard 
                  key={alert.id} 
                  alert={alert} 
                  className="text-sm" 
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Barra de navegação */}
        <div className="bg-gray-800 flex justify-around items-center p-2 text-white text-xs">
          <div className="flex flex-col items-center">
            <div className="h-1.5 w-1.5 bg-primary rounded-full mb-1"></div>
            <span>{t('driver.nav.alerts')}</span>
          </div>
          <div className="flex flex-col items-center text-gray-400">
            <div className="h-1.5 w-1.5 bg-transparent rounded-full mb-1"></div>
            <span>{t('driver.nav.routes')}</span>
          </div>
          <div className="flex flex-col items-center text-gray-400">
            <div className="h-1.5 w-1.5 bg-transparent rounded-full mb-1"></div>
            <span>{t('driver.nav.profile')}</span>
          </div>
        </div>
      </div>
      <div className="h-4 w-32 bg-black mx-auto rounded-b-xl"></div>
    </div>
  );
}
