
import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeApp, getCurrentTenant, type Tenant } from '@/services/supabaseService';

import Index from "./pages/Index";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import PatientReports from "./pages/PatientReports";
import PatientReportUpload from "./pages/PatientReportUpload";
import PatientSettings from "./pages/PatientSettings";
import PatientMessages from "./pages/PatientMessages";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorReports from "./pages/DoctorReports";
import DoctorSettings from "./pages/DoctorSettings";
import DoctorMessages from "./pages/DoctorMessages";
import AppointmentBooking from "./pages/AppointmentBooking";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Extract tenant from URL or default to quantumhealth
        const urlParams = new URLSearchParams(window.location.search);
        const tenantSlug = urlParams.get('tenant') || 'quantumhealth';
        
        console.log('🚀 Initializing QuantumHealth with tenant:', tenantSlug);
        
        const tenant = await initializeApp(tenantSlug);
        setCurrentTenant(tenant);
        setIsInitialized(true);
        
        console.log('✅ QuantumHealth initialized successfully:', {
          name: tenant.name,
          plan: tenant.plan,
          features: tenant.settings.features
        });
      } catch (error) {
        console.error('❌ Failed to initialize QuantumHealth:', error);
        setInitError(error instanceof Error ? error.message : 'Unknown error');
        setIsInitialized(true); // Allow app to load even with errors
      }
    };

    initialize();
  }, []);

  // Show loading screen while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-healthy-50 to-nature-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-healthy-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-healthy-800">Initializing QuantumHealth</h2>
          <p className="text-healthy-600">Setting up your healthcare platform...</p>
        </div>
      </div>
    );
  }

  // Show error if initialization failed
  if (initError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-red-800 mb-2">Initialization Error</h2>
          <p className="text-red-600 mb-4">{initError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Tenant Context Provider */}
            <div data-tenant={currentTenant?.slug} data-tenant-plan={currentTenant?.plan}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                
                {/* Patient Routes */}
                <Route path="/patient/dashboard" element={<PatientDashboard />} />
                <Route path="/patient/reports" element={<PatientReports />} />
                <Route path="/patient/reports/upload" element={<PatientReportUpload />} />
                <Route path="/patient/settings" element={<PatientSettings />} />
                <Route path="/patient/messages" element={<PatientMessages />} />
                
                {/* Redirect /patient/appointments to the booking page for now */}
                <Route path="/patient/appointments" element={<Navigate to="/patient/appointments/book" replace />} />
                <Route path="/patient/appointments/book" element={<AppointmentBooking />} />
                
                {/* Doctor Routes */}
                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor/reports" element={<DoctorReports />} />
                <Route path="/doctor/reports/upload" element={<PatientReportUpload />} />
                <Route path="/doctor/settings" element={<DoctorSettings />} />
                <Route path="/doctor/messages" element={<DoctorMessages />} />
                
                {/* Temporarily redirect missing doctor routes to dashboard */}
                <Route path="/doctor/schedule" element={<Navigate to="/doctor/dashboard" replace />} />
                <Route path="/doctor/patients" element={<Navigate to="/doctor/dashboard" replace />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            
            {/* Tenant info in development */}
            {import.meta.env.DEV && currentTenant && (
              <div className="fixed bottom-4 right-4 bg-healthy-600 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
                🏥 {currentTenant.name} ({currentTenant.plan})
              </div>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
