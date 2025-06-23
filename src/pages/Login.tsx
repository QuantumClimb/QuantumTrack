
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, handle authentication here
    if (role === 'patient') {
      navigate('/patient/dashboard');
    } else {
      navigate('/doctor/dashboard');
    }
  };
  
  const handleDemoLogin = (selectedRole: 'patient' | 'doctor') => {
    setRole(selectedRole);
    // In a real app, handle demo authentication here
    if (selectedRole === 'patient') {
      navigate('/patient/dashboard');
    } else {
      navigate('/doctor/dashboard');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50 p-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-healthy-400 to-nature-500 text-transparent bg-clip-text mb-2">
          HEALTHY
        </h1>
        <p className="text-gray-500">Your trusted healthcare companion</p>
      </div>
      
      <Card className="w-full max-w-md glass-card animate-scale-in shadow-xl">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="patient" onValueChange={(value) => setRole(value as 'patient' | 'doctor')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patient">Patient</TabsTrigger>
            <TabsTrigger value="doctor">Doctor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="patient">
            <CardContent className="space-y-4 pt-4">
              <Alert className="bg-blue-50 border-blue-200">
                <InfoIcon className="h-4 w-4 text-blue-500 mr-2" />
                <AlertDescription className="text-sm text-blue-700">
                  <strong>Demo Patient Login</strong>
                </AlertDescription>
              </Alert>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Email</TableCell>
                      <TableCell>patient@example.com</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Password</TableCell>
                      <TableCell>password123</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <form onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="patient@example.com" />
                </div>
                <div className="space-y-2 mt-4">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-gradient-to-r from-healthy-400 to-nature-500 hover:from-healthy-500 hover:to-nature-600" onClick={handleLogin}>
                Sign In
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => handleDemoLogin('patient')}
              >
                Continue as Demo Patient
              </Button>
            </CardFooter>
          </TabsContent>
          
          <TabsContent value="doctor">
            <CardContent className="space-y-4 pt-4">
              <Alert className="bg-green-50 border-green-200">
                <InfoIcon className="h-4 w-4 text-green-500 mr-2" />
                <AlertDescription className="text-sm text-green-700">
                  <strong>Demo Doctor Login</strong>
                </AlertDescription>
              </Alert>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Email</TableCell>
                      <TableCell>doctor@example.com</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Password</TableCell>
                      <TableCell>doctor123</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Clinic ID</TableCell>
                      <TableCell>CLINIC123</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <form onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="doctor@example.com" />
                </div>
                <div className="space-y-2 mt-4">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2 mt-4">
                  <label htmlFor="clinic-id" className="text-sm font-medium">Clinic ID</label>
                  <Input id="clinic-id" type="text" placeholder="CLINIC123" />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-gradient-to-r from-healthy-400 to-nature-500 hover:from-healthy-500 hover:to-nature-600" onClick={handleLogin}>
                Sign In
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => handleDemoLogin('doctor')}
              >
                Continue as Demo Doctor
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
