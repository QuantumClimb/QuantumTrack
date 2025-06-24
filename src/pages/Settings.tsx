import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/ThemeProvider";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme, isAutomatic, setIsAutomatic } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Settings</h1>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Appearance
            </h2>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-dark-mode" className="text-sm font-medium">
                    Automatic Dark Mode
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Automatically switch theme based on time of day (7:00 PM - 7:00 AM)
                  </p>
                </div>
                <Switch
                  id="auto-dark-mode"
                  checked={isAutomatic}
                  onCheckedChange={setIsAutomatic}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">
                    Manual Theme Selection
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose between light and dark mode
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="h-10 w-10"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 