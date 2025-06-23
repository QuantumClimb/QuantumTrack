
import React, { useState } from 'react';
import { FileText, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { mockReports, Report } from '@/mock/reportData';
import ReportFilter from '@/components/reports/ReportFilter';
import ReportTabs from '@/components/reports/ReportTabs';
import ReportDetail from '@/components/reports/ReportDetail';
import NoReportSelected from '@/components/reports/NoReportSelected';

const DoctorReports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [reports] = useState(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Filter reports based on search query
  const filteredReports = reports.filter(report => 
    report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle report selection
  const handleReportSelect = (report: Report) => {
    setSelectedReport(report);
  };

  return (
    <Layout userRole="doctor">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Patient Reports</h1>
            <p className="text-gray-500">Manage and review patient reports and test results</p>
          </div>
          <Link to="/doctor/reports/upload">
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload New Report
            </Button>
          </Link>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Reports listing section */}
          <div className="w-full lg:w-2/3 space-y-6">
            <ReportFilter 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
            />
            <ReportTabs 
              filteredReports={filteredReports} 
              onReportSelect={handleReportSelect}
            />
          </div>

          {/* Report details section */}
          <div className="w-full lg:w-1/3">
            {selectedReport ? (
              <ReportDetail report={selectedReport} />
            ) : (
              <NoReportSelected />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorReports;
