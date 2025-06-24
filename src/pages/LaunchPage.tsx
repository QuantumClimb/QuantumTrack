import React, { useEffect } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { getApartmentRecords } from "@/services/apiService";
import { formatCurrency } from "@/utils/helpers";
import NavigationMenu from "@/components/NavigationMenu";
import { useTheme } from "@/components/ThemeProvider";

const LaunchPage = () => {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Display the most recent record as a toast on first load
    const showLatestRecord = async () => {
      try {
        const records = await getApartmentRecords();
        
        if (records.length > 0) {
          // Get the most recent record (assuming sorted by date)
          const latestRecord = records[records.length - 1];
          
          // Only show if the record was created in the last 5 seconds
          const recordTime = new Date(latestRecord.created_at).getTime();
          const currentTime = new Date().getTime();
          const timeDiff = currentTime - recordTime;
          
          if (timeDiff < 5000) {
            toast({
              title: "Record Saved",
              description: `Apartment ${latestRecord.apartment}: ${formatCurrency(latestRecord.amount)} has been saved`,
              duration: 4000,
            });
          }
        }
      } catch (error) {
        console.error("Error loading latest record:", error);
      }
    };
    
    showLatestRecord();
  }, []);

  return (
    <div className="min-h-screen blue-gradient flex flex-col items-center justify-center relative pb-20" role="main">
      {/* Toast container */}
      <Toaster />
      
      {/* Logo */}
      <div className="text-white mb-8 text-center">
        <img 
          src="/logo.png"
          alt="Credit Line Logo" 
          className="w-48 h-auto mb-4 mx-auto"
        />
        <p className="text-xl font-light opacity-80">Apartment Tracker</p>
      </div>
      
      {/* Main Action Button */}
      <Link
        to="/dashboard"
        className="relative flex flex-col items-center group mb-8"
        aria-label="Create new entry"
      >
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white 
                  shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 
                  hover:bg-white/30 z-10 focus:outline-none focus:ring-2 focus:ring-white/50">
          <Plus className="h-12 w-12 sm:h-16 sm:w-16" />
        </div>
        <span className="absolute -bottom-8 text-white/80 text-sm sm:text-base font-light opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
          New Entry
        </span>
        <div className="absolute -inset-1 rounded-full bg-white/5 blur-md z-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </Link>
      
      {/* Grid Menu */}
      <NavigationMenu variant="launch" />
      
      {/* Decorative stars/bubbles - marked as decorative */}
      <div className="absolute top-20 right-20 text-white/20 text-2xl animate-pulse" aria-hidden="true">✦</div>
      <div className="absolute top-40 left-24 text-white/20 text-sm animate-pulse" style={{ animationDelay: "0.5s" }} aria-hidden="true">✦</div>
      <div className="absolute bottom-32 right-24 text-white/10 text-lg animate-pulse" style={{ animationDelay: "1s" }} aria-hidden="true">✦</div>
      <div className="absolute bottom-48 left-16 text-white/10 text-xs animate-pulse" style={{ animationDelay: "1.5s" }} aria-hidden="true">✦</div>
      
      {/* Additional floating elements for liquid feel - marked as decorative */}
      <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-white/10 animate-pulse" aria-hidden="true"></div>
      <div className="absolute bottom-1/4 right-1/3 w-6 h-6 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: "1.2s" }} aria-hidden="true"></div>
      <div className="absolute top-2/3 left-1/2 w-3 h-3 rounded-full bg-white/10 animate-pulse" style={{ animationDelay: "0.7s" }} aria-hidden="true"></div>
      
      {/* A skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-700 text-white px-4 py-2 rounded">
        Skip to main content
      </a>
      
      {/* Footer with additional information for desktop */}
      <div className="hidden lg:block absolute bottom-4 text-white/60 text-xs">
        <p>Press <kbd className="px-2 py-1 bg-white/10 rounded">Tab</kbd> to navigate between menu items</p>
      </div>
    </div>
  );
};

export default LaunchPage;
