
import React, { useState } from 'react';
import { Bell, Lock, User, Globe, MoonStar, Sun, Eye, EyeOff } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';

const DoctorSettings = () => {
  // State for various settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Demo doctor profile data
  const [profile, setProfile] = useState({
    name: 'Dr. James Wilson',
    email: 'dr.wilson@healthy.com',
    phone: '+1 (555) 123-4567',
    specialization: 'Cardiology',
    language: 'English',
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would save the profile changes
    console.log('Saving profile:', profile);
    // Show toast notification
  };

  return (
    <Layout userRole="doctor">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="col-span-1">
            <div className="glass-card p-6 rounded-lg shadow-sm space-y-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-24 h-24 bg-gradient-to-r from-healthy-400 to-nature-500 rounded-full p-0.5 mb-4">
                  <div className="w-full h-full flex items-center justify-center bg-white rounded-full">
                    <User className="h-12 w-12 text-healthy-600" />
                  </div>
                </div>
                <h2 className="font-bold text-xl">{profile.name}</h2>
                <p className="text-sm text-gray-500">{profile.specialization}</p>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 gap-3">
                <p className="text-sm text-gray-500">Email</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{emailVisible ? profile.email : '•••••••••••••'}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setEmailVisible(!emailVisible)}
                    className="p-1"
                  >
                    {emailVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                
                <p className="text-sm text-gray-500 mt-2">Phone</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{phoneVisible ? profile.phone : '•••••••••••'}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setPhoneVisible(!phoneVisible)}
                    className="p-1"
                  >
                    {phoneVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            {/* Profile Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-healthy-500" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={profile.name}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input 
                        id="specialization" 
                        name="specialization" 
                        value={profile.specialization}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={profile.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={profile.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Preferred Language</Label>
                      <Input 
                        id="language" 
                        name="language" 
                        value={profile.language}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Notifications Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-healthy-500" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications about appointments and patient updates</p>
                  </div>
                  <Switch 
                    checked={notificationsEnabled} 
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-healthy-500" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Switch 
                    checked={twoFactorEnabled} 
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>
                <Separator />
                <div className="pt-2">
                  <Button variant="outline">Change Password</Button>
                </div>
              </CardContent>
            </Card>

            {/* Appearance Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-healthy-500" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {darkMode ? 
                      <MoonStar className="h-5 w-5 text-healthy-500" /> : 
                      <Sun className="h-5 w-5 text-healthy-500" />
                    }
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-500">Toggle between light and dark theme</p>
                    </div>
                  </div>
                  <Switch 
                    checked={darkMode} 
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorSettings;
