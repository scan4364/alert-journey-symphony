
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AlertCard } from '@/components/ui/AlertCard';
import { useAlerts } from '@/context/AlertContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { 
  AlertType, 
  AlertPriority, 
  AlertStatus 
} from '@/utils/alertTypes';
import { 
  Bell, 
  Filter, 
  RefreshCw, 
  AlertTriangle,
  Clock,
  CheckCircle2,
  X,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Dashboard = () => {
  const { 
    filteredAlerts, 
    alerts, 
    activeFilters, 
    setFilter,
    processingInterval 
  } = useAlerts();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter alerts by search query
  const searchedAlerts = searchQuery 
    ? filteredAlerts.filter(alert => 
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        alert.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredAlerts;
    
  // Alerts stats
  const alertStats = {
    total: alerts.length,
    active: alerts.filter(alert => alert.status === 'active').length,
    acknowledged: alerts.filter(alert => alert.status === 'acknowledged').length,
    resolved: alerts.filter(alert => alert.status === 'resolved').length,
  };
  
  // Priority counts
  const priorityCounts = {
    high: alerts.filter(alert => alert.priority === 'high' && alert.status === 'active').length,
    medium: alerts.filter(alert => alert.priority === 'medium' && alert.status === 'active').length,
    low: alerts.filter(alert => alert.priority === 'low' && alert.status === 'active').length,
  };
  
  // Refresh alerts
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call/refresh
    setTimeout(() => {
      setRefreshing(false);
      toast.success('Alerts refreshed', {
        description: `Last processed: ${new Date().toLocaleTimeString()}`,
      });
    }, 1000);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilter('priority', []);
    setFilter('status', []);
    setFilter('type', []);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Alert Dashboard</h1>
              <p className="text-muted-foreground">
                Processing alerts every {processingInterval} minutes
              </p>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
          
          {/* Alert Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-lg p-4 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Alerts</p>
                  <h3 className="text-2xl font-display font-bold">{alertStats.total}</h3>
                </div>
                <Bell className="h-8 w-8 text-muted-foreground/30" />
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active</p>
                  <h3 className="text-2xl font-display font-bold">{alertStats.active}</h3>
                </div>
                <AlertTriangle className="h-8 w-8 text-alert-high/30" />
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Acknowledged</p>
                  <h3 className="text-2xl font-display font-bold">{alertStats.acknowledged}</h3>
                </div>
                <Clock className="h-8 w-8 text-alert-medium/30" />
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Resolved</p>
                  <h3 className="text-2xl font-display font-bold">{alertStats.resolved}</h3>
                </div>
                <CheckCircle2 className="h-8 w-8 text-alert-low/30" />
              </div>
            </div>
          </div>
          
          {/* Priority Stats */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-alert-high/10 rounded-lg px-4 py-3 flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-alert-high" />
              <div>
                <p className="text-sm font-medium">High Priority</p>
                <p className="text-2xl font-display font-bold">{priorityCounts.high}</p>
              </div>
            </div>
            
            <div className="bg-alert-medium/10 rounded-lg px-4 py-3 flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-alert-medium" />
              <div>
                <p className="text-sm font-medium">Medium Priority</p>
                <p className="text-2xl font-display font-bold">{priorityCounts.medium}</p>
              </div>
            </div>
            
            <div className="bg-alert-low/10 rounded-lg px-4 py-3 flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-alert-low" />
              <div>
                <p className="text-sm font-medium">Low Priority</p>
                <p className="text-2xl font-display font-bold">{priorityCounts.low}</p>
              </div>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-7 w-7 p-0"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {(activeFilters.priority.length > 0 || 
                      activeFilters.status.length > 0 || 
                      activeFilters.type.length > 0) && (
                      <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {activeFilters.priority.length + 
                         activeFilters.status.length + 
                         activeFilters.type.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter Alerts</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuLabel>Priority</DropdownMenuLabel>
                  {(['high', 'medium', 'low', 'info'] as AlertPriority[]).map(priority => (
                    <DropdownMenuCheckboxItem
                      key={priority}
                      checked={activeFilters.priority.includes(priority)}
                      onCheckedChange={(checked) => {
                        setFilter(
                          'priority',
                          checked
                            ? [...activeFilters.priority, priority]
                            : activeFilters.priority.filter(p => p !== priority)
                        );
                      }}
                    >
                      <StatusBadge type="priority" value={priority} size="sm" />
                    </DropdownMenuCheckboxItem>
                  ))}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  {(['active', 'acknowledged', 'resolved'] as AlertStatus[]).map(status => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={activeFilters.status.includes(status)}
                      onCheckedChange={(checked) => {
                        setFilter(
                          'status',
                          checked
                            ? [...activeFilters.status, status]
                            : activeFilters.status.filter(s => s !== status)
                        );
                      }}
                    >
                      <StatusBadge type="status" value={status} size="sm" />
                    </DropdownMenuCheckboxItem>
                  ))}
                  
                  <DropdownMenuSeparator />
                  {(activeFilters.priority.length > 0 || 
                    activeFilters.status.length > 0 || 
                    activeFilters.type.length > 0) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-center mt-2"
                      onClick={clearFilters}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Alerts Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Alerts</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="acknowledged">Acknowledged</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {/* Alerts Grid */}
              {searchedAlerts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchedAlerts.map(alert => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-muted/30 rounded-lg border border-border">
                  <Bell className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="text-xl font-display font-medium mb-2">No alerts found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? 'No alerts match your search query.' : 'No alerts match your current filters.'}
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="active" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchedAlerts
                  .filter(alert => alert.status === 'active')
                  .map(alert => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))
                }
              </div>
              {searchedAlerts.filter(alert => alert.status === 'active').length === 0 && (
                <div className="text-center py-16 bg-muted/30 rounded-lg border border-border">
                  <CheckCircle2 className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="text-xl font-display font-medium">No active alerts</h3>
                  <p className="text-muted-foreground">All alerts have been acknowledged or resolved.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="acknowledged" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchedAlerts
                  .filter(alert => alert.status === 'acknowledged')
                  .map(alert => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))
                }
              </div>
              {searchedAlerts.filter(alert => alert.status === 'acknowledged').length === 0 && (
                <div className="text-center py-16 bg-muted/30 rounded-lg border border-border">
                  <Clock className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="text-xl font-display font-medium">No acknowledged alerts</h3>
                  <p className="text-muted-foreground">There are no alerts currently being handled.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="resolved" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchedAlerts
                  .filter(alert => alert.status === 'resolved')
                  .map(alert => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))
                }
              </div>
              {searchedAlerts.filter(alert => alert.status === 'resolved').length === 0 && (
                <div className="text-center py-16 bg-muted/30 rounded-lg border border-border">
                  <CheckCircle2 className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="text-xl font-display font-medium">No resolved alerts</h3>
                  <p className="text-muted-foreground">None of your alerts have been resolved yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
