
import { Outlet } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Layout = () => {
  // We'll use the toast in the future for notifications
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans font-light">
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
