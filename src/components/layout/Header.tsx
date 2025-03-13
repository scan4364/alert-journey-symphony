
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  BarChart2,
  Settings,
  Clock,
  Menu,
  X
} from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    // Prevent scrolling when menu is open
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [location]);

  // Nav links
  const navLinks = [
    {
      path: '/dashboard',
      label: t('header.dashboard'),
      icon: <BarChart2 className="h-4 w-4 mr-2" />
    },
    {
      path: '/configuration',
      label: t('header.configuration'),
      icon: <Settings className="h-4 w-4 mr-2" />
    },
    {
      path: '/history',
      label: t('header.history'),
      icon: <Clock className="h-4 w-4 mr-2" />
    }
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled || location.pathname !== '/' ? 
        'bg-background/70 backdrop-blur-lg border-b' : 
        'bg-transparent'
    )}>
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link 
          to="/" 
          className="font-display text-xl md:text-2xl font-bold tracking-tight flex items-center"
        >
          Alert<span className="text-primary">Sync</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => (
            <Button
              key={link.path}
              variant={isActive(link.path) ? "default" : "ghost"}
              size="sm"
              asChild
              className={cn(
                'text-sm font-medium transition-colors',
                isActive(link.path) ? 'bg-primary/90 text-primary-foreground' : ''
              )}
            >
              <Link to={link.path}>
                {link.icon}
                {link.label}
              </Link>
            </Button>
          ))}
          
          {/* Language Selector */}
          <div className="ml-2">
            <LanguageSelector />
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <LanguageSelector className="mr-2" />
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? 
              <X className="h-5 w-5" /> : 
              <Menu className="h-5 w-5" />
            }
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        'fixed inset-0 bg-background/95 backdrop-blur-sm z-40 md:hidden transition-transform duration-300 ease-in-out',
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <div className="container pt-20 pb-6">
          <nav className="flex flex-col space-y-4">
            {navLinks.map(link => (
              <Button
                key={link.path}
                variant={isActive(link.path) ? "default" : "ghost"}
                size="lg"
                asChild
                className={cn(
                  'w-full justify-start text-base',
                  isActive(link.path) ? 'bg-primary/90 text-primary-foreground' : ''
                )}
              >
                <Link to={link.path}>
                  {link.icon}
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
