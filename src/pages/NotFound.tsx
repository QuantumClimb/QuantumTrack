
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 p-4">
      <div className="glass-card p-8 max-w-md w-full text-center space-y-6">
        <div className="bg-red-50 w-20 h-20 rounded-full mx-auto flex items-center justify-center">
          <p className="text-3xl font-bold text-red-500">404</p>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">Page not found</h1>
          <p className="text-gray-600">
            Sorry, we couldn't find the page you're looking for:
            <span className="block font-mono text-sm bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
              {location.pathname}
            </span>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()} 
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Link to="/" className="w-full sm:w-auto">
            <Button className="flex items-center gap-2 w-full">
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
