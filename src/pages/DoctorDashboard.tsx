
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, FileText, ChevronRight, MessageCircle, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Enhanced sample data - in a real app, this would come from API
const todayAppointments = [
  { 
    id: 1, 
    patient: 'Sarah Johnson', 
    time: '09:00 AM', 
    type: 'Dentistry', 
    status: 'Confirmed',
    phone: '+14155552672',
    notes: 'Regular checkup and cleaning',
    history: 'Last visit: Jan 15, 2025 - Filling on lower right molar'
  },
  { 
    id: 2, 
    patient: 'Michael Brown', 
    time: '10:30 AM', 
    type: 'Dentistry', 
    status: 'In progress',
    phone: '+14155552673',
    notes: 'Follow-up on root canal',
    history: 'Last visit: Mar 22, 2025 - Root canal initial treatment'
  },
  { 
    id: 3, 
    patient: 'Emily Davis', 
    time: '02:00 PM', 
    type: 'Dentistry', 
    status: 'Upcoming',
    phone: '+14155552674',
    notes: 'Wisdom tooth consultation',
    history: 'New patient'
  },
];

const pendingReports = [
  { 
    id: 1, 
    patient: 'Sarah Johnson', 
    type: 'X-Ray Results', 
    date: 'April 7, 2025',
    priority: 'High',
    appointmentDate: 'April 3, 2025'
  },
  { 
    id: 2, 
    patient: 'Robert Wilson', 
    type: 'Blood Test', 
    date: 'April 6, 2025',
    priority: 'Medium',
    appointmentDate: 'April 1, 2025'
  },
];

const patientStats = {
  total: 128,
  new: 3,
  upcoming: 5
};

// Function to create WhatsApp URL with pre-filled message for doctor
const createWhatsAppUrl = (phone: string, appointment: any) => {
  const message = encodeURIComponent(
    `Hello ${appointment.patient}, this is Dr. Rodriguez from Healthy Clinic regarding your ${appointment.type} appointment scheduled for today at ${appointment.time}. Please confirm if you'll be attending. Thank you!`
  );
  return `https://wa.me/${phone}?text=${message}`;
};

const DoctorDashboard = () => {
  return (
    <Layout userRole="doctor">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, Dr. Rodriguez</h1>
          <p className="text-gray-500">Here's your day at a glance</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 font-normal">Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">{todayAppointments.length}</span>
                <span className="ml-2 text-sm text-gray-500">patients</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 font-normal">Pending Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">{pendingReports.length}</span>
                <span className="ml-2 text-sm text-gray-500">reports</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 font-normal">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">{patientStats.total}</span>
                <Badge variant="outline" className="ml-2 bg-nature-50 text-nature-700 border-nature-200">
                  +{patientStats.new} new
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <Card className="glass-card lg:col-span-2">
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-healthy-500" />
                  Today's Schedule
                </CardTitle>
                <Badge variant="outline" className="bg-gray-100 text-gray-600">
                  April 7, 2025
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {todayAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todayAppointments.map(appointment => (
                    <div 
                      key={appointment.id} 
                      className="p-4 rounded-lg hover:bg-gray-50 border border-gray-100"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="bg-gray-100 rounded-md p-2 text-gray-500">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{appointment.patient}</h4>
                          <p className="text-sm text-gray-500">{appointment.type}</p>
                        </div>
                        <div>
                          <Badge 
                            className={`
                              ${appointment.status === 'Confirmed' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                              ${appointment.status === 'In progress' ? 'bg-healthy-50 text-healthy-700 border-healthy-200' : ''}
                              ${appointment.status === 'Upcoming' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                            `}
                          >
                            {appointment.status}
                          </Badge>
                          <p className="text-sm text-gray-500 text-right mt-1">{appointment.time}</p>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        <p><strong>Notes:</strong> {appointment.notes}</p>
                        <p><strong>History:</strong> {appointment.history}</p>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <a 
                          href={createWhatsAppUrl(appointment.phone, appointment)}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </a>
                        <a 
                          href={`tel:${appointment.phone}`}
                          className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded transition-colors"
                        >
                          <Phone className="h-4 w-4" />
                          Call
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No appointments for today</p>
              )}
            </CardContent>
            <CardFooter className="border-t border-gray-100 bg-gray-50/50">
              <Link to="/doctor/schedule" className="text-sm text-healthy-600 hover:text-healthy-700 font-medium flex items-center w-full justify-between">
                View full schedule
                <ChevronRight className="h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for your workflow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start bg-gradient-to-r from-healthy-400 to-nature-500 hover:from-healthy-500 hover:to-nature-600" asChild>
                <Link to="/doctor/patients/upload-report">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Patient Report
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/doctor/schedule/manage">
                  <Calendar className="h-4 w-4 mr-2" />
                  Manage Schedule
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/doctor/patients">
                  <Users className="h-4 w-4 mr-2" />
                  View Patient List
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Pending Reports */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-amber-500" />
            Pending Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingReports.map(report => (
              <div 
                key={report.id}
                className={`glass-card p-4 border-l-4 ${
                  report.priority === 'High' ? 'border-red-400' : 
                  report.priority === 'Medium' ? 'border-amber-400' : 
                  'border-blue-400'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{report.patient}</h3>
                  <Badge variant="outline" className={`text-xs ${
                    report.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200' : 
                    report.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                    'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {report.priority} Priority
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mb-3">{report.type}</p>
                <div className="text-xs text-gray-500 mb-3">
                  <p>Appointment: {report.appointmentDate}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Due: {report.date}</span>
                  <Button variant="ghost" size="sm" className="text-healthy-600 hover:text-healthy-700 px-2 h-8" asChild>
                    <Link to={`/doctor/reports/create/${report.id}`}>
                      Complete
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
