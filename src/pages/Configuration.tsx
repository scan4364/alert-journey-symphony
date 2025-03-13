
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConfigPanel } from '@/components/ui/ConfigPanel';
import { useLanguage } from '@/i18n/LanguageContext';
import { MobilePreview } from '@/components/ui/MobilePreview';
import { useIsMobile } from '@/hooks/use-mobile';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SmartphoneIcon } from 'lucide-react';

const Configuration = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ConfigPanel />
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="bg-accent/10 rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-2">{t('driver.preview.title')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('driver.preview.description')}
                </p>
                
                <Alert className="mb-4">
                  <SmartphoneIcon className="h-4 w-4" />
                  <AlertTitle>{t('driver.preview.alertTitle')}</AlertTitle>
                  <AlertDescription>
                    {t('driver.preview.alertDescription')}
                  </AlertDescription>
                </Alert>
                
                <MobilePreview />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Configuration;
