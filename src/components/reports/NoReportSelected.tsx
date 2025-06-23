
import React from 'react';
import { FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

const NoReportSelected = () => {
  return (
    <Card className="glass-card h-full flex flex-col justify-center items-center py-16">
      <div className="text-center p-6">
        <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium mb-2">Select a Report</h3>
        <p className="text-gray-500 max-w-md">
          Click on any report from the list to view its details and download options.
        </p>
      </div>
    </Card>
  );
};

export default NoReportSelected;
