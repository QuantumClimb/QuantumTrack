
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  
  // Don't show header on the main dashboard
  if (location.pathname === '/') {
    return null;
  }
  
  return (
    <header className="glassmorphism py-3 sticky top-0 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center" aria-label="Go to home page">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-light">Back</span>
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 touch-ripple" 
          aria-label="Menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
