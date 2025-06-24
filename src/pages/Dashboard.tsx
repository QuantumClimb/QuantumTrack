import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { addApartmentRecord, getApartmentRecords, deleteApartmentRecord } from "@/services/apiService";
import { useIsMobile } from "@/hooks/use-mobile";
import { parseApartmentNumber } from "@/utils/helpers";
import { convertToCSV, downloadCSV } from "@/utils/csvUtils";
import { ApartmentRecord } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTheme } from '@/components/ThemeProvider';

// Import our components
import NumberPad from "@/components/dashboard/NumberPad";
import DisplayPanel from "@/components/dashboard/DisplayPanel";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TabContent from "@/components/dashboard/TabContent";

const Dashboard = () => {
  const { theme } = useTheme();
  const [displayValue, setDisplayValue] = useState<string>("");
  const [entryMode, setEntryMode] = useState<"apartment" | "amount">("apartment");
  const [apartment, setApartment] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("entry");
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [existingRecord, setExistingRecord] = useState<{ id: string; amount: number } | null>(null);
  const [records, setRecords] = useState<ApartmentRecord[]>([]);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [apartmentBreakdown, setApartmentBreakdown] = useState<{
    tower: string;
    floor: string;
    unit: string;
  } | null>(null);

  const refreshRecords = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const handleNumberPress = (num: string) => {
    setDisplayValue(prev => prev + num);
  };

  const handleDelete = () => {
    setDisplayValue(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setDisplayValue('');
  };

  const handleNext = async () => {
    if (entryMode === "apartment") {
      try {
        const records = await getApartmentRecords();
        const existing = records.find(record => record.apartment === displayValue);
        
        if (existing) {
          setExistingRecord({ id: existing.id, amount: existing.amount });
        }
        
        const { tower, floor, unit } = parseApartmentNumber(displayValue);
        setApartmentBreakdown({ tower, floor, unit });
        setApartment(displayValue);
        setDisplayValue("");
        setEntryMode("amount");
      } catch (error) {
        console.error("Error checking for existing record:", error);
        toast({
          title: "Error",
          description: "Failed to check for existing records. Please try again.",
          variant: "destructive",
          duration: 4000,
        });
      }
    } else {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSave = async () => {
    try {
      await addApartmentRecord(apartment, displayValue);
      
      toast({
        title: "Record Saved",
        description: `Apartment ${apartment}: ₱${displayValue} has been saved`,
        duration: 4000,
      });
      
      refreshRecords();
      resetForm();
      navigate('/');
    } catch (error) {
      console.error("Error saving record:", error);
      toast({
        title: "Error",
        description: "Failed to save the record. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const handleUpdateExisting = async () => {
    try {
      await deleteApartmentRecord(existingRecord!.id);
      await addApartmentRecord(apartment, displayValue);
      
      toast({
        title: "Record Updated",
        description: `Apartment ${apartment} amount updated from ₱${existingRecord!.amount} to ₱${displayValue}`,
        duration: 4000,
      });
      
      refreshRecords();
      resetForm();
      navigate('/');
    } catch (error) {
      console.error("Error updating record:", error);
      toast({
        title: "Error",
        description: "Failed to update the record. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const handleExportCSV = async () => {
    try {
      const records = await getApartmentRecords();
      const csvContent = convertToCSV(records);
      downloadCSV(csvContent);
      toast({
        title: "Export Successful",
        description: "Records have been exported to CSV",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export records to CSV",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const resetForm = () => {
    setApartment("");
    setDisplayValue("");
    setEntryMode("apartment");
    setShowConfirmModal(false);
    setExistingRecord(null);
    setApartmentBreakdown(null);
  };

  const { tower, floor, unit } = parseApartmentNumber(apartment);

  return (
    <div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      role="main"
      aria-label="Dashboard"
    >
      <DashboardHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />
      
      <Tabs 
        value={activeTab} 
        className="w-full flex-1 flex flex-col"
        aria-label="Dashboard Sections"
      >
        <TabsContent 
          value="entry" 
          className="flex-1 flex flex-col mt-0"
          role="tabpanel"
          aria-label="New entry form"
        >
          <DisplayPanel 
            displayValue={displayValue} 
            entryMode={entryMode} 
            apartment={apartment}
            apartmentBreakdown={apartmentBreakdown}
          />
          
          <div className="w-full flex justify-center px-4 lg:px-8">
            <div className={`w-full ${!isMobile ? 'max-w-xl' : ''}`}>
              <NumberPad 
                onNumberPress={handleNumberPress}
                onDelete={handleDelete}
                onClear={handleClear}
                onNext={handleNext}
                entryMode={entryMode}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabContent 
          activeTab={activeTab} 
          refreshRecords={refreshRecords} 
        />
      </Tabs>

      <Dialog 
        open={showConfirmModal} 
        onOpenChange={setShowConfirmModal}
      >
        <DialogContent 
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          role="alertdialog"
          aria-labelledby="dialog-title"
        >
          <DialogHeader>
            <DialogTitle id="dialog-title" className="text-gray-900 dark:text-white">
              Confirm Record
            </DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400">
              {existingRecord ? (
                <>
                  Apartment {apartment} (Tower {tower}, Floor {floor}, Unit {unit}) already has a record of ₱{existingRecord.amount}.
                  Would you like to update it to ₱{displayValue}?
                </>
              ) : (
                <>
                  Save record for Apartment {apartment} (Tower {tower}, Floor {floor}, Unit {unit}) with amount ₱{displayValue}?
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmModal(false)}
              className="border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={existingRecord ? handleUpdateExisting : handleConfirmSave}
              className="bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent/90 text-white"
            >
              {existingRecord ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
