import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, FileText, BarChart2, Settings } from 'lucide-react';

const menuItems = [
  { to: '/dashboard', icon: Home, label: 'Home', ariaLabel: 'Go to dashboard' },
  { to: '/records', icon: FileText, label: 'Records', ariaLabel: 'View records' },
  { to: '/reports', icon: BarChart2, label: 'Reports', ariaLabel: 'View reports' },
  { to: '/settings', icon: Settings, label: 'Settings', ariaLabel: 'Go to settings' },
];

const AppLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="pb-16">
        <Outlet />
      </main>
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-1 py-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  aria-label={item.ariaLabel}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default AppLayout; 