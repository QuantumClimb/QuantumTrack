import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import RecordsSheet from "@/components/RecordsSheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Bell, Moon, Sun, Palette, Volume2, Languages, Shield, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabContentProps {
  activeTab: string;
  refreshRecords: () => void;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, refreshRecords }) => {
  return (
    <>
      <TabsContent 
        value="history" 
        className="mt-0 p-4 lg:p-6 flex-1"
        role="tabpanel"
        aria-labelledby="history-tab"
      >
        <div className="bg-white shadow rounded-lg p-4 lg:p-6 h-full">
          <h2 className="text-xl font-light text-blue-700 mb-4" id="history-heading">Recent History</h2>
          <RecordsSheet onRefresh={refreshRecords} />
        </div>
      </TabsContent>
      
      <TabsContent 
        value="settings" 
        className="mt-0 p-4 lg:p-6 flex-1"
        role="tabpanel"
        aria-labelledby="settings-tab"
      >
        <div className="bg-white shadow-md rounded-lg p-6 lg:p-8 h-full max-w-3xl mx-auto">
          <h2 
            className="text-2xl font-semibold text-gray-900 mb-8" 
            id="settings-heading"
          >
            Settings
          </h2>
          
          <Accordion 
            type="single" 
            collapsible 
            className="w-full space-y-6"
          >
            <AccordionItem 
              value="appearance" 
              className="border border-gray-200 rounded-lg px-4 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <AccordionTrigger 
                className="hover:no-underline py-4 transition-colors hover:bg-gray-50"
                aria-controls="appearance-content"
              >
                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  <span className="text-base font-medium text-gray-900">Appearance</span>
                </div>
              </AccordionTrigger>
              <AccordionContent 
                id="appearance-content" 
                className="space-y-6 pb-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sun className="h-4 w-4 text-gray-500" aria-hidden="true" />
                    <Label 
                      htmlFor="dark-mode" 
                      className="text-sm font-medium text-gray-700"
                    >
                      Dark Mode
                    </Label>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    aria-label="Toggle dark mode"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label 
                    htmlFor="high-contrast" 
                    className="text-sm font-medium text-gray-700"
                  >
                    High Contrast
                  </Label>
                  <Switch 
                    id="high-contrast" 
                    aria-label="Toggle high contrast mode"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label 
                    htmlFor="large-text" 
                    className="text-sm font-medium text-gray-700"
                  >
                    Large Text
                  </Label>
                  <Switch 
                    id="large-text" 
                    aria-label="Toggle large text mode"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="notifications" 
              className="border border-gray-200 rounded-lg px-4 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <AccordionTrigger 
                className="hover:no-underline py-4 transition-colors hover:bg-gray-50"
                aria-controls="notifications-content"
              >
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  <span className="text-base font-medium text-gray-900">Notifications</span>
                </div>
              </AccordionTrigger>
              <AccordionContent 
                id="notifications-content" 
                className="space-y-6 pb-6"
              >
                <div className="flex items-center justify-between">
                  <Label 
                    htmlFor="payment-reminders" 
                    className="text-sm font-medium text-gray-700"
                  >
                    Payment Reminders
                  </Label>
                  <Switch 
                    id="payment-reminders" 
                    aria-label="Toggle payment reminders"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label 
                    htmlFor="new-records" 
                    className="text-sm font-medium text-gray-700"
                  >
                    New Records
                  </Label>
                  <Switch 
                    id="new-records" 
                    aria-label="Toggle new records notifications"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label 
                    htmlFor="sound-effects" 
                    className="text-sm font-medium text-gray-700"
                  >
                    Sound Effects
                  </Label>
                  <Switch 
                    id="sound-effects" 
                    aria-label="Toggle sound effects"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="language" 
              className="border border-gray-200 rounded-lg px-4 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <AccordionTrigger 
                className="hover:no-underline py-4 transition-colors hover:bg-gray-50"
                aria-controls="language-content"
              >
                <div className="flex items-center gap-3">
                  <Languages className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  <span className="text-base font-medium text-gray-900">Language & Region</span>
                </div>
              </AccordionTrigger>
              <AccordionContent 
                id="language-content" 
                className="space-y-6 pb-6"
              >
                <div className="grid gap-3">
                  <Label 
                    htmlFor="language" 
                    className="text-sm font-medium text-gray-700"
                  >
                    Language
                  </Label>
                  <select 
                    id="language" 
                    className="w-full p-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    aria-label="Select language"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
                <div className="grid gap-3">
                  <Label 
                    htmlFor="currency" 
                    className="text-sm font-medium text-gray-700"
                  >
                    Currency Format
                  </Label>
                  <select 
                    id="currency" 
                    className="w-full p-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    aria-label="Select currency format"
                  >
                    <option value="usd">USD ($)</option>
                    <option value="eur">EUR (€)</option>
                    <option value="gbp">GBP (£)</option>
                  </select>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="security" 
              className="border border-gray-200 rounded-lg px-4 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <AccordionTrigger 
                className="hover:no-underline py-4 transition-colors hover:bg-gray-50"
                aria-controls="security-content"
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  <span className="text-base font-medium text-gray-900">Security</span>
                </div>
              </AccordionTrigger>
              <AccordionContent 
                id="security-content" 
                className="space-y-6 pb-6"
              >
                <div className="grid gap-3">
                  <Label 
                    htmlFor="current-pin" 
                    className="text-sm font-medium text-gray-700"
                  >
                    Current PIN
                  </Label>
                  <Input 
                    type="password" 
                    id="current-pin" 
                    placeholder="Enter current PIN" 
                    className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    aria-label="Enter your current PIN"
                    maxLength={6}
                  />
                </div>
                <div className="grid gap-3">
                  <Label 
                    htmlFor="new-pin" 
                    className="text-sm font-medium text-gray-700"
                  >
                    New PIN
                  </Label>
                  <Input 
                    type="password" 
                    id="new-pin" 
                    placeholder="Enter new PIN" 
                    className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    aria-label="Enter your new PIN"
                    maxLength={6}
                  />
                </div>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
                  aria-label="Update PIN"
                >
                  Update PIN
                </Button>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <Label 
                    htmlFor="biometric" 
                    className="text-sm font-medium text-gray-700"
                  >
                    Biometric Login
                  </Label>
                  <Switch 
                    id="biometric" 
                    aria-label="Toggle biometric login"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="backup" 
              className="border border-gray-200 rounded-lg px-4 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <AccordionTrigger 
                className="hover:no-underline py-4 transition-colors hover:bg-gray-50"
                aria-controls="backup-content"
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  <span className="text-base font-medium text-gray-900">Backup & Sync</span>
                </div>
              </AccordionTrigger>
              <AccordionContent 
                id="backup-content" 
                className="space-y-6 pb-6"
              >
                <div className="flex items-center justify-between">
                  <Label 
                    htmlFor="auto-backup" 
                    className="text-sm font-medium text-gray-700"
                  >
                    Auto Backup
                  </Label>
                  <Switch 
                    id="auto-backup" 
                    aria-label="Toggle auto backup"
                  />
                </div>
                <div className="grid gap-3">
                  <Label 
                    htmlFor="backup-frequency" 
                    className="text-sm font-medium text-gray-700"
                  >
                    Backup Frequency
                  </Label>
                  <select 
                    id="backup-frequency" 
                    className="w-full p-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    aria-label="Select backup frequency"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="grid gap-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2.5"
                    aria-label="Start backup now"
                  >
                    Backup Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2.5"
                    aria-label="Restore data from backup"
                  >
                    Restore Data
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              App Version: <span className="font-medium">1.0.0</span>
            </p>
          </div>
        </div>
      </TabsContent>
    </>
  );
};

export default TabContent;
