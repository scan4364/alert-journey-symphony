import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert as AlertType } from '@/utils/alertTypes';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';
import { useAlerts } from '@/context/AlertContext';
import { 
  CheckCircle2, 
  Clock, 
  MoreHorizontal,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLanguage } from '@/i18n/LanguageContext';

interface AlertCardProps {
  alert: AlertType;
  expanded?: boolean;
  className?: string;
}

export function AlertCard({ alert, expanded = false, className }: AlertCardProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const { updateAlertStatus, deleteAlert } = useAlerts();
  const { t } = useLanguage();
  
  // Format date to readable format
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Get time elapsed since alert
  const getTimeElapsed = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 24 * 60) return `${Math.floor(diffMins / 60)}h ago`;
    
    return `${Math.floor(diffMins / (60 * 24))}d ago`;
  };
  
  // Handle status change
  const handleStatusChange = (status: 'acknowledged' | 'resolved') => {
    updateAlertStatus(alert.id, status);
  };
  
  // Handle delete
  const handleDelete = () => {
    deleteAlert(alert.id);
  };
  
  // Determine card style based on alert priority
  const priorityStyles = {
    high: 'border-l-4 border-l-alert-high',
    medium: 'border-l-4 border-l-alert-medium',
    low: 'border-l-4 border-l-alert-low',
    info: 'border-l-4 border-l-alert-info'
  };

  return (
    <Card className={cn(
      'transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden',
      priorityStyles[alert.priority],
      alert.status === 'resolved' && 'opacity-75',
      className
    )}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center space-x-2">
          <StatusBadge type="priority" value={alert.priority} size="sm" />
          <StatusBadge type="type" value={alert.type} size="sm" />
          {alert.status !== 'active' && (
            <StatusBadge type="status" value={alert.status} size="sm" />
          )}
        </div>
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm text-muted-foreground">
                  {getTimeElapsed(alert.timestamp)}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{formatDate(alert.timestamp)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {alert.status === 'active' && (
                <DropdownMenuItem onClick={() => handleStatusChange('acknowledged')}>
                  <Clock className="mr-2 h-4 w-4" /> {t('alerts.acknowledge')}
                </DropdownMenuItem>
              )}
              {(alert.status === 'active' || alert.status === 'acknowledged') && (
                <DropdownMenuItem onClick={() => handleStatusChange('resolved')}>
                  <CheckCircle2 className="mr-2 h-4 w-4" /> {t('alerts.markResolved')}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                <X className="mr-2 h-4 w-4" /> {t('alerts.deleteAlert')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2">
        <h3 className="font-display text-lg font-medium leading-tight mb-1">
          {alert.title}
        </h3>
        <p className={cn(
          "text-muted-foreground transition-all",
          isExpanded ? "h-auto" : "line-clamp-2"
        )}>
          {alert.description}
        </p>
        {!isExpanded && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-6 mt-1 text-muted-foreground hover:text-foreground"
            onClick={() => setIsExpanded(true)}
          >
            {t('common.readMore')}
          </Button>
        )}
      </CardContent>
      
      {(alert.actions && alert.actions.length > 0) && (
        <CardFooter className={cn(
          "pt-1 flex gap-2 flex-wrap",
          alert.status === 'resolved' && 'opacity-50',
        )}>
          {alert.actions.map(action => (
            <Button 
              key={action.id}
              variant={action.type === 'primary' ? 'default' : 
                      action.type === 'destructive' ? 'destructive' : 'outline'}
              size="sm"
              onClick={action.handler}
              disabled={alert.status === 'resolved'}
              className="transition-transform active:scale-95"
            >
              {action.label}
            </Button>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}
