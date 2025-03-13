
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn(
      'py-6 border-t border-border bg-card/50', 
      className
    )}>
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright').replace('{year}', currentYear.toString())}
          </p>
        </div>
        
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('footer.privacyPolicy')}
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('footer.termsOfService')}
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('footer.contact')}
          </a>
        </div>
      </div>
    </footer>
  );
}
