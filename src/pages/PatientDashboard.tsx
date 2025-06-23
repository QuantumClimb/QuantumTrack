import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, MessageSquare, ChevronRight, Phone, MessageCircle, Clipboard } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const upcomingAppointment = {
  id: 'apt-123',
  doctor: 'Dr. Maria Rodriguez',
  specialty: 'Dentistry',
  date: 'April 15, 2025',
  time: '10:00 AM',
  status: 'confirmed',
  clinicPhone: '+14155552671',
  notes: 'Regular dental checkup and cleaning'
};

const recentReports = [
  { id: 'rep-1', name: 'Dental X-Ray Results', date: 'March 28, 2025', type: 'Dentistry', doctor: 'Dr. Maria Rodriguez' },
  { id: 'rep-2', name: 'Blood Test Results', date: 'March 15, 2025', type: 'Lab Work', doctor: 'Dr. James Wilson' }
];

const createWhatsAppUrl = (phone: string, appointmentInfo: any) => {
  const message = encodeURIComponent(
    `Hello, this is regarding my appointment with ${appointmentInfo.doctor} on ${appointmentInfo.date} at ${appointmentInfo.time} for ${appointmentInfo.specialty}. I would like to confirm this appointment. Thank you!`
  );
  return `https://wa.me/${phone}?text=${message}`;
};

const PatientDashboard = () => {
  return (
    <Layout userRole="patient">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, Sarah</h1>
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
            {upcomingAppointment ? (
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{upcomingAppointment.doctor}</h3>
                      <p className="text-sm text-gray-500">{upcomingAppointment.specialty}</p>
                    </div>
                    <Badge variant="outline" className="border-healthy-200 text-healthy-700 bg-healthy-50">
                      {upcomingAppointment.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-500">Date</span>
                      <span className="font-medium">{upcomingAppointment.date}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-gray-500">Time</span>
                      <span className="font-medium">{upcomingAppointment.time}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <a 
                      href={createWhatsAppUrl(upcomingAppointment.clinicPhone, upcomingAppointment)}
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
                <p className="text-gray-500">No upcoming appointments</p>
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
              <div className="space-y-3">
                {recentReports.map(report => (
                  <div key={report.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                    <div>
                      <h4 className="font-medium text-sm">{report.name}</h4>
                      <p className="text-xs text-gray-500">{report.date}</p>
                    </div>
                    <Badge variant="outline" className="text-xs border-gray-200">
                      {report.type}
                    </Badge>
                  </div>
                ))}
              </div>
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
                  <a href={`https://wa.me/${upcomingAppointment.clinicPhone}`} target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
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
              <p className="text-gray-500 text-sm mb-3">Comprehensive testing services</p>
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
