
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
