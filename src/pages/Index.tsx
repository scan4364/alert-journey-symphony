import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PersonaSelector } from '@/components/ui/PersonaSelector';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  BarChart2, 
  Bell, 
  Settings, 
  Clock, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const features = [
  {
    title: 'Real-time Alerts',
    description: 'Receive critical alerts in real-time with customizable priorities and notifications.',
    icon: Bell,
  },
  {
    title: 'Intelligent Processing',
    description: 'Our system intelligently processes and filters alerts to prevent information overload.',
    icon: Settings,
  },
  {
    title: 'Comprehensive Dashboard',
    description: 'View all your alerts in one place with our intuitive and customizable dashboard.',
    icon: BarChart2,
  },
  {
    title: 'Historical Data',
    description: 'Access historical alert data to identify patterns and optimize operations.',
    icon: Clock,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

const Index = () => {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const { t } = useLanguage();
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full -z-10 opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
        </motion.div>
        
        <div className="container relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="flex items-center justify-center space-x-2 mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <StatusBadge type="priority" value="high" size="md" />
              <StatusBadge type="priority" value="medium" size="md" />
              <StatusBadge type="priority" value="low" size="md" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="text-primary">{t('pages.home.title')}</span> {t('pages.home.subtitle')}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {t('pages.home.description')}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Button size="lg" asChild className="px-6 py-6 text-base">
                <Link to="/dashboard">
                  {t('pages.home.getStarted')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild className="px-6 py-6 text-base">
                <Link to="/configuration">
                  {t('pages.home.configureAlerts')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <motion.div 
            className="text-center max-w-xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('pages.home.featuresTitle')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('pages.home.featuresDescription')}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="glass-card p-6 rounded-lg transition-all"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-medium mb-2">{t('pages.home.features.realTimeAlerts.title')}</h3>
              <p className="text-muted-foreground">{t('pages.home.features.realTimeAlerts.description')}</p>
            </motion.div>
            
            <motion.div 
              className="glass-card p-6 rounded-lg transition-all"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-medium mb-2">{t('pages.home.features.intelligentProcessing.title')}</h3>
              <p className="text-muted-foreground">{t('pages.home.features.intelligentProcessing.description')}</p>
            </motion.div>
            
            <motion.div 
              className="glass-card p-6 rounded-lg transition-all"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-medium mb-2">{t('pages.home.features.dashboard.title')}</h3>
              <p className="text-muted-foreground">{t('pages.home.features.dashboard.description')}</p>
            </motion.div>
            
            <motion.div 
              className="glass-card p-6 rounded-lg transition-all"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-medium mb-2">{t('pages.home.features.historicalData.title')}</h3>
              <p className="text-muted-foreground">{t('pages.home.features.historicalData.description')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('pages.home.chooseRole')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('pages.home.roleDescription')}
            </p>
          </div>
          
          <PersonaSelector 
            selectedPersona={selectedPersona}
            onSelectPersona={setSelectedPersona}
          />
          
          <div className="flex justify-center mt-8">
            <Button 
              size="lg" 
              disabled={!selectedPersona}
              asChild
              className="px-6 py-6 text-base transition-all"
            >
              <Link to="/dashboard">
                {selectedPersona ? t('pages.home.continueAs') : t('pages.home.selectRole')}
                {selectedPersona && <CheckCircle2 className="ml-2 h-5 w-5" />}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('pages.home.ready')}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t('pages.home.readyDescription')}
            </p>
            
            <Button 
              variant="secondary" 
              size="lg" 
              asChild
              className="px-6 py-6 text-base"
            >
              <Link to="/dashboard">
                {t('pages.home.getStarted')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

