
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, Settings, Clock, BarChart2, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAlerts } from '@/context/AlertContext';

export function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { alerts } = useAlerts();
  
  // Count active alerts
  const activeAlertCount = alerts.filter(alert => alert.status === 'active').length;
  
  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Navigation items
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart2 },
    { path: '/history', label: 'History', icon: Clock },
    { path: '/configuration', label: 'Configuration', icon: Settings }
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'glass shadow-sm py-3' : 'bg-transparent py-4'
    )}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 transition-all duration-300">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center animate-pulse-subtle">
            <Bell className="text-primary-foreground h-5 w-5" />
          </div>
          <span className={cn(
            "font-display font-bold text-xl transition-all",
            scrolled ? 'text-foreground' : 'text-foreground'
          )}>
            AlertSync
          </span>
        </Link>
        
        <nav className="hidden md:flex space-x-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                asChild
                className={cn(
                  'transition-all duration-300',
                  isActive ? '' : 'hover:bg-accent'
                )}
              >
                <Link to={item.path} className="flex items-center space-x-1">
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            )
          })}
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            {activeAlertCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {activeAlertCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
