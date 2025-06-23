import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { multiTenantService, type DoctorProfile, type PatientProfile } from '@/services/supabaseService';

const specialties = [
  { id: 'dentistry', name: 'Dentistry', icon: '🦷', color: 'border-healthy-400' },
  { id: 'orthopaedics', name: 'Orthopaedics', icon: '🦴', color: 'border-nature-500' },
  { id: 'cancer-screening', name: 'Cancer Screening', icon: '🔬', color: 'border-amber-400' },
  { id: 'lab-work', name: 'Lab Work', icon: '🧪', color: 'border-purple-400' }
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

const AppointmentBooking = () => {
  const [searchParams] = useSearchParams();
  const defaultSpecialty = searchParams.get('specialty') || '';
  
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState(defaultSpecialty);
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Real data from database
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [patients, setPatients] = useState<PatientProfile[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  // Load doctors when specialty changes
  useEffect(() => {
    if (specialty) {
      loadDoctorsForSpecialty(specialty);
    }
  }, [specialty]);

  // Load patients on component mount (for getting patient ID)
  useEffect(() => {
    loadPatients();
  }, []);

  const loadDoctorsForSpecialty = async (specialtyName: string) => {
    setLoadingDoctors(true);
    try {
      const allDoctors = await multiTenantService.getDoctors();
      // Filter doctors by specialization (case-insensitive match)
      const filteredDoctors = allDoctors.filter(doc => 
        doc.specialization.toLowerCase().includes(specialtyName.toLowerCase()) ||
        specialtyName.toLowerCase().includes(doc.specialization.toLowerCase())
      );
      setDoctors(filteredDoctors);
    } catch (error) {
      console.error('Error loading doctors:', error);
      toast.error('Failed to load doctors. Please try again.');
    } finally {
      setLoadingDoctors(false);
    }
  };

  const loadPatients = async () => {
    try {
      const patientList = await multiTenantService.getPatients();
      setPatients(patientList);
    } catch (error) {
      console.error('Error loading patients:', error);
    }
  };

  const handleNextStep = async () => {
    if (step === 1 && specialty) {
      setStep(2);
    } else if (step === 2 && doctor && date) {
      setStep(3);
    } else if (step === 3 && time) {
      await bookAppointment();
    }
  };
  
  const bookAppointment = async () => {
    setIsLoading(true);
    try {
      // Get the first patient (in a real app, this would be the current logged-in patient)
      const currentPatient = patients[0];
      if (!currentPatient) {
        toast.error('No patient profile found. Please create a patient profile first.');
        return;
      }

      // Format the date and time
      const appointmentDate = date!.toISOString().split('T')[0]; // YYYY-MM-DD
      const appointmentTime = time;

      // Create appointment in database
      const appointment = await multiTenantService.createAppointment({
        patient_id: currentPatient.id,
        doctor_id: doctor,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        duration_minutes: 30,
        status: 'scheduled',
        appointment_type: 'consultation',
        notes: `${specialty} consultation`,
        consultation_fee: 100,
        payment_status: 'pending'
      });

      if (appointment) {
        toast.success('✅ Appointment booked successfully and saved to database!');
        console.log('🎉 Appointment created:', appointment);
        navigate('/patient/dashboard');
      } else {
        toast.error('Failed to create appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const selectedDoctor = doctors.find(d => d.id === doctor);
  
  return (
    <Layout userRole="patient">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Book an Appointment</h1>
          <p className="text-gray-500">Schedule a visit with our specialists</p>
        </header>
        
        <div className="w-full mb-8">
          <div className="flex items-center justify-between relative">
            <div className="w-full bg-gray-200 h-1 absolute"></div>
            {[1, 2, 3].map((stepNumber) => (
              <div 
                key={stepNumber}
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${
                  stepNumber === step 
                    ? 'bg-gradient-to-r from-healthy-400 to-nature-500 text-white' 
                    : stepNumber < step 
                      ? 'bg-healthy-100 text-healthy-700 ring-2 ring-healthy-400'
                      : 'bg-gray-100 text-gray-500'
                }`}
              >
                {stepNumber}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-600">Select Specialty</span>
            <span className="text-gray-600">Choose Doctor & Date</span>
            <span className="text-gray-600">Select Time</span>
          </div>
        </div>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>
              {step === 1 && "Select a Specialty"}
              {step === 2 && "Choose Doctor & Date"}
              {step === 3 && "Select a Time Slot"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Pick the type of appointment you need"}
              {step === 2 && "Select your preferred doctor and date"}
              {step === 3 && "Choose an available time slot"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialties.map(spec => (
                  <div
                    key={spec.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      specialty === spec.id ? `ring-2 ring-healthy-500 ${spec.color}` : 'border-gray-200 hover:border-healthy-200'
                    }`}
                    onClick={() => setSpecialty(spec.id)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{spec.icon}</span>
                      <div>
                        <h3 className="font-medium">{spec.name}</h3>
                        <p className="text-sm text-gray-500">Select for {spec.name.toLowerCase()} services</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Select Doctor</label>
                    {loadingDoctors ? (
                      <div className="p-3 border rounded-md text-center text-gray-500">
                        Loading doctors...
                      </div>
                    ) : doctors.length > 0 ? (
                      <Select value={doctor} onValueChange={setDoctor}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map(doc => (
                            <SelectItem key={doc.id} value={doc.id}>
                              {doc.first_name} {doc.last_name} - {doc.specialization}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-3 border rounded-md text-center text-amber-600 bg-amber-50">
                        No doctors available for {specialty}. Please try another specialty.
                      </div>
                    )}
                    
                    {selectedDoctor && (
                      <div className="mt-2 p-3 bg-healthy-50 rounded-md">
                        <h4 className="font-medium text-healthy-800">
                          Dr. {selectedDoctor.first_name} {selectedDoctor.last_name}
                        </h4>
                        <p className="text-sm text-healthy-600">{selectedDoctor.specialization}</p>
                        {selectedDoctor.experience_years && (
                          <p className="text-sm text-healthy-600">
                            {selectedDoctor.experience_years} years experience
                          </p>
                        )}
                        {selectedDoctor.consultation_fee && (
                          <p className="text-sm text-healthy-600">
                            Consultation fee: ${selectedDoctor.consultation_fee}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-sm font-medium mb-1 block">Select Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => {
                          // Disable past dates, weekends, and dates more than 30 days in the future
                          const now = new Date();
                          now.setHours(0, 0, 0, 0);
                          const thirtyDaysFromNow = new Date();
                          thirtyDaysFromNow.setDate(now.getDate() + 30);
                          
                          return (
                            date < now ||
                            date > thirtyDaysFromNow ||
                            date.getDay() === 0 ||
                            date.getDay() === 6
                          );
                        }}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div>
                <h3 className="font-medium mb-4">Available time slots for {date && format(date, "PPP")}</h3>
                {selectedDoctor && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-800">
                      <strong>Booking with:</strong> Dr. {selectedDoctor.first_name} {selectedDoctor.last_name}
                    </p>
                    <p className="text-sm text-blue-600">{selectedDoctor.specialization}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      className={`p-2 border rounded-md text-center text-sm transition-colors ${
                        time === slot 
                          ? 'bg-healthy-50 border-healthy-200 text-healthy-700 font-medium'
                          : 'border-gray-200 hover:border-healthy-200'
                      }`}
                      onClick={() => setTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevStep} 
              disabled={step === 1}
            >
              Back
            </Button>
            <Button 
              onClick={handleNextStep}
              disabled={
                (step === 1 && !specialty) ||
                (step === 2 && (!doctor || !date)) ||
                (step === 3 && !time) ||
                isLoading
              }
              className="bg-gradient-to-r from-healthy-400 to-nature-500 hover:from-healthy-500 hover:to-nature-600"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Booking...
                </>
              ) : step < 3 ? 'Continue' : 'Book Appointment'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AppointmentBooking;
