
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { LanguageProvider } from '@/i18n/LanguageContext';

// Pages
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import Configuration from '@/pages/Configuration';
import History from '@/pages/History';
import NotFound from '@/pages/NotFound';

// Context providers
import { AlertProvider } from '@/context/AlertContext';
import DriverView from './pages/Driver';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AlertProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/configuration" element={<Configuration />} />
              <Route path="/history" element={<History />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/driver" element = {<DriverView />} />
            </Routes>
          </Router>
          <Toaster />
        </AlertProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
