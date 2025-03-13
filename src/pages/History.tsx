import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAlerts } from '@/context/AlertContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCard } from '@/components/ui/AlertCard';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/i18n/LanguageContext';

const History = () => {
  const { alerts } = useAlerts();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const { t } = useLanguage();
  
  // Sort alerts by timestamp
  const sortedAlerts = [...alerts].sort((a, b) => {
    if (sortDirection === 'desc') {
      return b.timestamp.getTime() - a.timestamp.getTime();
    } else {
      return a.timestamp.getTime() - b.timestamp.getTime();
    }
  });
  
  // Filter alerts by date if selected
  const filteredAlerts = selectedDate 
    ? sortedAlerts.filter(alert => {
        const alertDate = new Date(alert.timestamp);
        return (
          alertDate.getDate() === selectedDate.getDate() &&
          alertDate.getMonth() === selectedDate.getMonth() &&
          alertDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : sortedAlerts;
  
  // Group alerts by date
  const groupedAlerts = filteredAlerts.reduce((groups, alert) => {
    const date = new Date(alert.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(alert);
    return groups;
  }, {} as Record<string, typeof alerts>);
  
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">{t('pages.history.title')}</h1>
              <p className="text-muted-foreground">
                {t('pages.history.subtitle')}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>{t('pages.history.pickDate')}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                  {selectedDate && (
                    <div className="p-3 border-t border-border">
                      <Button 
                        variant="ghost" 
                        className="w-full"
                        onClick={() => setSelectedDate(undefined)}
                      >
                        {t('pages.history.clear')}
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleSortDirection}
                className="flex items-center"
              >
                {sortDirection === 'desc' ? (
                  <>{t('pages.history.newestFirst')} <ChevronDown className="ml-1 h-4 w-4" /></>
                ) : (
                  <>{t('pages.history.oldestFirst')} <ChevronUp className="ml-1 h-4 w-4" /></>
                )}
              </Button>
            </div>
          </div>
          
          {/* Alerts History */}
          {Object.keys(groupedAlerts).length > 0 ? (
            Object.entries(groupedAlerts).map(([date, dateAlerts]) => (
              <div key={date} className="mb-8">
                <div className="sticky top-20 z-10 bg-background/95 backdrop-blur-sm py-2 border-b border-border mb-4">
                  <h3 className="text-lg font-medium">
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dateAlerts.map(alert => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-lg border border-border">
              <CalendarIcon className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-xl font-display font-medium mb-2">{t('pages.history.noAlertsFound')}</h3>
              <p className="text-muted-foreground mb-4">
                {selectedDate 
                  ? `${t('pages.history.noAlertsRecorded')} ${format(selectedDate, "PPP")}.` 
                  : t('pages.history.noHistoricalAlerts')}
              </p>
              {selectedDate && (
                <Button variant="outline" onClick={() => setSelectedDate(undefined)}>
                  {t('pages.history.clearDateFilter')}
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
