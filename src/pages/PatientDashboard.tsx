import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, MessageSquare, ChevronRight, Phone, MessageCircle, Clipboard } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { multiTenantService, type Appointment, type MedicalReport, type DoctorProfile, type PatientProfile } from '@/services/supabaseService';
import { toast } from 'sonner';

const createWhatsAppUrl = (phone: string, appointmentInfo: any) => {
  const message = encodeURIComponent(
    `Hello, this is regarding my appointment with ${appointmentInfo.doctor} on ${appointmentInfo.date} at ${appointmentInfo.time} for ${appointmentInfo.specialty}. I would like to confirm this appointment. Thank you!`
  );
  return `https://wa.me/${phone}?text=${message}`;
};

const PatientDashboard = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [recentReports, setRecentReports] = useState<MedicalReport[]>([]);
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [patients, setPatients] = useState<PatientProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load all data in parallel
      const [appointmentsData, reportsData, doctorsData, patientsData] = await Promise.all([
        multiTenantService.getAppointments(),
        multiTenantService.getMedicalReports(),
        multiTenantService.getDoctors(),
        multiTenantService.getPatients()
      ]);

      // Filter upcoming appointments (scheduled status and future dates)
      const upcoming = appointmentsData.filter(apt => {
        const appointmentDate = new Date(apt.appointment_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return apt.status === 'scheduled' && appointmentDate >= today;
      }).sort((a, b) => new Date(a.appointment_date).getTime() - new Date(b.appointment_date).getTime());

      // Get recent reports (last 5)
      const recent = reportsData
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      setUpcomingAppointments(upcoming);
      setRecentReports(recent);
      setDoctors(doctorsData);
      setPatients(patientsData);

      console.log('📊 Dashboard data loaded:', {
        appointments: upcoming.length,
        reports: recent.length,
        doctors: doctorsData.length,
        patients: patientsData.length
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? `Dr. ${doctor.first_name} ${doctor.last_name}` : 'Unknown Doctor';
  };

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown Patient';
  };

  const formatAppointmentDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatReportDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get the next upcoming appointment
  const nextAppointment = upcomingAppointments[0];

  // Fallback WhatsApp number (in production, this would come from clinic settings)
  const clinicWhatsApp = '+14155552671';

  if (loading) {
    return (
      <Layout userRole="patient">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-healthy-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-healthy-800">Loading Dashboard</h2>
              <p className="text-healthy-600">Getting your latest information...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Get current patient name (first patient for now)
  const currentPatient = patients[0];
  const patientName = currentPatient ? currentPatient.first_name : 'Patient';

  return (
    <Layout userRole="patient">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {patientName}</h1>
          <p className="text-gray-500">Here's what you need to know today</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glass-card overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-healthy-400 to-nature-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-healthy-500" />
                Upcoming Appointment
              </CardTitle>
            </CardHeader>
            {nextAppointment ? (
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{getDoctorName(nextAppointment.doctor_id)}</h3>
                      <p className="text-sm text-gray-500">{nextAppointment.appointment_type || 'Consultation'}</p>
                    </div>
                    <Badge variant="outline" className="border-healthy-200 text-healthy-700 bg-healthy-50">
                      {nextAppointment.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-500">Date</span>
                      <span className="font-medium">{formatAppointmentDate(nextAppointment.appointment_date)}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-gray-500">Time</span>
                      <span className="font-medium">{nextAppointment.appointment_time}</span>
                    </div>
                  </div>
                  
                  {nextAppointment.notes && (
                    <div className="text-sm">
                      <span className="text-gray-500">Notes: </span>
                      <span className="text-gray-700">{nextAppointment.notes}</span>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <a 
                      href={createWhatsAppUrl(clinicWhatsApp, {
                        doctor: getDoctorName(nextAppointment.doctor_id),
                        date: formatAppointmentDate(nextAppointment.appointment_date),
                        time: nextAppointment.appointment_time,
                        specialty: nextAppointment.appointment_type
                      })}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Follow up via WhatsApp
                    </a>
                  </div>
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">No upcoming appointments</p>
                  <Button asChild size="sm">
                    <Link to="/patient/appointments/book">
                      Schedule your first appointment
                    </Link>
                  </Button>
                </div>
              </CardContent>
            )}
            <CardFooter className="border-t border-gray-100 bg-gray-50/50">
              <Link to="/patient/appointments" className="text-sm text-healthy-600 hover:text-healthy-700 font-medium flex items-center w-full justify-between">
                Manage appointments
                <ChevronRight className="h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="glass-card overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-amber-400 to-purple-400" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-500" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentReports.length > 0 ? (
                <div className="space-y-3">
                  {recentReports.map(report => (
                    <div key={report.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                      <div>
                        <h4 className="font-medium text-sm">{report.report_name}</h4>
                        <p className="text-xs text-gray-500">{formatReportDate(report.created_at)}</p>
                        {report.doctor_id && (
                          <p className="text-xs text-gray-400">{getDoctorName(report.doctor_id)}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs border-gray-200">
                          {report.report_type}
                        </Badge>
                        <p className="text-xs text-gray-400 mt-1">{report.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">No reports yet</p>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/patient/reports/upload">
                      Upload your first report
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t border-gray-100 bg-gray-50/50">
              <Link to="/patient/reports" className="text-sm text-healthy-600 hover:text-healthy-700 font-medium flex items-center w-full justify-between">
                View all reports
                <ChevronRight className="h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="glass-card overflow-hidden h-full">
            <div className="h-2 bg-gradient-to-r from-nature-400 to-healthy-400" />
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>What would you like to do today?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/patient/appointments/book">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book new appointment
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start">
                  <a href={`https://wa.me/${clinicWhatsApp}`} target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat with clinic
                  </a>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/patient/reports/upload">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload documents
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Specialties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="specialty-card specialty-card-dentistry">
              <div className="mb-4 h-12 w-12 rounded-xl bg-healthy-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-healthy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Dentistry</h3>
              <p className="text-gray-500 text-sm mb-3">Complete dental care for all ages</p>
              <Link to="/patient/appointments/book?specialty=dentistry" className="text-sm text-healthy-600 hover:text-healthy-700 font-medium">
                Book appointment →
              </Link>
            </div>
            
            <div className="specialty-card specialty-card-orthopaedics">
              <div className="mb-4 h-12 w-12 rounded-xl bg-nature-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nature-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Orthopaedics</h3>
              <p className="text-gray-500 text-sm mb-3">Specialized bone and joint care</p>
              <Link to="/patient/appointments/book?specialty=orthopaedics" className="text-sm text-healthy-600 hover:text-healthy-700 font-medium">
                Book appointment →
              </Link>
            </div>

            <div className="specialty-card specialty-card-cancer">
              <div className="mb-4 h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Cancer Screening</h3>
              <p className="text-gray-500 text-sm mb-3">Early detection and prevention</p>
              <Link to="/patient/appointments/book?specialty=cancer-screening" className="text-sm text-healthy-600 hover:text-healthy-700 font-medium">
                Book appointment →
              </Link>
            </div>

            <div className="specialty-card specialty-card-lab">
              <div className="mb-4 h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Lab Work</h3>
              <p className="text-gray-500 text-sm mb-3">Comprehensive lab testing</p>
              <Link to="/patient/appointments/book?specialty=lab-work" className="text-sm text-healthy-600 hover:text-healthy-700 font-medium">
                Book appointment →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PatientDashboard;

