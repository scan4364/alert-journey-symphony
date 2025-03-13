
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ConfigPanel } from '@/components/ui/ConfigPanel';

const Configuration = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Alert Configuration</h1>
            <p className="text-xl text-muted-foreground">
              Customize how alerts are processed and delivered
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
