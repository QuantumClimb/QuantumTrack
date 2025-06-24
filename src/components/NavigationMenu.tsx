import React from "react";
import { Link } from "react-router-dom";
import { Plus, BarChart2, Settings, FileText, CreditCard } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface NavigationMenuProps {
  variant?: 'dashboard' | 'launch';
  className?: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ variant = 'dashboard', className }) => {
  const { theme } = useTheme();

  const menuItems = [
    { icon: Plus, label: "New Entry", to: "/dashboard", ariaLabel: "Create new entry", preload: "dashboard" },
    { icon: CreditCard, label: "Payments", to: "/payments", ariaLabel: "Input payments", preload: "payments" },
    { icon: BarChart2, label: "Reports", to: "/reports", ariaLabel: "View reports", preload: "reports" },
    { icon: FileText, label: "Records", to: "/records", ariaLabel: "View records", preload: "records" },
    { icon: Settings, label: "Settings", to: "/settings", ariaLabel: "Adjust settings", preload: "settings" },
  ];

  // Filter out New Entry for launch variant
  const filteredMenuItems = variant === 'launch' ? menuItems.slice(1) : menuItems;

  const baseClasses = {
    dashboard: "grid grid-cols-5 gap-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg border-t border-gray-200 dark:border-gray-800",
    launch: "w-full max-w-md grid grid-cols-2 justify-items-center gap-3 sm:gap-4 px-4"
  };

  const itemClasses = {
    dashboard: "w-12 h-12 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all duration-300 hover:scale-105 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
    launch: "w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white/30 z-10 focus:outline-none focus:ring-2 focus:ring-white/50"
  };

  const iconClasses = {
    dashboard: "h-6 w-6",
    launch: "h-7 w-7 sm:h-9 sm:w-9"
  };

  const labelClasses = {
    dashboard: "mt-1 text-xs text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors",
    launch: "absolute -bottom-6 text-white/80 text-xs sm:text-sm font-light opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity"
  };

  const containerClasses = variant === 'dashboard' 
    ? "fixed bottom-0 left-0 right-0 px-4 py-2" 
    : "";

  return (
    <nav className={containerClasses}>
      <div className={baseClasses[variant]}>
        {filteredMenuItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className="relative flex flex-col items-center group"
            aria-label={item.ariaLabel}
            data-preload={item.preload}
          >
            <div className={itemClasses[variant]}>
              <item.icon className={iconClasses[variant]} />
            </div>
            <span className={labelClasses[variant]}>
              {item.label}
            </span>
            {variant === 'launch' && (
              <div className="absolute -inset-1 rounded-full bg-white/5 blur-md z-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavigationMenu; 