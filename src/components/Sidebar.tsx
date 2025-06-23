
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, FileText, MessageSquare, Users, Settings } from 'lucide-react';

type SidebarProps = {
  userRole: 'patient' | 'doctor';
};

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const patientLinks = [
    { name: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/patient/dashboard' },
    { name: 'Appointments', icon: <Calendar className="h-5 w-5" />, path: '/patient/appointments' },
    { name: 'Reports', icon: <FileText className="h-5 w-5" />, path: '/patient/reports' },
    { name: 'Messages', icon: <MessageSquare className="h-5 w-5" />, path: '/patient/messages' },
    { name: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/patient/settings' }
  ];
  
  const doctorLinks = [
    { name: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/doctor/dashboard' },
    { name: 'Schedule', icon: <Calendar className="h-5 w-5" />, path: '/doctor/schedule' },
    { name: 'Patients', icon: <Users className="h-5 w-5" />, path: '/doctor/patients' },
    { name: 'Reports', icon: <FileText className="h-5 w-5" />, path: '/doctor/reports' },
    { name: 'Messages', icon: <MessageSquare className="h-5 w-5" />, path: '/doctor/messages' },
    { name: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/doctor/settings' }
  ];
  
  const links = userRole === 'patient' ? patientLinks : doctorLinks;
  
  return (
    <aside className="hidden md:flex flex-col bg-white/70 backdrop-blur-sm border-r border-gray-100 w-64 min-h-screen pt-4 pb-6 px-3">
      <div className="space-y-1 mt-6">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(link.path)
                ? 'bg-gradient-to-r from-healthy-100 to-nature-100 text-healthy-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {React.cloneElement(link.icon, {
              className: `${isActive(link.path) ? 'text-healthy-500' : 'text-gray-500'} h-5 w-5`
            })}
            <span>{link.name}</span>
            {isActive(link.path) && (
              <div className="h-full w-1 absolute right-0 bg-gradient-to-b from-healthy-400 to-nature-400 rounded-l-full" />
            )}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
