
import React from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn(
      'py-6 border-t border-border bg-card/50', 
      className
    )}>
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AlertSync | Custom Alert System
          </p>
        </div>
        
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
