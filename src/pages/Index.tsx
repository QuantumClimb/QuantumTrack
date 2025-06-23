
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const features = [
    { 
      id: 'appointments', 
      icon: <Calendar className="h-6 w-6" />, 
      title: 'Easy Scheduling',
      description: 'Book and manage appointments with our specialists online',
      color: 'from-healthy-400 to-nature-400'
    },
    { 
      id: 'reports', 
      icon: <FileText className="h-6 w-6" />, 
      title: 'Digital Records',
      description: 'Access your medical reports and lab results anytime',
      color: 'from-amber-400 to-orange-400'
    },
    { 
      id: 'chat', 
      icon: <MessageSquare className="h-6 w-6" />, 
      title: 'Direct Communication',
      description: 'Chat with your doctor or our clinic via WhatsApp',
      color: 'from-green-400 to-emerald-500'
    },
  ];

  const specialties = [
    { name: 'Dentistry', icon: '🦷', color: 'border-healthy-400' },
    { name: 'Orthopaedics', icon: '🦴', color: 'border-nature-500' },
    { name: 'Cancer Screening', icon: '🔬', color: 'border-amber-400' },
    { name: 'Lab Work', icon: '🧪', color: 'border-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-healthy-50 to-nature-50 opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-healthy-600 to-nature-600 text-transparent bg-clip-text mb-6">
            HEALTHY
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl">
            Your trusted healthcare companion for a healthier tomorrow
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              className="bg-gradient-to-r from-healthy-400 to-nature-400 hover:from-healthy-500 hover:to-nature-500 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all text-lg font-medium"
            >
              <Link to="/login">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline"
              asChild
              className="border-2 border-healthy-300 text-healthy-700 px-8 py-6 rounded-full hover:bg-healthy-50 transition-all text-lg font-medium"
            >
              <Link to="/login">
                Doctor Login
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Making Healthcare <span className="text-healthy-500">Simple</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="glass-card p-8 transition-all hover:shadow-lg relative overflow-hidden"
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} transition-all duration-300 ${
                hoveredFeature === feature.id ? 'w-full' : 'w-0'
              }`} />
              
              <div className={`h-14 w-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Our Specialties
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            HEALTHY offers a range of medical services to meet your healthcare needs
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty) => (
              <div key={specialty.name} className={`glass-card p-6 ${specialty.color}`}>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">{specialty.icon}</span>
                  <h3 className="text-lg font-medium">{specialty.name}</h3>
                </div>
                <Link 
                  to="/login" 
                  className="text-sm text-healthy-600 hover:text-healthy-700 font-medium inline-flex items-center"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto glass-card overflow-hidden">
          <div className="bg-gradient-to-r from-healthy-400 to-nature-400 h-2" />
          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of patients who trust HEALTHY for their healthcare needs. 
              Our team of specialists is ready to provide you with the best care.
            </p>
            <Button 
              asChild
              className="bg-gradient-to-r from-healthy-400 to-nature-400 hover:from-healthy-500 hover:to-nature-500 text-white px-8 py-6 rounded-full shadow-md hover:shadow-lg transition-all text-lg font-medium"
            >
              <Link to="/login">
                Create Account
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-healthy-400 to-nature-500 text-transparent bg-clip-text">
                HEALTHY
              </h2>
              <p className="text-gray-500 mt-1">Your trusted healthcare companion</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 text-healthy-500" />
                <span>(123) 456-7890</span>
              </div>
              <Button 
                variant="outline" 
                className="border-healthy-200 text-healthy-600 hover:bg-healthy-50"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with us
              </Button>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-8 pt-8 text-center text-gray-500 text-sm">
            © 2025 HEALTHY. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
