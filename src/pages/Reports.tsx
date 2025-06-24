import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { getApartmentRecords } from "@/services/apiService";
import { toast } from "@/hooks/use-toast";
import { convertToCSV, downloadCSV } from "@/utils/csvUtils";
import StatusGrid from "@/components/StatusGrid";

const Reports: React.FC = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
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
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Reports</h1>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>

        {/* Credit Overview Section */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Credit Overview</h2>
          <StatusGrid />
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <div className="space-y-6">
            {/* CSV Export Section */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Export Data</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Download all apartment records in CSV format
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Includes apartment numbers and amounts
                  </p>
                </div>
                <Button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Future Reports Sections */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Summary Report</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    View summary statistics and trends
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Coming soon
                  </p>
                </div>
                <Button
                  disabled
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 