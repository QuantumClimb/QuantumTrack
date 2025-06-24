import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/ThemeProvider';
import AppLayout from '@/components/layout/AppLayout';
import LaunchPage from '@/pages/LaunchPage';
import Dashboard from '@/pages/Dashboard';
import Records from '@/pages/Records';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';
import PaymentInput from '@/pages/PaymentInput';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LaunchPage />} />
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/records" element={<Records />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/payments" element={<PaymentInput />} />
              </Route>
            </Routes>
            <Toaster />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
