
import React, { useState } from 'react';
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

const specialties = [
  { id: 'dentistry', name: 'Dentistry', icon: '🦷', color: 'border-healthy-400' },
  { id: 'orthopaedics', name: 'Orthopaedics', icon: '🦴', color: 'border-nature-500' },
  { id: 'cancer-screening', name: 'Cancer Screening', icon: '🔬', color: 'border-amber-400' },
  { id: 'lab-work', name: 'Lab Work', icon: '🧪', color: 'border-purple-400' }
];

const doctors = {
  'dentistry': [
    { id: 'dr-1', name: 'Dr. Maria Rodriguez' },
    { id: 'dr-2', name: 'Dr. James Smith' }
  ],
  'orthopaedics': [
    { id: 'dr-3', name: 'Dr. Robert Johnson' },
    { id: 'dr-4', name: 'Dr. Sarah Williams' }
  ],
  'cancer-screening': [
    { id: 'dr-5', name: 'Dr. Emily Davis' },
    { id: 'dr-6', name: 'Dr. Michael Brown' }
  ],
  'lab-work': [
    { id: 'dr-7', name: 'Dr. Jennifer Wilson' },
    { id: 'dr-8', name: 'Dr. David Jones' }
  ]
};

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
  
  const handleNextStep = () => {
    if (step === 1 && specialty) {
      setStep(2);
    } else if (step === 2 && doctor && date) {
      setStep(3);
    } else if (step === 3 && time) {
      // In a real app, this would submit the appointment to an API
      toast.success('Appointment booked successfully!');
      navigate('/patient/dashboard');
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
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
                    <Select value={doctor} onValueChange={setDoctor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialty && doctors[specialty as keyof typeof doctors].map(doc => (
                          <SelectItem key={doc.id} value={doc.id}>{doc.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                (step === 3 && !time)
              }
              className="bg-gradient-to-r from-healthy-400 to-nature-500 hover:from-healthy-500 hover:to-nature-600"
            >
              {step < 3 ? 'Continue' : 'Book Appointment'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AppointmentBooking;
