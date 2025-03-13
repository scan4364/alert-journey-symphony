
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConfigPanel } from '@/components/ui/ConfigPanel';
import { useLanguage } from '@/i18n/LanguageContext';

const Configuration = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">{t('pages.configuration.title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('pages.configuration.subtitle')}
            </p>
          </div>
          
          <ConfigPanel />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Configuration;
