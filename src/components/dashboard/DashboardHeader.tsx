import React from "react";
import NavigationMenu from "@/components/NavigationMenu";
import { useTheme } from "@/components/ThemeProvider";

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { theme } = useTheme();

  return (
    <div className="w-full bg-white dark:bg-gray-900 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/10 dark:from-blue-400/5 dark:to-blue-500/10" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <img 
              src={theme === 'dark' ? '/logo_blue.png' : '/logo_red.png'} 
              alt="Credit Line Logo" 
              className="h-8 w-auto mr-3"
            />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Credit Line</h1>
          </div>
        </div>
        <NavigationMenu variant="dashboard" />
      </div>
    </div>
  );
};

export default DashboardHeader;
